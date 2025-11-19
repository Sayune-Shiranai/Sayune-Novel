// routes/roleRoutes.js
import express from 'express';
import { getAllRole, getRoleById } from '../controllers/roleController.js';

const router = express.Router();

router.get('/', getAllRole);
router.get('/:id', getRoleById);

export default router;
