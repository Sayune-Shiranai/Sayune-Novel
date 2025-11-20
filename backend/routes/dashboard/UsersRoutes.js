import express from "express";
import {
    UserGetAllForum
} from "../../controllers/usersController.js";

const router = express.Router();
router.get("/user-forum", UserGetAllForum); // /dashboard/user/user-forum

export default router;