import { Router } from "express";
import {
  cadastrarAutor,
  listarTodosAutores,
  listarAutor,
  atualizarAutor,
} from "../controllers/autorController.js";

const router = Router();

router.post("/", cadastrarAutor);
router.get("/", listarTodosAutores);
router.get("/:id", listarAutor);
router.put("/:id", atualizarAutor);

export default router;
