// routes/userRoutes.js
import express from 'express';
import {
    getAllUsers,
    // getUserById 
} from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getAllUsers); // /user
// router.get('/:id', getUserById);

export default router;
