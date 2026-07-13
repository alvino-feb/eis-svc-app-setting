import repository,
{
  fetchRoleByMember as fetchRoleByMemberRepository,
  findRoleById,
  findByCode,
  createWithMenu as createWithMenuRepository,
  updateWithMenu as updateWithMenuRepository,
  removeWithMenu as removeWithMenuRepository
}
from "./role.repository.js";

import * as roleMenuRepository
from "./role-menu.repository.js";

import { AppError } from "../../../common/middlewares/error.js";

export const list = async (query, businessId) => {

  const page =
    Number(query.page || 1);

  const limit =
    Number(query.limit || 10);

  const where = {
    businessId,
  };

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

export const detailWithMenu = async (businessId, id) => {
  const role =
    await findRoleById(businessId, id);

  if (!role) {
    throw new AppError(
      "Role not found.",
      404
    );
  }

  const menus =
    await roleMenuRepository.findMenuByRole(
      role.businessId,
      role.businessMemberId,
      role.id
    );

  return {
    ...role,
    menus,
  };

};

export const getRoleWithMenu = async (
  businessId,
  id
) => {

  const role =
    await roleMenuRepository.getRoleWithMenu(
      businessId,
      id
    );

  if (!role) {

    throw new AppError(
      "Role not found.",
      404
    );

  }

  return role;

};

export const detailByMember =
async (
  businessId,
  businessMemberId
) => {

  return fetchRoleByMemberRepository(
    businessId,
    businessMemberId
  );

};

export const create = async (payload) => {
  return repository.create(payload);
};

export const createWithMenu =
async (payload) => {
  
  const exists =
    await findByCode(
      payload.businessId,
      payload.code
    );

  if (exists) {
    throw new AppError(
      "Role already exists.",
      400
    );
  }
  
  return createWithMenuRepository(
    payload,
    payload.menus ?? []
  );

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

export const updateWithMenu = async (
  payload
) => {

  const role =
    await findRoleById(
      payload.businessId,
      payload.id
    );

  if (!role) {

    throw new AppError(
      "Role not found.",
      404
    );

  }

  return updateWithMenuRepository(
    payload,
    payload.menus ?? []
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

export const removeWithMenu = async (
  businessId,
  id
) => {

  const exists =
    await findRoleById(
      businessId,
      id
    );

  if (!exists) {

    throw new AppError(
      "Role not found.",
      404
    );

  }

  return await removeWithMenuRepository(
    exists
  );

};