import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";

export default new BaseRepository(
  prisma.role
);

export const findByCode = async (businessId, code) => {
  return prisma.role.findUnique({
    where: {
      businessId_code: {
        businessId,
        code,
      },
    },
  });
};

export const findRoleById = async (businessId, id) => {

  return prisma.role.findUnique({
    
    where: {
      businessId,
      id,
    },

    // include: {
    //   BusinessMember: true,
    // },

  });

};

// export const fetchRoleByMember =
// async (
//   businessId,
//   businessMemberId
// ) => {

//   const rows =
//     await prisma.userBusinessMember.findMany({

//       where: {
//         businessId,
//         businessMemberId,
//       },

//       distinct: [
//         "roleId"
//       ],

//       include: {
//         Role: true,
//       },

//       orderBy: {
//         roleId: "asc",
//       },

//     });

//   return rows.map(
//     (x) => x.Role
//   );

// };

export const fetchRoleByMember = async (
  businessId
) => {

  return prisma.role.findMany({

    where: {
      businessId,
    },

    orderBy: {
      code: "asc",
    },

  });

};

export const createWithMenu = async (
  payload,
  menus
) => {

  return prisma.$transaction(async (tx) => {

    const role =
      await tx.role.create({

        data: {

          businessId:
            payload.businessId,

          code:
            payload.code,

          name:
            payload.name,

        },

      });

    const roleMenus = menus
      .filter(menu => menu.view)
      .map(menu => ({

        businessId:
          payload.businessId,

        businessMemberId:
          payload.businessMemberId,

        roleId:
          role.id,

        menuCode:
          menu.menuCode,

        create:
          !!menu.create,

        edit:
          !!menu.edit,

        delete:
          !!menu.delete,

      }));

    if (roleMenus.length) {

      await tx.roleMenu.createMany({

        data: roleMenus,

      });

    }

    return role;

  });

};

export const updateWithMenu = async (
  payload,
  menus
) => {

  return prisma.$transaction(async (tx) => {

    await tx.role.update({
      where: {
        id: payload.id,
      },
      data: {
        name: payload.name,
      },

    });

    // Hapus semua permission lama
    await tx.roleMenu.deleteMany({
      where: {
        businessId: payload.businessId,
        businessMemberId: payload.businessMemberId,
        roleId: payload.id,
      },

    });

    // Ambil hanya menu yang View = true
    const roleMenus = menus
      .filter(menu => menu.view)
      .map(menu => ({
        businessId: payload.businessId,
        businessMemberId: payload.businessMemberId,
        roleId: payload.id,
        menuCode: menu.code ?? menu.menuCode,
        create: !!menu.create,
        edit: !!menu.edit,
        delete: !!menu.delete,
      }));

    if (roleMenus.length) {
      await tx.roleMenu.createMany({
        data: roleMenus,
      });
    }
  });
};

export const removeWithMenu = async (
  role
) => {

  return await prisma.$transaction(
    async (tx) => {

      await deleteByRole(
        tx,
        role.businessId,
        role.businessMemberId,
        role.id
      );

      await tx.role.delete({
        where: {
          id: role.id,
        },
      });

    }

  );

};

export const deleteByRole = async (
  tx,
  businessId,
  businessMemberId,
  roleId
) => {

  return tx.roleMenu.deleteMany({

    where: {

      businessId,

      businessMemberId,

      roleId,

    },

  });

};