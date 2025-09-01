//importar os dois modelos selec JOINS
import { autorModel, livroModel } from "../models/associations.js";

export const cadastrarLivro = async (request, response) => {
  const {
    titulo,
    isbn,
    descricao,
    ano_publicacao,
    genero,
    quantidade_total,
    quantidade_disponivel,
    autores
  } = request.body;

  if(!titulo){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo titulo não pode ser nulo"
    })
    return
  }

  if(!isbn){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo isbn não pode ser nulo"
    })
    return
  }

  if(!descricao){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo descrição não pode ser nulo"
    })
    return
  }

  if(!ano_publicacao){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo ano_publicacao não pode ser nulo"
    })
    return
  }

  if(!genero){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo genero não pode ser nulo"
    })
    return
  }

  if(!quantidade_total){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo quantidade_total não pode ser nulo"
    })
    return
  }

  if(!quantidade_disponivel){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo quantidade_disponivel não pode ser nulo"
    })
    return
  }

  if(!Array.isArray(autores) || autores.length === 0){
    response.status(400).json({
        erro: 'Campo inválido',
        mensagem:"Campo autores não pode ser nulo e deve conter pelo menos 1 autor"
    })
    return
  }
  console.log('autores  ===> ',autores)
  try {
    //encontrar os autores na tabela autor pelo array de ID recebidos
    const autoresEncontrados = await autorModel.findAll({
        where: {
            id: autores
        }
    })
    console.log(autoresEncontrados)
    //validar se encontror autores
    if(autoresEncontrados.length !== autores.length){
        response.status(404).json({
            erro: "Id inválido",
            mensagem:"Um ou mais ID de autores são inválidos ou não existe"
        })
        return
    }

    //inserir autores na tabela de livros
    const livro = await livroModel.create({
        titulo,
        isbn,
        descricao,
        ano_publicacao,
        genero,
        quantidade_total,
        quantidade_disponivel
    })
    await livro.addAutores(autores)
    // response.status(201).json({mensagem: "Livro cadastrado"})

    //livro com autores
    const livrosComAutores = await livroModel.findByPk(livro.id, {
        attributes: {exclude: ["created_at","updated_at"]},
        include:{
            model: autorModel,
            attributes: {exclude: ["created_at","updated_at"]},
            through:{attributes: []}
        }
    })
    response.status(201).json({mensagem: "Livro cadastrado", livrosComAutores})
  } catch (error) {
    console.log(error)
    response.status(500).json({mensagem:"Erro interno ao cadastrar livro"})
  }
};

// offset pagination / cursor pagination
export const listarTodosLivros = async (request, response) => {
  const page = parseInt(request.query.page) || 1;
  const limit = parseInt(request.query.limit) || 10;
  
  const offset = (page - 1) * limit;
  // X =  (3 - 1) * 10 = 20    
  try {
    const livros = await livroModel.findAndCountAll({
      include: {
        model: autorModel,
        through: {attributes: []}
      },
      offset,
      limit
    })
    console.log(livros.count)
    console.log(livros.rows)

    const livrosFormatados = livros.rows.map((livro)=>{
      return {
        id: livro.id,
        titulo: livro.titulo,
        isbn: livro.isbn,
        descricao: livro.descricao,
        ano_publicacao: livro.ano_publicacao,
        genero: livro.genero,
        quantidade_total: livro.quantidade_total,
        quantidade_disponivel: livro.quantidade_disponivel,
        autores: livro.autores.map((autor)=>({
          id: autor.id,
          nome: autor.nome
        }))
      }
    })

    const totalDePaginas = Math.ceil(livros.count / limit)
    //                      (25 / 10) = 2,5 
    response.status(200).json({
      totalLivros: livros.count,
      totalPaginas: totalDePaginas,
      paginalAtual: page,
      livrosPorPagina: limit,
      livros: livrosFormatados
    })
  } catch (error) {
    console.log(error)
    response.status(500).json({mensagem: "Erro ao buscar livros"})
  }

}