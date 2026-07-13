import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";

// export default new BaseRepository(
//   prisma.roleMenu
// );

/**
 * Get All Menu + Permission by Role
 */

export const getRoleWithMenu = async (
  businessId,
  id
) => {
  const role = await prisma.role.findFirst({
    where: {
      id: id,
      businessId,
    },
  });

  if (!role) {
    return null;
  }

  const menus = await prisma.menu.findMany({
    orderBy: {
      seqNo: "asc",
    },
    include: {
      RoleMenus: {
        where: {
          businessId,
          roleId: id,
        },
      },
    },
  });
  return {
    ...role,
    menus: menus.map(menu => {
      const permission =
        menu.RoleMenus[0];

      return {
        code: menu.code,
        parentCode: menu.parentCode,
        name: menu.name,
        type: menu.type,
        level: menu.level,
        path: menu.path,
        icon: menu.icon,
        view: !!permission,
        create: permission?.create ?? false,
        edit: permission?.edit ?? false,
        delete: permission?.delete ?? false,
      };
    }),
  };
};

export const findMenuByRole = async (
  businessId,
  businessMemberId,
  roleId
) => {

  const rows =
    await prisma.menu.findMany({

      orderBy: {
        seqNo: "asc",
      },

      include: {
        RoleMenus: {
          where: {
            businessId,
            businessMemberId,
            roleId,
          },
        },

      },

    });

  return rows.map((menu) => {

    const permission =
      menu.RoleMenus?.[0];

    return {
      menuCode: menu.code,
      parentCode: menu.parentCode,
      name: menu.name,
      path: menu.path,
      icon: menu.icon,
      view:
        permission?.view ?? false,
      create:
        permission?.create ?? false,
      edit:
        permission?.edit ?? false,
      delete:
        permission?.delete ?? false,
    };
  });

};

export const deleteByRole =
async (
  tx,
  businessId,
  businessMemberId,
  roleId
) => {

  return tx.menuRole.deleteMany({
    where: {
      businessId,
      businessMemberId,
      roleId,
    },
  });

};

export const createMany = async (
    tx,
    menus
) => {

    if (!menus.length)
        return;

    return tx.roleMenu.createMany({
        data: menus
    });

};

export const findByRole =
async (
  businessId,
  businessMemberId,
  roleId
) => {

  return prisma.menuRole.findMany({
    where: {
      businessId,
      businessMemberId,
      roleId,
    },
    include: {
      Menu: true,
    },
    orderBy: {
      menuCode: "asc",
    },
  });
};

export const create =
async (
  tx,
  payload
) => {

  return tx.menuRole.create({
    data: payload,
  });

};

export const update =
async (
  tx,
  businessId,
  businessMemberId,
  roleId,
  menuCode,
  payload
) => {

  return tx.menuRole.update({
    where: {
      businessId_businessMemberId_roleId_menuCode: {
        businessId,
        businessMemberId,
        roleId,
        menuCode,
      },
    },
    data: payload,
  });
};

export const remove =
async (
  tx,
  businessId,
  businessMemberId,
  roleId,
  menuCode
) => {

  return tx.menuRole.delete({
    where: {
      businessId_businessMemberId_roleId_menuCode: {
        businessId,
        businessMemberId,
        roleId,
        menuCode,
      },
    },
  });

};