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
  businessMemberId,
  userId
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
            businessMemberId,
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
      create: permission?.create ?? false,
      edit: permission?.edit ?? false,
      delete: permission?.delete ?? false,
    };

  });

};

export const tree = async (
  businessId,
  businessMemberId,
  userId,
) => {
  
  const userMenus =
    await prisma.userMenu.findMany({
      where: {
        businessId,
        businessMemberId,
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

  // Build node map
  userMenus.forEach((um) => {

    const menu = um.Menu;

    map[menu.code] = {
      code: menu.code,
      name: menu.name,
      path: menu.path ?? "",
      type: menu.type,
      icon: menu.icon ?? null,
      seqNo: menu.seqNo,
    };

    if (menu.type === "C") {

      map[menu.code].permission = {
        create: um.canCreate ?? false,
        edit: um.canEdit ?? false,
        delete: um.canDelete ?? false,
        view: um.canView ?? true,
      };

    } else {

      map[menu.code].children = [];

    }

  });

  // Build hierarchy
  userMenus.forEach((um) => {

    const menu = um.Menu;

    if (
      menu.parentCode &&
      map[menu.parentCode]
    ) {

      map[
        menu.parentCode
      ].children.push(
        map[menu.code]
      );

    } else {

      tree.push(
        map[menu.code]
      );

    }

  });

  // Remove empty children
  Object.values(map)
    .forEach((node) => {

      if (
        node.children &&
        node.children.length === 0
      ) {

        delete node.children;

      }

    });

  return tree;

};