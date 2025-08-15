import { Router } from "express";
import { cadastrarAutor, listarTodosAutores, listarAutor } from "../controllers/autorController.js";

const router = Router();

router.post("/", cadastrarAutor);
router.get("/", listarTodosAutores);
router.get("/:id", listarAutor)

export default router;
