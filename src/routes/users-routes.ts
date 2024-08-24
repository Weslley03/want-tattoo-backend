import { Router } from "express";
import { loginUser, registerUser, updateProfileUser } from "../controller/users-controllers";
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
router.get('/login', loginUser);
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
router.post('/register', registerUser);

/**
 * @swagger
 * /update-profile-user:
 *   patch:
 *     summary: Update user profile
 *     description: this endpoint allows an authenticated user to update their profile information. requires a valid bearer token in the authorization headers.
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
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
 *                 type: string
 *               userAge:
 *                 type: number
 *               userCity:
 *                 type: string
 *     responses:
 *       200:
 *         description: user profile updated successfully.
 *       400:
 *         description: invalid request.
 *       401:
 *         description: unauthorized. Bearer token is missing or invalid.
 */
router.patch('/update-profile/:userID', updateProfileUser);

export default router; 