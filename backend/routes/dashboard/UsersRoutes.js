import express from "express";
import {
    GetPaged,
    updateRole,
    deleteUser,
    approve,
    reject,
    // UserGetAllForum,
    // UserGetAllBook
} from "../../controllers/usersController.js";

const router = express.Router();
router.get("/", GetPaged); // /dashboard/user
router.post("/:id/role", updateRole); // /dashboard/user/:id/role
router.delete("/:id", deleteUser); // /dashboard/user/:id
router.post("/:id/approve", approve); // /dashboard/user/:id/approve
router.post("/:id/reject", reject); // /dashboard/user/:id/reject
// router.get("/user-book", UserGetAllBook); // /dashboard/book/user-book
// router.get("/user-forum", UserGetAllForum); // /dashboard/user/user-forum

export default router;