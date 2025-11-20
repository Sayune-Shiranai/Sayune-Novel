import express from "express";
import {
    ForumGetUser
} from "../../controllers/forumController.js";

const router = express.Router();
router.get("/forum-user", ForumGetUser); // /dashboard/forum/user-forum

export default router;