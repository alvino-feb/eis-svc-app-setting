import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";

import {
  isSuperUser
}
from "../user/user.repository.js";


export default new BaseRepository(
  prisma.userBusinessMember
);

export const findByUsername =
  async (username) => {

  return prisma.userBusinessMember.findFirst({
    where: {
      username,
    },
  });
};

export const detailByUser =
async ({
  businessId,
  userId,
}) => {
  
  const isSU =
    await isSuperUser(
      businessId,
      userId
    );

  const where = {
    businessId,
  };

  if (!isSU) {

    where.UserBusinessMember = {
      some: {
        userId,
      },
    };

  }

  return prisma.businessMember.findMany({
    where,
    orderBy: {
      name: "asc",
    },
  });

};