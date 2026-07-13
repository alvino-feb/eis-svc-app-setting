import { Router }
from "express";

import * as controller
from "./user.controller.js";

const router = Router();

/**
 * @swagger
 * /user:
 *   get:
 *     summary: Get User List
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
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
router.get("/", controller.list);

/**
 * @swagger
 * /user/{id}:
 *   get:
 *     summary: Get User Detail
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:id", controller.detail);

/**
 * @swagger
 * /user/{businessId}/member/{businessMemberId}/role/{roleId}:
 *   get:
 *     summary: Get User Detail by Member dan Role
 *     tags:
 *       - User
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
 *       - in: path
 *         name: roleId
 *         required: true
 *         description: Role Id
 *         schema:
 *           type: string
 *           example: "00000000-0000-0000-0002-000000000000"
 *     responses:
 *       200:
 *         description: Success
 */
router.get("/:businessId/member/:businessMemberId/role/:roleId", controller.detailByMemberAndRole);

/**
 * @swagger
 * /user:
 *   post:
 *     summary: Create User
 *     tags:
 *       - User
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
router.post("/",controller.create);

/**
 * @swagger
 * /user/menu:
 *   post:
 *     summary: Create User with Menu
 *     tags:
 *       - User
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
 *               - roleId
 *               - username
 *               - password
 *               - fullName
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: "00000000-0000-0000-0000-000000000000"
 *               businessMemberId:
 *                 type: string
 *                 example: "00000001-0000-0000-0000-000000000000"
 *               roleId:
 *                 type: string
 *                 example: "00000000-0000-0000-0003-000000000000"
 *               username:
 *                 type: string
 *                 example: "admin@email.com"
 *               password:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phone:
 *                 type: string
 *               isActive:
 *                  type: boolean
 *                  example: true
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/menu",controller.createWithRole);

/**
 * @swagger
 * /user:
 *   put:
 *     summary: Update User
 *     description: Update existing User data
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: 00000000-0000-0000-0000-000000000000
 *               id:
 *                 type: string
 *                 example: 00000000-0001-0000-0000-000000000000
 *               username:
 *                 type: string
 *                 example: admin@email.com
 *               fullName:
 *                 type: string
 *                 example: Super Administrator
 *               phone:
 *                 type: string
 *                 example: "0856123454321"
 *               password:
 *                 type: string
 *               isActive:
 *                  type: boolean
 *                  example: true
 *     responses:
 *       200:
 *         description: Role updated successfully
 *       404:
 *         description: Role not found
 *       400:
 *         description: Validation error
 */
router.put("/", controller.update);

/**
 * @swagger
 * /user/{id}:
 *   delete:
 *     summary: Delete User
 *     description: Soft delete user by setting deletedAt timestamp
 *     tags:
 *       - User
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
 * /user/menu/{businessId}/{businessMemberId}/{id}:
 *   delete:
 *     summary: Delete User With Role
 *     description: Soft delete user by setting deletedAt timestamp
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: businessId
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "00000000-0000-0000-0000-000000000000"
 *       - in: path
 *         name: businessMemberId
 *         required: true
 *         description: Business Member ID
 *         schema:
 *           type: string
 *           format: uuid
 *           example: "00000001-0000-0000-0000-000000000000"
 *       - in: path
 *         name: id
 *         required: true
 *         description: User ID
 *         schema:
 *           type: string
 *           format: uuid
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
router.delete("/menu/:businessId/:businessMemberId/:id",
  controller.removeWithRole
);

export default router;