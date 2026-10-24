import { Router }
from "express";

import * as controller
from "./user-menu.controller.js";

const router = Router();

/**
 * @swagger
 * /user-menu:
 *   get:
 *     summary: Get User Menu Tree
 *     description: Get menu tree and permissions for specific user
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0001-0000-000000000000"
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
router.get("/",controller.detail);

/**
 * @swagger
 * /user-menu/list:
 *   get:
 *     summary: Get User Menu List access
 *     description: Get list menu for user access
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0001-0000-000000000000"
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
router.get("/list",controller.listUserMenu);

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
 *               - businessMemberId
 *               - userId
 *               - menuCode
 *               - canCreate
 *               - canRead
 *               - canUpdate
 *               - canDelete
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: 00000000-0000-0000-0000-000000000000
 *               businessMemberId:
 *                 type: string
 *                 example: 00000001-0000-0000-0000-000000000000
 *               userId:
 *                 type: string
 *                 example: 00000000-0000-0001-0000-000000000000
 *               menuCode:
 *                 type: string
 *                 example: DB10000
 *               canCreate:
 *                 type: boolean
 *                 example: true
 *               canRead:
 *                 type: boolean
 *                 example: true
 *               canUpdate:
 *                 type: boolean
 *                 example: true
 *               canDelete:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/",controller.create);

/**
 * @swagger
 * /user-menu:
 *   put:
 *     summary: Update User Menu
 *     description: Update existing User Menu data
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: id
 *         required: true
 *         description: Id
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuCode
 *               - canCreate
 *               - canRead
 *               - canUpdate
 *               - canDelete
 *             properties:
 *               menuCode:
 *                 type: string
 *                 example: DB10000
 *               canCreate:
 *                 type: boolean
 *                 example: true
 *               canRead:
 *                 type: boolean
 *                 example: true
 *               canUpdate:
 *                 type: boolean
 *                 example: true
 *               canDelete:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       404:
 *         description: Data not found
 *       400:
 *         description: Validation error
 */
router.put("/", controller.update);

/**
 * @swagger
 * /user-menus:
 *   put:
 *     summary: Save User Menu
 *     description: Save existing User Menu data
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: businessMemberId
 *         required: true
 *         description: businessMemberId
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: query
 *         name: userId
 *         required: true
 *         description: userId
 *         schema:
 *           type: string
 *           example: "00000000-0000-0001-0000-000000000000"
 *       - in: query
 *         name: type
 *         required: true
 *         description: type
 *         schema:
 *           type: string
 *           example: "MEMBER_USER"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - menuCode
 *               - canCreate
 *               - canRead
 *               - canUpdate
 *               - canDelete
 *             properties:
 *               menuCode:
 *                 type: string
 *                 example: DB10000
 *               canCreate:
 *                 type: boolean
 *                 example: true
 *               canRead:
 *                 type: boolean
 *                 example: true
 *               canUpdate:
 *                 type: boolean
 *                 example: true
 *               canDelete:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Data updated successfully
 *       404:
 *         description: Data not found
 *       400:
 *         description: Validation error
 */
router.put("/", controller.saveUserMenus);

/**
 * @swagger
 * /user-menu:
 *   delete:
 *     summary: Delete User Menu
 *     description: Soft delete Data setting deletedAt timestamp
 *     tags:
 *       - User Menu
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *     responses:
 *       200:
 *         description: Data deleted successfully
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
 *                   example: Data deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Data not found
 *       500:
 *         description: Internal server error
 */
router.delete("/", controller.remove);

export default router;