import Joi from "joi";

// Validação para a inserção/atualização de um contato
export const contatoValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  // não vai permitir que seja um número ou outra coisa que não seja uma string com tamanho máximo de 150 e obrigatório (required)
  sobrenome: Joi.string().max(150),
  email: Joi.string().email(),
  telefone: Joi.string().required(),
  observacoes: Joi.string().max(200),
  favorito: Joi.boolean(),
});

// Calidação para inserir usuário
export const usuarioValidation = Joi.object({
  nome: Joi.string().max(150).required(),
  email: Joi.string().email().required(),
  senha: Joi.string().min(8).required()
});