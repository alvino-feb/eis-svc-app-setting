import { Router } from "express";

import * as controller
from "./role.controller.js";

const router = Router();

/**
 * @swagger
 * /role/{businessId}:
 *   get:
 *     summary: Get Role List
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business Id
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:businessId", controller.list);

/**
 * @swagger
 * /role/by-member/{businessId}/{businessMemberId}:
 *   get:
 *     summary: Get Role Detail by Member
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business Id
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: businessMemberId
 *         required: true
 *         description: Business Member Id
 *         schema:
 *           type: string
 *           example: "00000001-0000-0000-0000-000000000000"
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/by-member/:businessId/:businessMemberId", controller.detailByMember);

/**
 * @swagger
 * /role:
 *   post:
 *     summary: Create Role
 *     tags:
 *       - Role
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
 *               - code
 *               - name
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: d4ea1a10-49a9-4ed3-8415-de3b8e619a91
 *               code:
 *                 type: string
 *                 example: ADM
 *               name:
 *                 type: string
 *                 example: Administrator
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update Role
 *     description: Update existing Role data
 *     tags:
 *       - Role
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
 *               code:
 *                 type: string
 *                 example: ADM
 *               name:
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
// router.put("/:id", controller.update);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete Role
 *     description: Soft delete role by setting deletedAt timestamp
 *     tags:
 *       - Role
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

/**
 * @swagger
 * /role/menu/{businessId}/{id}:
 *   get:
 *     summary: Get Role with Role Menu
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0002-000000000000"
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/menu/:businessId/:id", controller.getRoleWithMenu);

/**
 * @swagger
 * /role/menu:
 *   post:
 *     summary: Create Role with Role Menu
 *     tags:
 *       - Role
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
 *               - code
 *               - name
 *               - menus
 *             properties:
 *               businessId:
 *                 type: string
 *               businessMemberId:
 *                 type: string
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               menus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuCode:
 *                       type: string
 *                     create:
 *                       type: boolean
 *                     edit:
 *                       type: boolean
 *                     delete:
 *                       type: boolean
 *           example:
 *             businessId: "00000000-0000-0000-0000-000000000001"
 *             businessMemberId: "00000000-0000-0000-0000-000000000010"
 *             code: "ADMIN"
 *             name: "Administrator"
 *             menus:
 *               - menuCode: "DASHBOARD"
 *                 create: false
 *                 edit: false
 *                 delete: false
 *               - menuCode: "PRODUCT"
 *                 create: true
 *                 edit: true
 *                 delete: true
 *               - menuCode: "ORDER"
 *                 create: true
 *                 edit: true
 *                 delete: false
 *               - menuCode: "REPORT"
 *                 create: false
 *                 edit: false
 *                 delete: false
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/menu", controller.createWithMenu);

/**
 * @swagger
 * /role/menu:
 *   put:
 *     summary: Update Role with Role Menu
 *     description: Update existing role data with role menu
 *     tags:
 *       - Role
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
 *               - code
 *               - name
 *               - menus
 *             properties:
 *               businessId:
 *                 type: string
 *               businessMemberId:
 *                 type: string
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               menus:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     menuCode:
 *                       type: string
 *                     create:
 *                       type: boolean
 *                     edit:
 *                       type: boolean
 *                     delete:
 *                       type: boolean
 *           example:
 *             businessId: "00000000-0000-0000-0000-000000000001"
 *             businessMemberId: "00000000-0000-0000-0000-000000000010"
 *             code: "ADMIN"
 *             name: "Administrator"
 *             menus:
 *               - menuCode: "DASHBOARD"
 *                 create: false
 *                 edit: false
 *                 delete: false
 *               - menuCode: "PRODUCT"
 *                 create: true
 *                 edit: true
 *                 delete: true
 *               - menuCode: "ORDER"
 *                 create: true
 *                 edit: true
 *                 delete: false
 *               - menuCode: "REPORT"
 *                 create: false
 *                 edit: false
 *                 delete: false
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       400:
 *         description: Validation error
 */
router.put("/menu", controller.updateWithMenu);

/**
 * @swagger
 * /role/menu/{businessId}/{id}:
 *   delete:
 *     summary: Delete Role with Role Menu
 *     description: Soft delete role by setting deletedAt timestamp
 *     tags:
 *       - Role
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business Id
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: id
 *         required: true
 *         description: Role ID
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0000-000000000000"
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
router.delete("/menu/:businessId/:id", controller.removeWithMenu);

export default router;