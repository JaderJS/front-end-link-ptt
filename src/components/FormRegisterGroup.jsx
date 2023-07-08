import api from "../services/axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const FormRegisterGroup = ({ def, _id, submit, setSubmit, setResponse }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: 2000,
      title: "LKR",
      name: "LKR",
      sinalization: "group",
      signal: "Tom 0",
    },
  });

  const onSubmit = async (data) => {
    await api
      .put(`/station/properties/${_id}`, {
        group: data,
      })
      .then((response) => {
        console.log(response);
      });

    setSubmit(false);
  };

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
      setSubmit((previus) => !previus);
    }
  }, [submit]);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div class="form-floating mb-3">
          <input class="form-control" {...register("id", { valueAsNumber: true })} placeholder="id" />
          <label for="floatingInput">id</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" {...register("title", { required: "Preencha o titulo do grupo" })} placeholder="Titulo" />
          <label for="floatingInput">Titulo</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" {...register("name", { required: "Preencha o nome do grupo" })} placeholder="Nome" />
          <label for="floatingInput">Nome</label>
        </div>
        <div class="form-floating mb-3">
          <input
            class="form-control"
            {...register("sinalization", { required: "Preencha o tipo de sinalização group/individual/all" })}
            placeholder="Sinalização"
          />
          <label for="floatingInput">Sinalização</label>
        </div>
        <div class="form-floating mb-3">
          <input class="form-control" {...register("signal", { required: "Preencha o tipo de sinal" })} placeholder="Sinal" />
          <label for="floatingInput">Sinal</label>
        </div>
      </form>
      {errors && <ErrorMessage errors={errors} name="id" render={({ message }) => <p>{message}</p>} />}
    </>
  );
};

export default FormRegisterGroup;
