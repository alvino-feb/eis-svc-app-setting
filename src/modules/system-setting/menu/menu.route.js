import { Router } from "express";

import * as controller
from "./menu.controller.js";

const router = Router();

/**
 * @swagger
 * /menu:
 *   get:
 *     summary: Get Menu List
 *     tags:
 *       - Menu
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
 * /menu/{id}:
 *   get:
 *     summary: Get Menu Detail
 *     tags:
 *       - Menu
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
 * /menu:
 *   post:
 *     summary: Create Menu
 *     tags:
 *       - Menu
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seqNo
 *               - groupCode
 *               - code
 *               - name
 *               - type
 *               - level
 *             properties:
 *               seqNo:
 *                  type: int
 *                  example: 10000
 *               groupCode:
 *                 type: string
 *                 example: DB
 *               code:
 *                 type: string
 *                 example: DB10000
 *               name:
 *                 type: string
 *                 example: Dashboard
 *               type:
 *                 type: string
 *                 example: P
 *               level:
 *                 type: string
 *                 example: 1
 *               parentCode:
 *                 type: string
 *                 example: DB10000
 *               path:
 *                 type: string
 *                 example: /dashboard
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /menu/{id}:
 *   put:
 *     summary: Update Menu
 *     description: Update existing Menu data
 *     tags:
 *       - Menu
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
 *                  example: 10000
 *               groupCode:
 *                 type: string
 *                 example: DB
 *               code:
 *                 type: string
 *                 example: DB10000
 *               name:
 *                 type: string
 *                 example: Dashboard
 *               type:
 *                 type: string
 *                 example: P
 *               level:
 *                 type: string
 *                 example: 1
 *               parentCode:
 *                 type: string
 *                 example: DB10000
 *               path:
 *                 type: string
 *                 example: /dashboard
 *     responses:
 *       200:
 *         description: Menu updated successfully
 *       404:
 *         description: Menu not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /group-menu/{id}:
 *   delete:
 *     summary: Delete Menu
 *     description: Soft delete menu by setting deletedAt timestamp
 *     tags:
 *       - Menu
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Menu ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Menu deleted successfully
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
 *                   example: Menu deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Menu not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.remove);

export default router;