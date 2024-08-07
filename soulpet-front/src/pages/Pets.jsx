import { Button, Tab, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletePet, getPets } from "../api/pets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Pets() {
  const [ pets, setPets ] = useState(null); // começa nulo, porque não tem dados para mostrar o Loader por alguns segundos

  function carregarPets() {
    getPets().then((dados) => { // dados -> return da função getPets
      setPets(dados); // exibe os dados
    });
  };

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir o pet?");
    if(deletar){
      deletePet(id).then((resposta) => {
        toast.success(resposta.message);
        carregarPets();
      });
    }
  }

  useEffect(() => { // chama a função carregarPets de forma automática, para mostrar a listagem de Pets
    carregarPets(); // chama uma vez os dados da lista do back-end
  },[]); 

  return (
    <main className="mt-4 container">
      <h1>Pets</h1>
      <Button as={Link} to="/pets/novo">
        Adicionar Pet
      </Button>
      <hr />
      {pets ? (
        <Table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Porte</th>
              <th>Data de Nascimento</th>
              <th>Donos</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pets.map((pet) => {
              return(
                <tr key={pet.id}>
                  <td>{pet.nome}</td>
                  <td>{pet.tipo}</td>
                  <td>{pet.porte}</td>
                  <td>{pet.dataNasc ? new Date(pet.dataNasc+"T00:00:00").toLocaleDateString() : "-"}</td>
                  <td>{pet.cliente.nome}</td>
                  {/* Aqui adicionamos um ternário para quando o campo tiver nulo, não colocar uma data qualquer e apresentar como "-" */}
                  {/* "T00:00:00" adicionamos isso porque ele subtraia as horas e acabava apresentando o dia anterior ao que selecionávamos, colocamos assim para zerar o fuso horário */}
                  <td>
                    <Button variant="danger" size="sm" className="me-2"
                      onClick={() => deletarPet(pet.id)}>
                      Excluir
                    </Button>
                    <Button size="sm" as={Link} to={`/pets/editar/${pet.id}`}>Editar</Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      ) : (
        <Loader/>
      )}
    </main>
  );
}

export default Pets;
