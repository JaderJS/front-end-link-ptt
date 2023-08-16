import api from "../../services/axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Row, Col } from "reactstrap";
import Select from 'react-select';

const defaultTags = ["antena", "radio", "talkabout", "motorola", "hytera"]

const RegisterSellEquipament = ({ submit, setSubmit }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm({
        defaultValues: {
            thumUrl: "http://",
            name: "PD406",
            description: "Lorem Ipsum",
            value: 123.134,
            tag: ['Antena']
        },
    });

    const onSubmit = async (data) => {
        console.log(data);
        await api.post('/api/equipament', data)

    };

    const hanldeUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("file", e.target.files[0]);
        try {
            await api.post("/upload", formData);
        } catch (error) {
            console.error(error);
        }
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
                <div className="input-group mb-3">
                    <input type='file' className="form-control" {...register("thumbUrl", { required: false })} placeholder="Serial" />
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" {...register("name", { required: true })} placeholder="Modelo" />
                    <label htmlFor="floatingInput">Nome</label>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" {...register("description", { required: true })} placeholder="Fabricante" />
                    <label htmlFor="floatingInput">Descrição</label>
                </div>

                <div className="form-floating mb-3">
                    <input className="form-control" {...register("value", { required: true })} placeholder="Fabricante" />
                    <label htmlFor="floatingInput">Valor R$</label>
                </div>

                <div className="form-floating mb-3">
                    <MultiSelect defaultTags={defaultTags} setValue={setValue} register={'tag'} />
                </div>

                {errors && <ErrorMessage errors={errors} name="serial" render={({ message }) => <p>{message}</p>} />}
            </form>
        </>
    );
};



const MultiSelect = ({ defaultTags, setValue, register }) => {

    const defaultTagOptions = defaultTags?.map(tag => ({ value: tag, label: tag })) || [];

    const [selectedOptions, setSelectedOptions] = useState([]);

    const handleMultiSelectChange = (selectedOptions) => {
        console.log(selectedOptions);
        setValue(register, selectedOptions.map((select) => select.value));
        setSelectedOptions(selectedOptions);
    };

    return (
        <>
            <Select
                isMulti
                options={defaultTagOptions}
                value={selectedOptions}
                onChange={handleMultiSelectChange}
            />
        </>
    );
};

export default RegisterSellEquipament;
