import { connection } from "../config/database.js";
import { DataTypes } from "sequelize";

// Colunas: nome (string), tipo (string), porte (string), dataNasc (dateonly) 
export const Pet = connection.define("pet", {
    nome: { 
        type: DataTypes.STRING(90), 
        allowNull: false, 
    },
    tipo: {
        type: DataTypes.STRING(100), 
        allowNull: false,
    },
    porte: { 
        type: DataTypes.STRING(30), 
        allowNull: false,
    },
    dataNasc: { 
        type: DataTypes.DATEONLY, // formato YYYY/MM/DD
    },
}); 
