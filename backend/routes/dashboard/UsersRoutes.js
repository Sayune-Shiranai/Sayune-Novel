import express from "express";
import {
    GetPaged,
    updateUser,
    deleteUser,
    approveUser,
    rejectUser,
    // UserGetAllForum,
    // UserGetAllBook
} from "../../controllers/usersController.js";

const router = express.Router();
router.get("/", GetPaged); // /dashboard/user
router.post("/update/:id", updateUser); // /dashboard/user/:id/role
router.delete("delete/:id", deleteUser); // /dashboard/user/:id
router.post("/:id/approve", approveUser); // /dashboard/user/:id/approve
router.post("/:id/reject", rejectUser); // /dashboard/user/:id/reject
// router.get("/user-book", UserGetAllBook); // /dashboard/book/user-book
// router.get("/user-forum", UserGetAllForum); // /dashboard/user/user-forum

export default router;