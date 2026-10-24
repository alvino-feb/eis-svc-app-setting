import * as service 
from "./user-menu.service.js";

import {
  createUserMenuSchema,
  updateUserMenuSchema,
}
from "./user-menu.validation.js";

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
        req.query
      )
    );

  } catch (err) {
    next(err);
  }
};

export const listUserMenu = async (
  req,
  res,
  next
) => {
  try {
    return successListResponse(
      res,
      await service.listUserMenu(
        req.query
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

    const payload =
      createUserMenuSchema.parse(
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

export const saveUserMenus = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const {
            businessId,
            businessMemberId,
            menus,
        } = req.body;

        if (!businessId || !businessMemberId) {
            return res.status(400).json({
                message:
                    "Business and Business Member are required",
            });
        }

        const result = await service.saveUserMenus({
            userId,
            businessId,
            businessMemberId,
            menus,
        });

        return res.status(200).json({
            message: "User menu permissions saved successfully",
            data: result,
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (
  req,
  res,
  next
) => {
  try {

    const payload =
      updateUserMenuSchema.parse(
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

