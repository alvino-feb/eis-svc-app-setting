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
router.post(
  "/",
  controller.create
);

/**
 * @swagger
 * /user/{id}:
 *   put:
 *     summary: Update User
 *     description: Update existing User data
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

export default router;