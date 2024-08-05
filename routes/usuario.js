import { Usuario } from "../models/usuario.js"
import { usuarioValidation } from "../utils/validations.js";
import { Router } from "express"; 

export const usuariosRouter = Router();

// INSERÇÃO DE USUÁRIO [POST]
usuariosRouter.post("/usuarios", async (req, res) => {
    const {error, value} = usuarioValidation.validate(req.body, {abortEarly: false});

    if(error) {
        res.status(400).json({ message: "Dados inválidos.", error: error.details });
        return;
    }

    const { nome, email, senha } = value;

    try {
        const novoUsuario = new Usuario({ nome, email, senha });
        await novoUsuario.save();
        res.json({ message: "Usuario criado com sucesso." });
    }catch(err) {
        res.status(500).json({ message: "Um erro ocorreu ao criar um usuário.", error: err});
    }
});

// LISTAGEM DE USUÁRIO [GET]
usuariosRouter.get("/usuarios", async (req, res) => {
    const lista = await Usuario.find();
    res.json(lista);
});

usuariosRouter.get("/usuario/:id", async (req, res) => {
    const usuario = await Usuario.findById(req.params.id).select('-__v');

    if(usuario) {
        res.json(usuario);
    } else {
        res.status(404).json({ message: "Usuário não encontrado"});
    }
});