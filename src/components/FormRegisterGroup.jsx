import api from "../services/axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";

const FormRegisterGroup = ({ def, _id, submit, setSubmit }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: def?.id || 2000,
      title: def?.title || "LKR",
      name: def?.name || "LKR",
      sinalization: def?.sinalization || "group",
      signal: def?.signal || "Tom 0",
    },
  });

  useEffect(() => {
    reset({
      id: def?.id || 2000,
      title: def?.title || "LKR",
      name: def?.name || "LKR",
      sinalization: def?.sinalization || "group",
      signal: def?.signal || "Tom 0",
    });
    console.log(def)
  }, [def, reset]);

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
        <div className="form-floating mb-3">
          <input className="form-control" {...register("id", { valueAsNumber: true })} placeholder="id" />
          <label for="floatingInput">id</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" {...register("title", { required: "Preencha o titulo do grupo" })} placeholder="Titulo" />
          <label for="floatingInput">Titulo</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" {...register("name", { required: "Preencha o nome do grupo" })} placeholder="Nome" />
          <label for="floatingInput">Nome</label>
        </div>
        <div className="form-floating mb-3">
          <input
            className="form-control"
            {...register("sinalization", { required: "Preencha o tipo de sinalização group/individual/all" })}
            placeholder="Sinalização"
          />
          <label for="floatingInput">Sinalização</label>
        </div>
        <div className="form-floating mb-3">
          <input className="form-control" {...register("signal", { required: "Preencha o tipo de sinal" })} placeholder="Sinal" />
          <label for="floatingInput">Sinal</label>
        </div>
      </form>
      {errors && <ErrorMessage errors={errors} name="id" render={({ message }) => <p>{message}</p>} />}
    </>
  );
};

export default FormRegisterGroup;
