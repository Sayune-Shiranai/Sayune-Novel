import express from "express";
import {
    GetPaged,
    GetAllUserFollowBook
} from '../../controllers/bookfollowingController.js'

const router = express.Router();

router.get("/", GetPaged);  //dashboard/bookfollwing
router.get("/:slug", GetAllUserFollowBook);

export default router;