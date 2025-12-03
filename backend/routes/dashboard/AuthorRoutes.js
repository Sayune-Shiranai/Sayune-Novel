import express from "express";

import { 
    GetPaged,
    createAuthor,
    updateAuthor,
    deleteAuthor
 } from "../../controllers/authorController.js";

const router = express.Router();

router.get("/", GetPaged);
router.post("/create", createAuthor);
router.post("/update/:id", updateAuthor);
router.delete("/delete/:id", deleteAuthor);

export default router;
