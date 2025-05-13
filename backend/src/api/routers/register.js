import express from 'express';
import { getAllUsers, registerUser } from '../controllers/register.js';
const router = express.Router();

router.route('/api/auth/register').post(registerUser)
router.route('/api/auth/users').get(getAllUsers);


export default router;