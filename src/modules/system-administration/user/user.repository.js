import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";
const ALLOWED_ROLES = ["BA", "CR"];

export default new BaseRepository(
  prisma.user
);

export const findByUsername =
  async (username) => {

  return prisma.user.findFirst({
    where: {
      username,
    },
  });
};

export const isSuperUser = async (businessId, userId) => {

  const role =
    await prisma.userBusinessMember.findFirst({
      where: {
        businessId,
        userId,
      },
      include: {
        Role: true,
      },
    });

  return ALLOWED_ROLES.includes(role?.Role?.code);

};

export const fetchRoleByMemberAndRole =
async (
  businessId,
  businessMemberId,
  roleId
) => {

  const rows =
    await prisma.userBusinessMember.findMany({

      where: {
        businessId,
        businessMemberId,
        roleId,
      },

      include: {
        User: true,
        Role: true,
      },

      orderBy: {
        User: {
          username: "asc",
        },
      },

    });

  return rows.map(
    (x) => ({
      // ...x.User,
      id: x.User.id,
      businessId: x.User.businessId,
      username: x.User.username,
      fullName: x.User.fullName,
      phone: x.User.phone,
      // password: x.User.password,
      isActive: x.User.isActive,
      roleCode: x.Role?.code,
      roleName: x.Role?.name,
      roleId: x.Role?.id,
    })
  );
};

export const findByRole = async (
  businessId,
  businessMemberId,
  roleId
) => {

  return prisma.roleMenu.findMany({

    where: {
      businessId,
      businessMemberId,
      roleId,
    },

  });

};

export const createWithRole = async (
  payload,
  roleMenus
) => {

  return prisma.$transaction(async (tx) => {

    // 1. Create User
    const user = await tx.user.create({
      data: {
        businessId: payload.businessId,
        username: payload.username,
        password: payload.password,
        fullName: payload.fullName,
        phone: payload.phone,
        isActive: payload.isActive,
      },
    });

    // 2. Create UserBusinessMember
    await tx.userBusinessMember.create({
      data: {
        businessId: payload.businessId,
        businessMemberId: payload.businessMemberId,
        userId: user.id, 
        roleId: payload.roleId,
      },
    });

    // 3. Copy RoleMenu → UserMenu
    if (roleMenus.length) {

      await tx.userMenu.createMany({
        data: roleMenus.map(menu => ({
          businessId: menu.businessId,
          businessMemberId: menu.businessMemberId,
          userId: user.id, 
          menuCode: menu.menuCode,
          create: menu.create,
          edit: menu.edit,
          delete: menu.delete,
        })),

      });

    }

    return user;

  });

};

export const removeWithRole = async (
  userId,
  businessId,
  businessMemberId
) => {

  return prisma.$transaction(async (tx) => {

    // Delete User Menu
    await tx.userMenu.deleteMany({
      where: {
        businessId,
        businessMemberId,
        userId,
      },

    });

    // Delete User Business Member
    await tx.userBusinessMember.deleteMany({
      where: {
        businessId,
        businessMemberId,
        userId,
      },

    });

    // Delete User
    await tx.user.delete({
      where: {
        id: userId,
      },
    });
  });

};

export const updateWithRole = async (
  payload
) => {

  return prisma.user.update({
    where: {
      id: payload.id,
    },
    data: {
      username: payload.username,
      password: payload.password,
      fullName: payload.fullName,
      phone: payload.phone,
      isActive: payload.isActive,
    },
  });
};
