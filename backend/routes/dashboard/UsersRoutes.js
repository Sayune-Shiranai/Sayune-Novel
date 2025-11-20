import express from "express";
import {
    UserGetAllForum,
    UserGetAllBook
} from "../../controllers/usersController.js";

const router = express.Router();
router.get("/user-book", UserGetAllBook); // /dashboard/book/user-book
router.get("/user-forum", UserGetAllForum); // /dashboard/user/user-forum

export default router;