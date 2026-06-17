import prisma 
from "../../../common/constants/prisma.js";

import { BaseRepository } from "../../../common/base/repository.js";

export default new BaseRepository(
  prisma.business
);

// export const findMany = async ({
//   where,
//   skip,
//   take,
//   orderBy,
// }) => {
//   return prisma.business.findMany({
//     where,
//     skip,
//     take,
//     orderBy,
//   });
// };

// export const count = async (where) => {
//   return prisma.business.count({
//     where,
//   });
// };

// export const findById = async (id) => {
//   return prisma.business.findUnique({
//     where: {
//       id,
//     },
//   });
// };

// export const create = async (data) => {
//   return prisma.business.create({
//     data,
//   });
// };

// export const update = async (
//   id,
//   data
// ) => {
//   return prisma.business.update({
//     where: {
//       id,
//     },
//     data,
//   });
// };

// export const softDelete =
//   async (id) => {

//   return prisma.business.update({
//     where: {
//       id,
//     },

//     data: {
//       deletedAt: new Date(),
//     },
//   });
// };

// export const deleteById = async (id) => {
//   return prisma.business.delete({
//     where: {
//       id,
//     },
//   });
// };