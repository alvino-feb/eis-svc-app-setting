import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";

export default new BaseRepository(
  prisma.userMenu
);

export const findByUsername =
  async (username) => {

  return prisma.user.findFirst({
    where: {
      username,
    },
  });
};

export const findUserMenu = async (
  businessId,
  userId,
) => {

  const menus =
    await prisma.menu.findMany({

      orderBy: {
        seqNo: "asc",
      },

      include: {

        UserMenu: {

          where: {
            businessId,
            userId,
          },

        },

      },

    });

  return menus.map((menu) => {

    const permission =
      menu.UserMenu?.[0];

    return {
      code: menu.code,
      name: menu.name,
      parentCode: menu.parentCode,
      level: menu.level,
      view: !!permission,
      create: permission?.canCreate ?? false,
      update: permission?.canUpdate ?? false,
      delete: permission?.canDelete ?? false,
    };

  });

};

export const tree = async (
    businessId,
    userId,
) => {

    const userMenus = await prisma.userMenu.findMany({
        where: {
            businessId,
            userId,
        },
        include: {
            Menu: true,
        },
        orderBy: {
            Menu: {
                seqNo: "asc",
            },
        },
    });

    const map = {};
    const tree = [];

    // ==========================================
    // Build node map
    // ==========================================

    userMenus.forEach((um) => {

        const menu = um.Menu;

        map[menu.code] = {
            code: menu.code,
            name: menu.name,
            path: menu.path ?? "",
            type: menu.type,
            icon: menu.icon ?? null,
            seqNo: menu.seqNo,

            // IMPORTANT:
            // semua node punya children terlebih dahulu
            children: [],
        };

        // Permission hanya untuk menu C
        if (menu.type === "C") {

            map[menu.code].permission = {
                create: um.canCreate ?? false,
                edit: um.canEdit ?? false,
                delete: um.canDelete ?? false,
                view: um.canView ?? true,
            };
        }
    });

    // ==========================================
    // Build hierarchy
    // ==========================================

    userMenus.forEach((um) => {

        const menu = um.Menu;
        const node = map[menu.code];

        if (!node) {
            return;
        }

        // Has parent
        if (menu.parentCode) {

            const parent = map[menu.parentCode];

            if (parent) {

                parent.children.push(node);

            } else {

                // Parent tidak ditemukan
                // anggap sebagai root
                tree.push(node);

            }

        } else {

            // Root node
            tree.push(node);
        }
    });

    // ==========================================
    // Remove empty children
    // ==========================================

    Object.values(map).forEach((node) => {

        if (node.children.length === 0) {

            delete node.children;

        }
    });

    return tree;
};

export const saveUserMenus = async ({
    userId,
    businessId,
    businessMemberId,
    menus,
}) => {
    if (!Array.isArray(menus)) {
        const error = new Error("Menus must be an array");
        error.statusCode = 400;
        throw error;
    }

    // Hanya menu leaf yang memiliki permission.
    const permissions = menus
        .filter((menu) => menu.type !== "P")
        .map((menu) => ({
            businessId,
            businessMemberId,
            userId,
            menuCode: menu.code,
            canRead: Boolean(menu.view),
            canCreate: Boolean(menu.create),
            canUpdate: Boolean(menu.edit),
            canDelete: Boolean(menu.delete),
        }));

    const menuCodes = permissions.map((item) => item.menuCode);

    if (new Set(menuCodes).size !== menuCodes.length) {
        const error = new Error("Duplicate menu codes");
        error.statusCode = 400;
        throw error;
    }

    return prisma.$transaction(async (tx) => {
        const user = await tx.user.findFirst({
            where: {
                id: userId,
                businessId,
                ...(businessMemberId
                    ? { businessMemberId }
                    : {}),
            },
            select: {
                id: true,
            },
        });

        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // Validasi kode menu supaya client tidak bisa
        // mengirim kode menu yang tidak terdaftar.
        const validMenus = await tx.menu.findMany({
            where: {
                code: {
                    in: menuCodes,
                },
            },
            select: {
                code: true,
            },
        });

        if (validMenus.length !== menuCodes.length) {
            const error = new Error(
                "One or more menu codes are invalid"
            );
            error.statusCode = 400;
            throw error;
        }

        for (const permission of permissions) {
            const {
                userId: permissionUserId,
                menuCode,
                ...permissionData
            } = permission;

            await tx.userMenu.upsert({
                where: {
                    userId_menuCode: {
                        userId: permissionUserId,
                        menuCode,
                    },
                },
                create: permission,
                update: {
                    canRead: permissionData.canRead,
                    canCreate: permissionData.canCreate,
                    canUpdate: permissionData.canUpdate,
                    canDelete: permissionData.canDelete,
                },
            });
        }

        // Hapus permission lama yang tidak lagi ada
        // dalam daftar menu yang dikirim.
        await tx.userMenu.deleteMany({
            where: {
                userId,
                businessId,
                ...(businessMemberId
                    ? { businessMemberId }
                    : {}),
                ...(menuCodes.length > 0
                    ? { menuCode: { notIn: menuCodes } }
                    : {}),
            },
        });

        return {
            userId,
            savedCount: permissions.length,
        };
    });
};