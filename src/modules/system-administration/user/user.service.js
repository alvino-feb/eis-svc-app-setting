import bcrypt from "bcrypt";

import repository,
{
  fetchRoleByMemberAndRole,
  createWithRole as createWithRoleRepo,
  findByRole,
  findByUsername,
  removeWithRole as removeWithRoleRepo,
  updateWithRole as updateWithRoleRepo
}
from "./user.repository.js";

import {
  hashPassword
}
from "../../../common/helpers/password.js";

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

export const detail = async (id) => {
  return repository.findById(id);
};

export const detailByMemberAndRole =
async (
  businessId,
  businessMemberId,
  roleId
) => {

  return fetchRoleByMemberAndRole(
    businessId,
    businessMemberId,
    roleId
  );

};

export const create =
  async (payload) => {

  payload.password =
    await hashPassword(
      payload.password
    );

  return repository.create(
    payload
  );
};

export const update = async (
  payload
) => {  

  payload.password =
  await hashPassword(
    payload.password
  );

  return updateWithRoleRepo(
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

export const createWithRole = async (
  payload
) => {

  const exists =
    await findByUsername(
      payload.businessId,
      payload.username
    );

  if (exists) {

    throw new AppError(
      "Username already exists.",
      400
    );

  }

  const roleMenus =
    await findByRole(
      payload.businessId,
      payload.businessMemberId,
      payload.roleId,
    );

  payload.password =
    await bcrypt.hash(
      payload.password,
      10
    );

  return createWithRoleRepo(
    payload,
    roleMenus
  );

};

export const removeWithRole = async (
  businessId,
  businessMemberId,
  id
) => {

  const user =
    await repository.findById(
      id
    );

  if (!user) {

    throw new AppError(
      "User not found.",
      404
    );

  }

  return removeWithRoleRepo(
    id,
    businessId,
    businessMemberId,
  );

};