import { Router } from "express";

import * as controller
from "./group-menu.controller.js";

const router = Router();

/**
 * @swagger
 * /group-menu:
 *   get:
 *     summary: Get Group Menu List
 *     tags:
 *       - Group Menu
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
 * /group-menu/{id}:
 *   get:
 *     summary: Get Group Menu Detail
 *     tags:
 *       - Group Menu
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
 * /group-menu:
 *   post:
 *     summary: Create Group Menu
 *     tags:
 *       - Group Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seqNo
 *               - code
 *               - name
 *             properties:
 *               seqNo:
 *                  type: int
 *                  example: 1
 *               businessId:
 *                 type: string
 *                 example: d4ea1a10-49a9-4ed3-8415-de3b8e619a91
 *               code:
 *                 type: string
 *                 example: DB
 *               name:
 *                 type: string
 *                 example: Dashboard
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /group-menu/{id}:
 *   put:
 *     summary: Update Group Menu
 *     description: Update existing Group Menu data
 *     tags:
 *       - Group Menu
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
 *               seqNo:
 *                  type: int
 *                  example: 1
 *               businessId:
 *                 type: string
 *                 example: d4ea1a10-49a9-4ed3-8415-de3b8e619a91
 *               code:
 *                 type: string
 *                 example: DB
 *               name:
 *                 type: string
 *                 example: Dashboard
 *     responses:
 *       200:
 *         description: Group Menu updated successfully
 *       404:
 *         description: Group Menu not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /group-menu/{id}:
 *   delete:
 *     summary: Delete Group Menu
 *     description: Soft delete group menu by setting deletedAt timestamp
 *     tags:
 *       - Group Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Group Menu ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Group Menu deleted successfully
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
 *                   example: Group Menu deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Group Menu not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.remove);

export default router;