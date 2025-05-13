import express from 'express';
import { getAllUsers, registerUser } from '../controllers/register.js';
import { upload } from '../../middlewares/multer.js';
const router = express.Router();

router.route('/api/auth/register').post(upload.single("profileImage"),registerUser)
router.route('/api/auth/users').get(getAllUsers);


export default router;