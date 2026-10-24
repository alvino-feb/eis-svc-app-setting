import bcrypt from "bcrypt";

import repository,
{
  fetchRoleByMemberAndRole,
  createWithRole as createWithRoleRepo,
  findByRole,
  findByUsername,
  findByMemberAndType,
  removeWithRole as removeWithRoleRepo,
  updateWithRole as updateWithRoleRepo
}
from "./user.repository.js";
import repositoryV2 from "./user.repositoryv2.js"

import {
  hashPassword
}
from "../../../common/helpers/password.js";
import { buildWhere } from "../../../common/helpers/query.js";
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

export const listByMemberAndType =
async (
  businessId,
  businessMemberId,
  type
) => {
    
  return findByMemberAndType(
    businessId,
    businessMemberId,
    type
  );

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

export const create = async (payload) => {
  // ==========================================
  // CHECK DUPLICATE
  // ==========================================
  const where = buildWhere(
      payload,
      [
          "businessId",
          "businessMemberId"
      ],
      [
          "username"
      ]
  );

  const existing = await repositoryV2.exists(where);

  if (existing) {
      throw new AppError(
          `Username "${payload.username}" already exists.`,
          409,
          "DUPLICATE_DATA",
          {
              field: "code",
              value: payload.code,
          }
      );
  }n

  payload.password = await hashPassword(
    payload.password
  );
  
  const data = {
    businessId: payload.businessId,
    businessMemberId: payload.businessMemberId,
    type: payload.type,
    username: payload.username,
    passwordHash: payload.password,
    employeeId: payload.employeeId,
    isActive: payload.isActive
  }
  
  return repository.create(
    data
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