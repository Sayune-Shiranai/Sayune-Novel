import express from "express";
import BookController from "../../controllers/book.controller.js";

const router = express.Router();

router.get("/", BookController.getAll);
router.post("/", BookController.create);
router.post("/:slug", BookController.update);
router.delete("/:id", BookController.delete);

export default router;
