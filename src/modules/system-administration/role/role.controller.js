import * as service 
from "./role.service.js";

import {
  createRoleSchema,
  updateRoleSchema,
}
from "./role.validation.js";

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
        req.params.businessId,
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

export const detailWithMenu = async (
  req,
  res,
  next
) => {
  try {

    return successListResponse(
      res,
      await service.detailWithMenu(
        req.params.businessId,
        req.params.id,
      )
    );

  } catch (err) {
    next(err);
  }
};

export const getRoleWithMenu = async (
  req,
  res,
  next
) => {

  try {
    return successDetailResponse(
      res,
      await service.getRoleWithMenu(
        req.params.businessId,
        req.params.id,
      )
    );
  }
  catch (err) {
    next(err);
  }

};

export const detailByMember =
async (
  req,
  res,
  next
) => {

  try {

    const result =
      await service.detailByMember(
        req.params.businessId,
        req.params.businessMemberId
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

    const payload =
      createRoleSchema.parse(
        req.body
      );

    return successCreatedResponse(
      res,
      await service.create(payload)
    );

  } catch (err) {
    next(err);
  }
};

export const createWithMenu = async (
  req,
  res,
  next
) => {
  try {
    
    return successCreatedResponse(
      res,
      await service.createWithMenu(req.body)
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

export const updateWithMenu = async (
  req,
  res,
  next
) => {
  try {  
    return successUpdatedResponse(
      res,
      await service.updateWithMenu(req.body)
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

export const removeWithMenu = async (
  req,
  res,
  next
) => {
  try {

    return successDeletedResponse(
      res,
      await service.removeWithMenu(
        req.params.businessId,
        req.params.id
      )
    );

  } catch (err) {
    next(err);
  }
};