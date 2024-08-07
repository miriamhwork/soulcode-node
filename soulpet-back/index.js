import { connection, authenticate } from "./config/database.js";
import express from "express";
import { clientesRouter } from "./routes/clientes.js";
import { petsRouter } from "./routes/pets.js";
import cors from "cors";

authenticate(connection).then(() => {
    // vai rodar o connection do database.js
    // Após conectar no banco de dados, ele irá sincronizar os models no banco, ou seja, irá gerar as tabelas caso necessário
    // force: true -> irá dropar tudo e criar do zero novamente, recomendado apenas durante o desenvolvimento
    connection.sync({});
});

// Definir a aplicação backend em Express. Recursos pré-configurados
const app = express();

// Garantir que todas as requisições que têm body sejam lidas com JSON
app.use(express.json());

// Configuração do CORS / Em origin coloque a URL do front-end
app.use(cors({ origin: "http://localhost:5173" }));

// Definir os endpoints do backend
// Métodos: GET (leitura), POST (inserção), PUT (Alteração), DELETE (remoção)
app.use(clientesRouter);
app.use(petsRouter);

// Rodar a aplicação backend
app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/"); // vai executar uma vez, quando rodar e der certo
});