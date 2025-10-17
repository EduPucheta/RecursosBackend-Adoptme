import { Router } from 'express';
import sessionsController from '../controllers/sessions.controller.js';

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     RegisterInput:
 *       type: object
 *       properties:
 *         first_name:
 *           type: string
 *         last_name:
 *           type: string
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - first_name
 *         - last_name
 *         - email
 *         - password
 *     LoginInput:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - email
 *         - password
 */

/**
 * @swagger
 * /api/sessions/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *     responses:
 *       200:
 *         description: User registered successfully
 *       400:
 *         description: Invalid input
 */
router.post('/register',sessionsController.register);

/**
 * @swagger
 * /api/sessions/login:
 *   post:
 *     summary: Login a user
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized
 */
router.post('/login',sessionsController.login);

/**
 * @swagger
 * /api/sessions/current:
 *   get:
 *     summary: Get current user
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Current user data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized
 */
router.get('/current',sessionsController.current);

/**
 * @swagger
 * /api/sessions/unprotectedLogin:
 *   get:
 *     summary: Unprotected login for testing
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Logged in
 */
router.get('/unprotectedLogin',sessionsController.unprotectedLogin);

/**
 * @swagger
 * /api/sessions/unprotectedCurrent:
 *   get:
 *     summary: Unprotected current for testing
 *     tags: [Sessions]
 *     responses:
 *       200:
 *         description: Current user data
 */
router.get('/unprotectedCurrent',sessionsController.unprotectedCurrent);

export default router;