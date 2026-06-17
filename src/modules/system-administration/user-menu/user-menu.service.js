import repository,
{
  tree
}
from "./user-menu.repository.js";

import { AppError } from "../../../common/middlewares/error.js";

export const list = async (query) => {

  const page =
    Number(query.page || 1);

  const limit =
    Number(query.limit || 10);

  const where = {};

  if (query.name?.trim()) {
    where.name = {
      contains: query.name.trim(),
      mode: "insensitive",
    };
  }

  if (query.type?.trim()) {
    where.type = query.type;
  }

  const [rows, total] =
    await Promise.all([
      repository.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        orderBy: {
          createdAt: "desc",
        },
      }),
      repository.count(where),
    ]);

  return {
    data: rows,
    meta: {
      page,
      limit,
      total,
      totalPages:
        Math.ceil(total / limit),
    },
  };
};

export const detail = async (businessId,businessMemberId,userId) => {
  // console.log(businessId,businessMemberId,userId);
  
    const menus =
      await tree(
        businessId,
        businessMemberId,
        userId
      );

    return menus;
};

export const create = async (payload) => {
  return repository.create(payload);
};

export const update = async (
  id,
  payload
) => {
  return repository.update(
    id,
    payload
  );
};

export const remove = async (
  id
) => {

  const business =
    await repository.findById(id);

  if (!business) {
    throw new AppError(
      "Business not found",
      404
    );
  }

  return repository.delete(
    id
  );
};