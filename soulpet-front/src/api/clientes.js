// Este arquivo possui funções para realizar  as operações do CRUD de Clientes
import axios from "axios";

export async function getClientes() {
    const response = await axios.get("http://localhost:3000/clientes");
    // Vai fazer uma requisição get para esse endpoint e o back vai receber essa requisição
    return response.data;
    // Dentro de 'data' está o JSON de resposta do back-end
}

export async function addCliente(data) {
    const response = await axios.post("http://localhost:3000/clientes", data);
    // O 2º parâmetro do post é o corpo da requisição (data)
    return response.data;
}

export async function deleteCliente(id) {
    const response = await axios.delete(`http://localhost:3000/clientes/${id}`);
    return response.data;
}

export async function getCliente(id) { // para pegar o cliente específico para editar
    const response = await axios.get(`http://localhost:3000/clientes/${id}`);
    return response.data; // data -> objeto que o Insomnia está entregando
}

export async function updateCliente(id, data) {
    const response = await axios.put(`http://localhost:3000/clientes/${id}`, data);
    return response.data;
}
