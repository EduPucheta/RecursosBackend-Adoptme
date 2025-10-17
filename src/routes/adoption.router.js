import { Router} from 'express';
import adoptionsController from '../controllers/adoptions.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Adoption:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The auto-generated id of the adoption.
 *         owner:
 *           type: string
 *           description: The ID of the user who is adopting.
 *         pet:
 *           type: string
 *           description: The ID of the pet being adopted.
 *       required:
 *         - owner
 *         - pet
 */

/**
 * @swagger
 * /api/adoptions:
 *   get:
 *     summary: Retrieve a list of adoptions
 *     tags: [Adoptions]
 *     responses:
 *       200:
 *         description: A list of adoptions.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Adoption'
 */
router.get('/',adoptionsController.getAllAdoptions);

/**
 * @swagger
 * /api/adoptions/{aid}:
 *   get:
 *     summary: Get an adoption by ID
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: aid
 *         schema:
 *           type: string
 *         required: true
 *         description: The adoption ID
 *     responses:
 *       200:
 *         description: The adoption description by id
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: The adoption was not found
 */
router.get('/:aid',adoptionsController.getAdoption);

/**
 * @swagger
 * /api/adoptions/{uid}/{pid}:
 *   post:
 *     summary: Create a new adoption
 *     tags: [Adoptions]
 *     parameters:
 *       - in: path
 *         name: uid
 *         schema:
 *           type: string
 *         required: true
 *         description: The user ID
 *       - in: path
 *         name: pid
 *         schema:
 *           type: string
 *         required: true
 *         description: The pet ID
 *     responses:
 *       201:
 *         description: The adoption was created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Adoption'
 *       404:
 *         description: The user or pet was not found
 *       500:
 *         description: Some server error
 */
router.post('/:uid/:pid',adoptionsController.createAdoption);

export default router;