import { Cliente } from "../models/cliente.js";
import { Pet } from "../models/pet.js"; 
import { Router } from "express"; 
// Atenção! Precisa colocar a extensão do arquivo no final

// Cria o módulo de rotas
export const petsRouter = Router();

// [GET] /pets -> listar todos os pets
petsRouter.get("/pets", async (req, res) => {
    // const listaPets = await Pet.findAll();
    const listaPets = await Pet.findAll({include: [Cliente]});
    res.send(listaPets);
});

// [GET] /pets/:id -> listar um pet específico
petsRouter.get("/pets/:id", async (req, res) => {
    const pet = await Pet.findOne({
      where: { id: req.params.id },
      attributes: { exclude: ["createdAt", "updatedAt"] }, // não projeta essas duas infos do Pet
      include: [{ model: Cliente, attributes: ["id", ["nome", "nomeCliente"]] }], // vai mostrar só o id e nome do cliente, junto com o Pet
      // ["nome", "nomeCliente"] é o ALIAS renomeando a coluna nome de Cliente
      // include: [{ model: Cliente, attributes: {exclude: ["senha"]} }], se quisesse excluir só o campo senha do usuário para não mostrar junto com o pet
    });
  
    if (pet) {
      res.json(pet);
    } else {
      res.status(404).json({ message: "Pet não encontrado." });
    }
  });

// [DELETE] /pets/:id -> deletar um pet específico
petsRouter.delete("/pets/:id", async (req, res) => {
    const idPet = req.params.id; 
    try{
        const pet = await Pet.findOne({where: {id: idPet} });
        // const pet = await Pet.findByPk(req.params.id) outra forma de fazer e não precisaria da linha antes do try
        if(pet) {
            await pet.destroy();
            res.json({ message: "Pet excluído com sucesso."});
        } else {
            res.status(404).json({ message: "Pet não encontrado."});
        }
    }catch(err){
        res.status(500).json({ message: "Erro ao excluir o pet."});
    }
});

// [POST] /pets -> inserir um novo pet
petsRouter.post("/pets", async (req, res) => {
    const {nome, tipo, porte, dataNasc, clienteId} = req.body;

    try {
        const cliente = await Cliente.findByPk(clienteId); // só insere novo pet se tiver um cliente, precisa dessa validação para ter um controle maior
        // Atenção! Sempre em inserir e atualizar, verificar a relação dos dados
        if(cliente) {
            await Pet.create({ nome, tipo, porte, dataNasc, clienteId });
            res.json({ menssage: "Pet adicionado com sucesso."});
        } else {
            res.status(404).json({ message: "Falha ao inserir pet. Cliente não encontrado."})
        }
    } catch(err) {
        console.log(err);
        res.status(500).json({ message: "Erro ao adicionar o Pet."})
    }
});

// [PUT] /pets/: id -> Atualizar um pet
petsRouter.put("/pets/:id", async (req, res) => {
    const { nome, tipo, porte, dataNasc } = req.body; // aqui não deixa atualizar o cliente, removemos o clienteId

    try {
      const pet = await Pet.findByPk(req.params.id);
        // const pet = aeait Pet.findByPk(req.params.id); também poderia usar e não precisaria da linha const idPet
        if(pet) {
            await pet.update({nome, tipo, porte, dataNasc}); // removemos o clienteId para não atualizar essa parte
            res.json({message: "Pet atualizado."});
        } else {
            res.status(404).json({ message: "Pet não encontrado!"});
        }
    } catch(err) {
        res.status(500).json({ message: "Erro ao atualizar o pet."})
    }
});