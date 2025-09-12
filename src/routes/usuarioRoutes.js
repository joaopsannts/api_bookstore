import {Router} from "express";
import {criarUsuario, login} from "../controllers/usuarioController.js";

const router = Router()

router.post('/', criarUsuario)
//http://localhost:3333/api/
router.post('/login', login)


export default router;