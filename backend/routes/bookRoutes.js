import express from "express";
import { verifyToken } from "../middleware/verifyToken.js"; 
import {
  GetAllBook,
  GetBook,
  FollowBook,
  UnfollowBook
} from "../controllers/bookController.js";

const router = express.Router();

router.get("/", GetAllBook); // GET /book
router.get("/:slug", GetBook); // GET /book/:slug
router.post("/:slug/follow", verifyToken, FollowBook); // GET /book/:slug/follow
router.delete("/:slug/unfollow", verifyToken, UnfollowBook); // GET /book/:slug/follow

export default router;
