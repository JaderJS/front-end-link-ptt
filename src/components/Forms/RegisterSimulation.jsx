import api from "../../services/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";


const RegisterSimulation = ({ submit, setSubmit, values }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            name: "PD406",
            description: "Lorem Ipsum",
        },
    });

    const onSubmit = async (data) => {
        await api.post('/api/simulation', { name: data.name, description: data.description, content: values })
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
                    <input className="form-control" {...register("name", { required: true })} placeholder="Modelo" />
                    <label htmlFor="floatingInput">Nome</label>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" {...register("description", { required: true })} placeholder="Fabricante" />
                    <label htmlFor="floatingInput">Descrição</label>
                </div>

                {errors && <ErrorMessage errors={errors} name="serial" render={({ message }) => <p>{message}</p>} />}
            </form>
        </>
    );
};

export default RegisterSimulation



