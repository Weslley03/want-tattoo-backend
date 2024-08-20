import { Router } from "express";
import { loginUser } from "../controller/users-controllers";
const router = Router();

router.get('login-user', loginUser);
router.post('/register-user');

export default router;