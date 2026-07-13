import { Router }
from "express";

import * as controller
from "./user-menu.controller.js";

const router = Router();

/**
 * @swagger
 * /user-menu/{businessId}/{businessMemberId}/{userId}:
 *   get:
 *     summary: Get User Menu Tree
 *     description: Get menu tree and permissions for specific user
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: businessMemberId
 *         required: true
 *         description: Business Member ID
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "00000000-0001-0000-0000-000000000000"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: SYSTEM_ADMIN
 *                       name:
 *                         type: string
 *                         example: System Administration
 *                       path:
 *                         type: string
 *                         example: ""
 *                       type:
 *                         type: string
 *                         example: P
 *                       children:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             code:
 *                               type: string
 *                               example: MASTER_DATA
 *                             name:
 *                               type: string
 *                               example: Master Data
 *                             path:
 *                               type: string
 *                               example: ""
 *                             type:
 *                               type: string
 *                               example: M
 *                             children:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   code:
 *                                     type: string
 *                                     example: USER
 *                                   name:
 *                                     type: string
 *                                     example: User Management
 *                                   path:
 *                                     type: string
 *                                     example: /user
 *                                   type:
 *                                     type: string
 *                                     example: C
 *                                   permission:
 *                                     type: object
 *                                     properties:
 *                                       create:
 *                                         type: boolean
 *                                         example: true
 *                                       edit:
 *                                         type: boolean
 *                                         example: true
 *                                       delete:
 *                                         type: boolean
 *                                         example: false
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Data Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/:businessId/:businessMemberId/:userId",
  controller.detail
);

/**
 * @swagger
 * /user-menu/list/{businessId}/{businessMemberId}/{userId}:
 *   get:
 *     summary: Get User Menu List access
 *     description: Get list menu for user access
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: businessMemberId
 *         required: true
 *         description: Business Member ID
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: path
 *         name: userId
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           example: "00000000-0001-0000-0000-000000000000"
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Success
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       code:
 *                         type: string
 *                         example: SYSTEM_ADMIN
 *                       name:
 *                         type: string
 *                         example: System Administration
 *                       path:
 *                         type: string
 *                         example: ""
 *                       type:
 *                         type: string
 *                         example: P
 *                       children:
 *                         type: array
 *                         items:
 *                           type: object
 *                           properties:
 *                             code:
 *                               type: string
 *                               example: MASTER_DATA
 *                             name:
 *                               type: string
 *                               example: Master Data
 *                             path:
 *                               type: string
 *                               example: ""
 *                             type:
 *                               type: string
 *                               example: M
 *                             children:
 *                               type: array
 *                               items:
 *                                 type: object
 *                                 properties:
 *                                   code:
 *                                     type: string
 *                                     example: USER
 *                                   name:
 *                                     type: string
 *                                     example: User Management
 *                                   path:
 *                                     type: string
 *                                     example: /user
 *                                   type:
 *                                     type: string
 *                                     example: C
 *                                   permission:
 *                                     type: object
 *                                     properties:
 *                                       create:
 *                                         type: boolean
 *                                         example: true
 *                                       edit:
 *                                         type: boolean
 *                                         example: true
 *                                       delete:
 *                                         type: boolean
 *                                         example: false
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Data Not Found
 *       500:
 *         description: Internal Server Error
 */
router.get(
  "/list/:businessId/:businessMemberId/:userId",
  controller.listUserMenu
);

/**
 * @swagger
 * /user-menu:
 *   post:
 *     summary: Create User Menu
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - businessId
 *               - username
 *               - password
 *             properties:
 *               businessId:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post(
  "/",
  controller.create
);

/**
 * @swagger
 * /user-menu/{businessId}/{businessMemberId}/{userId}:
 *   put:
 *     summary: Update User Menu
 *     description: Update existing User Menu data
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: d4ea1a10-49a9-4ed3-8415-de3b8e619a91
 *               username:
 *                 type: string
 *                 example: ADM
 *               password:
 *                 type: string
 *                 example: Super Administrator
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /user-menu/{businessId}/{businessMemberId}/{userId}:
 *   delete:
 *     summary: Delete User
 *     description: Soft delete user by setting deletedAt timestamp
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Role deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Role deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Role not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.remove);

export default router;