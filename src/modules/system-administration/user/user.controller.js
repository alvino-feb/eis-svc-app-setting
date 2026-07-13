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

export const detailByMemberAndRole =
async (
  req,
  res,
  next
) => {

  try {

    const result =
      await service.detailByMemberAndRole(
        req.params.businessId,
        req.params.businessMemberId,
        req.params.roleId
      );

    return successListResponse(
      res,
      result
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
    return successUpdatedResponse(
      res,
      await service.update(
        req.body
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

export const createWithRole = async (
  req,
  res,
  next
) => {

  try {

    return successCreatedResponse(
      res,
      await service.createWithRole(
        req.body
      )
    );
  } catch (err) {
    next(err);
  }

};

export const removeWithRole = async (
  req,
  res,
  next
) => {

  try {
    await service.removeWithRole(
      req.params.businessId,
      req.params.businessMemberId,
      req.params.id,
    );
    
    return successDeletedResponse(res);
  }
  catch (err) {
    next(err);
  }

};