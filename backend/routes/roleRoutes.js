// routes/roleRoutes.js
import express from 'express';
import { 
    GetPaged 
} from '../controllers/roleController.js';

const router = express.Router();

router.get('/', GetPaged);

export default router;
