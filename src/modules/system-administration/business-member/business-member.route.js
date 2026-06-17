import { Router } from "express";

import * as controller
from "./business-member.controller.js";

const router = Router();

/**
 * @swagger
 * /business-member:
 *   get:
 *     summary: Get Business Member List
 *     tags:
 *       - Business Member
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
 * /business-member/{id}:
 *   get:
 *     summary: Get Business Member Detail
 *     tags:
 *       - Business Member
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
 * /business-member:
 *   post:
 *     summary: Create Business Member
 *     tags:
 *       - Business Member
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
 *               - type
 *             properties:
 *               businessId:
 *                 type: string
 *                 example: d4ea1a10-49a9-4ed3-8415-de3b8e619a91
 *               code:
 *                 type: string
 *                 example: KBBR
 *               name:
 *                 type: string
 *                 example: Kopibara Caffe
 *               type:
 *                 type: string
 *                 example: FNB
 *               phone:
 *                 type: string
 *                 example: 08123456789
 *               address:
 *                 type: string
 *                 example: Bandung
 *               url:
 *                 type: string
 *                 example: kopibara.domain.com
 *               isActive:
 *                  type: boolean
 *                  example: true
 *     responses:
 *       201:
 *         description: Created
 */
router.post("/", controller.create);

/**
 * @swagger
 * /business-member/{id}:
 *   put:
 *     summary: Update Business Member
 *     description: Update existing business member data
 *     tags:
 *       - Business Member
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Business Member ID
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
 *                 example: KBBR
 *               name:
 *                 type: string
 *                 example: Kopibara Caffe
 *               type:
 *                 type: string
 *                 example: FNB
 *               phone:
 *                 type: string
 *                 example: 08123456789
 *               address:
 *                 type: string
 *                 example: Bandung
 *               url:
 *                 type: string
 *                 example: kopibara.domain.com
 *               isActive:
 *                  type: boolean
 *                  example: true
 *     responses:
 *       200:
 *         description: Business Member updated successfully
 *       404:
 *         description: Business Member not found
 *       400:
 *         description: Validation error
 */
router.put("/:id", controller.update);

/**
 * @swagger
 * /business-member/{id}:
 *   delete:
 *     summary: Delete Business Member
 *     description: Soft delete business member by setting deletedAt timestamp
 *     tags:
 *       - Business Member
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: Business Member ID
 *         schema:
 *           type: string
 *           format: uuid
 *     responses:
 *       200:
 *         description: Business Member deleted successfully
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
 *                   example: Business Member deleted successfully
 *                 data:
 *                   nullable: true
 *                   example: null
 *       404:
 *         description: Business Member not found
 *       500:
 *         description: Internal server error
 */
router.delete("/:id", controller.remove);

export default router;