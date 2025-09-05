import { Router } from "express";
import {
  cadastrarLivro,
  listarTodosLivros,
  cadastrarCapaLivro
} from "../controllers/livroController.js";

//middlewares
import { imageUpload } from "../middleware/imageUpload.js";

const router = Router();
//http://localhost:3333/api/livros
router.post("/", cadastrarLivro);
router.get("/", listarTodosLivros);

//ROTAS DAS IMAGENS
router.post("/:id/imagem", imageUpload.single('imagem'), cadastrarCapaLivro);

export default router;
