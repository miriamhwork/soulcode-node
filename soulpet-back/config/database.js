import { config } from "dotenv"; // config é o nome da biblioteca, tem que usar esse nome mesmo
config(); // Carrega as variáveis (senha, nome do banco) do .env para a nossa aplicação, não precisa fazer o import/export, porque não é um arquivo .js, ele é .env, já busca direto

import { Sequelize } from "sequelize"; // Para criar a conexão com o banco

// Objeto usado na conexão com o banco de dados
// Um objeto é uma coleção de propriedades, e uma propriedade é uma associação entre um nome (ou chave) e um valor. Podemos jogar esse objeto para dentro de uma função como parâmetro
export const connection = new Sequelize( // objeto connection carrega todas as informações do DB
    // Dentro dos () o que é necessário para se conectar com o banco, como se fosse aquela linha da senha do Workbench;
    process.env.DB_NAME, // acessa o valor da variável DB_NAME lá no arquivo .env
    process.env.DB_USER, // acessa o valor do usuário
    process.env.DB_PASSWORD, // acessa o valor da senha
    { // tem que dizer onde é o endereço e o dialeto
        host: process.env.DB_HOST, // vai ser localhost, porque está na nossa máquina, se fosse um projeto real estaria na nuvem
        dialect: "mysql" // qual o dialeto, qual o tipo de banco, não só o MySQL (aperte o ctrl+espaço para ver mais opções de outros tipos de banco de dados)
    }
); 

// testar a conexão para ver se está tudo funcionando, se a senha está correta...
export async function authenticate(connection) { // conexão com o banco é assíncrona
    // Tentar a conexão com o banco mysql
    try { // Estrutura try-catch
        await connection.authenticate(); 
        console.log("Conexão foi feita com sucesso!");
    }catch(err){ // Se der erro, iremos saber o que é. O err são os dados do erro
        console.log("Um erro aconteceu!", err);
    }
}