import express from "express";
import { verifyToken } from "../middleware/verifyToken.js";
import {
    GetMyFollowedBooks
} from "../controllers/bookfollowingController.js";

const router = express.Router();

router.get("/", GetMyFollowedBooks)

export default router;
