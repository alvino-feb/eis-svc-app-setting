import repository
from "./business-member.repository.js";

import { AppError } from "../../../common/middlewares/error.js";

export const list = async (businessId, query) => {

  const where = {
    businessId,
  };

  const [rows, total] =
    await Promise.all([
      repository.findMany({
        where,
      }),
      repository.count(where),
    ]);

  return {
    data: rows
  };
};

export const detail = async (businessId) => {
  return repository.findById(businessId);
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

