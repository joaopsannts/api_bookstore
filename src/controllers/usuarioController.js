import { usuarioModel } from "../models/associations.js"

export const criarUsuario = async(request, response) => {
    const {nome, email, senha} = request.body;
    const funcao = request.body.funcao || "comum";

    if(!nome){
        response.status(400).json({mensagem:"nome é obrigatório"})
        return
    };
    if(!email){
        response.status(400).json({mensagem:"e-mail é obrigatório"})
        return
    };
    if(!senha){
        response.status(400).json({meensagem:"senha é obrigatória"})
        return
    };

    const salt = bcrypt.genSaltSync(12);
    const senhaCrypto = bcrypt.hashSync(senha, salt);

    const usuario = {
        nome, 
        email, 
        senha: senhaCrypto,
        funcao

    }
    try {
        const novoUsuario = await usuarioModel.create(usuario)
        response.status(201).json(novoUsuario)
    } catch (error) {}

};

export const login = async(request, response) => {};
