import { Router } from "express";

import * as controller
from "./business.controller.js";

const router = Router();

/**
 * @swagger
 * /business:
 *   get:
 *     summary: Get Business List
 *     tags:
 *       - Business
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
 * /business/{id}:
 *   get:
 *     summary: Get Business Detail
 *     tags:
 *       - Business
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
 * /business:
 *   post:
 *     summary: Create Business
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - ownerName
 *             properties:
 *               name:
 *                 type: string
 *                 example: PT EIS Indonesia
 *               type:
 *                 type: string
 *                 example: COMPANY
 *               ownerName:
 *                 type: string
 *                 example: Alvino
 *               phone:
 *                 type: string
 *                 example: 08123456789
 *               address:
 *                 type: string
 *                 example: Bandung
 *               nation:
 *                 type: string
 *                 example: Indonesia
 *               province:
 *                 type: string
 *                 example: Jawa Barat
 *               city:
 *                 type: string
 *                 example: Bandung
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /business/{id}:
 *   put:
 *     summary: Update Business
 *     description: Update existing business data
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: PT EIS Indonesia
 *               type:
 *                 type: string
 *                 example: COMPANY
 *               ownerName:
 *                 type: string
 *                 example: Alvino
 *               phone:
 *                 type: string
 *                 example: 08123456789
 *               address:
 *                 type: string
 *                 example: Bandung
 *               nation:
 *                 type: string
 *                 example: Indonesia
 *               province:
 *                 type: string
 *                 example: Jawa Barat
 *               city:
 *                 type: string
 *                 example: Bandung
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Business updated successfully
 *       404:
 *         description: Business not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /business/{id}:
 *   delete:
 *     summary: Delete Business
 *     description: Soft delete business by setting deletedAt timestamp
 *     tags:
 *       - Business
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Business ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Business deleted successfully
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
 *                   example: Business deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Business not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.remove);

export default router;