// Modelo para gerar a tabela de clientes no MySQL
// Mapeamento: cada propriedade que definimos vira uma coluna da tabela

import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";
import { Endereco } from "./endereco.js";
import { Pet } from "./pet.js";

// Cliente pode deixar a primeira letra maíuscula para diferencia da função, convenção do Professor
// "cliente" é o nome da tabela, não precisa ser o mesmo nome da const Cliente
// { } sintaxe de objeto, para as colunas, tipo, se é um campo obrigatório
// Obs: O Sequelize define implicitamente a chave primária
export const Cliente = connection.define("cliente", {
    // Configurando a coluna 'nome'
    nome: { // nome VARCHAR(130) NOT NULL
        type: DataTypes.STRING(130), // Define a coluna 'nome' como VARCHAR
        allowNull: false, // Torna a coluna NOT NULL, por padrão é true (opcional, não obrigatório)
    },
    email: {
        type: DataTypes.STRING, // Por padrão 255
        allowNull: false,
        unique: true // porque o email será único, não pode ter dois iguais
    },
    telefone: { // telefone VARCHAR(255) UNIQUE NOT NULL
        type: DataTypes.STRING, // não é number por conta dos (DDD) e o + do cód do país (ex: +55)
        allowNull: false,
        unique: true
    }
}); 

// Associação 1:1 (Cliente-Endereco)
// Cliente tem um Endereco
// Endereco ganha uma chave estrangeira

// CASCADE -> indica que se o cliente for deletado o endereço será deletado também.
Cliente.hasOne(Endereco, { onDelete: "CASCADE" });
Endereco.belongsTo(Cliente);
// Gerar uma chave estrangeira na tabelas enderecos

// Associação 1:N (Cliente-Pet)
Cliente.hasMany(Pet, { onDelete: "CASCADE" });
Pet.belongsTo(Cliente);
// Gera uma chave estrangeira para indicar o responsável
