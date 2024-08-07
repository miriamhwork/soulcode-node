// Este arquivo possui funções para realizar  as operações do CRUD de Pets
import axios from "axios";

export async function getPets() {
    const response = await axios.get("http://localhost:3000/pets");
    return response.data; // data -> Array de Pets
}

export async function getPet(id) {
    const response = await axios.get(`http://localhost:3000/pets/${id}`);
    return response.data; // data -> Objeto de Pet
}

export async function addPet(data) { // data -> recebe os dados do formulário
    const response = await axios.post("http://localhost:3000/pets", data); // data -> será enviado para o back-end
    return response.data; // data -> resposta do back-end, o objeto com message
}

export async function updatePet(id, data) {
    const response = await axios.put(`http://localhost:3000/pets/${id}`, data); // tem que enviar esse data que possui o body(corpo) da requisição
    return response.data; // data -> resposta do back-end, o objeto com message
}

export async function deletePet(id) {
    const response = await axios.delete(`http://localhost:3000/pets/${id}`);
    return response.data; // data -> resposta do back-end, o objeto com message
}
