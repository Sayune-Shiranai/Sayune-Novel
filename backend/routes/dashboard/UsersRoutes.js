import express from "express";
import {
    GetPaged,
    updateUser,
    deleteUser,
    approveUser,
    rejectUser,
    getUserById
    // UserGetAllForum,
    // UserGetAllBook
} from "../../controllers/usersController.js";

const router = express.Router();
router.get("/", GetPaged); // dashboard/user
router.put("/update/:id", updateUser); // dashboard/user/update/:id/
router.delete("/delete/:id", deleteUser); // dashboard/user/delete/:id
router.post("/approve/:id", approveUser); // dashboard/user/approve/:id
router.post("/reject/:id", rejectUser); // dashboard/user/reject/:id
router.get("/:id", getUserById); // dashboard/user/:id
// router.get("/user-book", UserGetAllBook); // dashboard/book/user-book
// router.get("/user-forum", UserGetAllForum); // dashboard/user/user-forum

export default router;