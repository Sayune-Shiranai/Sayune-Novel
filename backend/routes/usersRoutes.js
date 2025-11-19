// routes/userRoutes.js
import express from 'express';
import { getAllUser, getUserById } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUser);
router.get('/:id', getUserById);

export default router;
