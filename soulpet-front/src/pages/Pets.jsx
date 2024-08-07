import { Button, Tab, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deletePet, getPets } from "../api/pets";
import { useEffect, useState } from "react";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

function Pets() {
  const [ pets, setPets ] = useState(null);

  function carregarPets() {
    getPets().then((dados) => {
      setPets(dados);
    });
  };

  function deletarPet(id) {
    const deletar = confirm("Tem certeza que deseja excluir o pet?");
    if(deletar){
      deletePet(id).then((resposta) => {
        toast.success(resposta.message);
        carregarPets();
      })
    }
  }

  useEffect(() => {
    carregarPets();
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
              <th>Cliente</th>
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
                  <td>{new Date(pet.dataNasc).toLocaleDateString()}</td>
                  <td>{pet.clienteId}</td>
                  <td>
                    <Button variant="danger" size="sm" className="me-2"
                      onClick={() => deletarPet(pet.id)}>
                      Excluir
                    </Button>
                    <Button size="sm" className="me-2" 
                      as={Link} to={`/pets/editar/${pet.id}`}>
                      Editar
                    </Button>
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
