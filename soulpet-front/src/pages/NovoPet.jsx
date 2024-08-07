import { Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addPet } from "../api/pets";
import toast from "react-hot-toast";

function NovoPet() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function salvarPet(data) {
    addPet(data).then((resposta) => {
      toast.success(resposta.message);
      navigate("/pets");
    }).catch((err) => {
      toast.error(err.response.data.message);
    });
  }

  return (
    <main className="mt-4 container">
      <h1>Novo Pet</h1>
      <hr />
      <form onSubmit={handleSubmit(salvarPet)}>
        <div>
          <label htmlFor="nome">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-control"
            {...register("nome", { required: true, maxLength: 90 })}
          />
          {errors.nome && (
            <small className="text-danger">O nome é inválido!</small>
          )}
        </div>
        <div>
        <label htmlFor="nome">Tipo</label>
          <input
            type="text"
            id="tipo"
            className="form-control"
            {...register("tipo", { required: true, maxLength: 100 })}
          />
          {errors.tipo && (
            <small className="text-danger">O tipo é inválido!</small>
          )}
        </div>
        <div>
        <label htmlFor="porte">Porte</label>
          <input
            type="text"
            id="porte"
            className="form-control"
            {...register("porte", { required: true, maxLength: 30 })}
          />
          {errors.porte && (
            <small className="text-danger">O porte é inválido!</small>
          )}
        </div>
        <div>
        <label htmlFor="dataNasc">Data de Nascimento</label>
          <input
            type="date"
            id="dataNasc"
            className="form-control"
            {...register("dataNasc", { required: true, maxLength: 30 })}
          />
          {errors.dataNasc && (
            <small className="text-danger">A data é inválida!</small>
          )}
        </div>
        <div>
        <label htmlFor="clienteId">Cliente</label>
          <input
            type="text"
            id="clienteId"
            className="form-control"
            {...register("clienteId", { required: true, maxLength: 150 })}
          />
          {errors.cliente && (
            <small className="text-danger">O cliente é inválido!</small>
          )}
        </div>
        <Button className="mt-3" type="submit">
          Cadastrar
        </Button>
      </form>
    </main>
  );
}

export default NovoPet;