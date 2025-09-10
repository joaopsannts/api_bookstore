## Sprint 1 - Módulo Autor
### Funcionalidades
[x] Cadastro de autores
[x] Listagem de autores (com paginação)
[x] Busca por autor específico
[x] Atualização de dados do autor
[x] Remoção de autor
{
  "id": "string/number",
  "nome": "string",
  "biografia": "string",
  "dataNascimento": "date",
  "nacionalidade": "string",
  "createdAt": "datetime",
  "updatedAt": "datetime"
}

1 - Não mostrar mensagem de sucesso se tentar remover a capa de um livro que não tem capa - OK
2 - Se um livro já tem capa, quando casdastrar uma nova capa para o mesmo livro sistema deve remover a capa antiga - OK
3 -