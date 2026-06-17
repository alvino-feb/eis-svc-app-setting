import * as service
from "./user.service.js";

import {
  successListResponse,
  successDetailResponse,
  successCreatedResponse,
  successUpdatedResponse,
  successDeletedResponse,
} from "../../../common/helpers/response.js";

export const list = async (
  req,
  res,
  next
) => {
  try {

    return successListResponse(
      res,
      await service.list(
        req.query
      )
    );

  } catch (err) {
    next(err);
  }
};

export const detail = async (
  req,
  res,
  next
) => {
  try {

    return successListResponse(
      res,
      await service.detail(
        req.params.id
      )
    );

  } catch (err) {
    next(err);
  }
};

export const create = async (
  req,
  res,
  next
) => {

  try {

    const result =
      await service.create(
        req.body
      );

    return successCreatedResponse(
      res,
      result,
      "User created successfully"
    );

  } catch (err) {

    next(err);

  }

};

export const update = async (
  req,
  res,
  next
) => {
  try {

    const payload =
      updateRoleSchema.parse(
        req.body
      );

    return successUpdatedResponse(
      res,
      await service.update(
        req.params.id,
        payload
      )
    );

  } catch (err) {
    next(err);
  }
};

export const remove = async (
  req,
  res,
  next
) => {
  try {

    return successDeletedResponse(
      res,
      await service.remove(
        req.params.id
      )
    );

  } catch (err) {
    next(err);
  }
};