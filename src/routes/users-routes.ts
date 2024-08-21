import { Router } from "express";
import { loginUser, registerUser } from "../controller/users-controllers";
const router = Router();

/**
 * @swagger
 * /login-user:
 *   get:
 *     summary: user login
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               emailUser:
 *                 type: string
 *               passwordUser:
 *                 type: string
 *     responses:
 *       200:
 *         description: user logged in successfully and token generated
 *       400:
 *         description: invalid request
 */
router.get('/login-user', loginUser);
/**
 * @swagger
 * /register-user:
 *   post:
 *     summary: register user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               userEmail:
 *                 type: string
 *               userPassword:
 *                  type: string
 *               userAge:
 *                  type: number
 *               userCity:
 *                  type: string
 *     responses:
 *       200:
 *         description: register user in successfully and token generated
 *       400:
 *         description: invalid request
 */
router.post('/register-user', registerUser);

export default router; 