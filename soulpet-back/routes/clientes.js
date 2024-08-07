import { Cliente } from "../models/cliente.js";
import { Endereco } from "../models/endereco.js"; 
import { Router } from "express"; 
// Atenção! Precisa colocar a extensão do arquivo no final

// Cria o módulo de rotas
export const clientesRouter = Router();

// Listagem de todos os clientes
clientesRouter.get("/clientes", async (req, res) => {
    // findAll é como se fosse o SELECT * FROM clientes do MySQL 
    const listaClientes = await Cliente.findAll();
    res.send(listaClientes);
});

// Listagem de um cliente específico (ID =?)
// :id => parâmetro de rota
clientesRouter.get("/clientes/:id", async (req, res) => { // id pode ser outro nome, mas precisa se repetir na linha abaixo também
    // teste: aqui ele vai mostrar o que estiver no :id da url após o /clientes será o req.params
    // console.log(req.params.id); 
    // res.send("Cliente");

    //SELECT * FROM clientes WHERE id = 1;
    // busca o cliente, onde o id dele foi passado por params
    const cliente = await Cliente.findOne({ 
        where: { id: req.params.id }, // esse id é da coluna lá de cliente do banco
        include: [Endereco] // juntar os dados do cliente com seu respectivo endereço    
    }); 

    if (cliente) {
        res.json(cliente);
    } else {
        res.status(404).json({ message: "Cliente não encontrado!" });
    }
});

// Inserir cliente
clientesRouter.post("/clientes", async (req, res) => {
    // console.log(req.body); // usamos apenas para fazer teste e debug. Body são os dados do corpo da requisição
    // res.send("Resposta");
    //Extraimos os dados do body que serão usados na inserção
    const { nome, email, telefone, endereco } = req.body;

    try {
        // Tentativa de inserir o cliente
        await Cliente.create( // adicionar o async antes do req
            {nome, email, telefone, endereco},
            {include: [Endereco]}, // indicamos que o endereco será salvo e associado ao cliente
        );
        res.json({ message: "Cliente criado com sucesso. "});
    } catch(err) {
        // 500 -> Internal Error
        res.status(500).json({ message: "Um erro ocorreu ao inserir cliente."});
    }
});

// Atualizar cliente
clientesRouter.put("/clientes/:id", async (req, res) => {
    // console.log(req.params); // teste para ver quem quer atualizar
    // console.log(req.body); // teste para ver o que quer atualizar
    // res.send("Update"); // teste para imprimir "Update"

    const idCliente = req.params.id;
    const { nome, email, telefone, endereco } = req.body // desestruturação dos dados

    try {
        const cliente = await Cliente.findOne({ where: {id: idCliente }});
    
    if(cliente) {
        await Endereco.update(endereco, {where: {clienteId: idCliente}}); // clienteId é a foreign key
        // Como é um relacionamento 1:1 ele vai atualizar a linha do endereço quando o id do cliente for igual ao id do cliente sendo atualizado
        await cliente.update({nome, email, telefone});
        res.json({ message: "Cliente atualizado." });
    } else {
        res.status(404).json({ message: "O cliente não foi encontrado." });
    }
    } catch (err) {
        res.status(500).json({message: "Ocorreu um erro ao atualizar o cliente."});
    }
});

// Deletar um cliente
clientesRouter.delete("/clientes/:id", async (req, res) => {
    const idCliente = req.params.id;

    try{
        const cliente = await Cliente.findOne({where: {id: idCliente}}); // movemos para dentro do try para se acontecer erro, tratá-lo também
        if(cliente) {
            await cliente.destroy();
            res.json({ message: "Cliente removido com sucesso." });
        } else {
            res.status(404).json({ message: "Cliente não encontrado." });
        }
    }catch(err) {
        res.status(500).json({ message: "um erro ocorreu ao excluir cliente"});
    }
});