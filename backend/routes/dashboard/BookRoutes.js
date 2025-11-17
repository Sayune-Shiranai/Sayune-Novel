import express from "express";
import BookController from "../../controllers/BookController.js";

const router = express.Router();

router.get("/", BookController.getAll);
router.post("/create-book", BookController.create);
router.post("/:slug", BookController.update);
router.delete("/:id", BookController.delete);

export default router;
