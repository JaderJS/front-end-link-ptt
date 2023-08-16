import api from "../services/axios";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Row, Col } from "reactstrap";

const FormRegisterEquipament = ({ _id, submit, setSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      serial: "20DF234",
      model: "PD406",
      fabricant: "Hytera",
      config: [
        {
          type: "digital",
          slot: 1,
          colorCode: 1,
          archives: [{ pathUrl: "http://", name: "geral" }],
        },
      ],
    },
  });

  const selectedType = watch("config.0.type");
  const selectedSilent = watch("config.0.silent");

  const onSubmit = async (data) => {
    await api
      .post(`/equipaments`, {
        equipament: data,
      })
      .then((response) => {
        console.log(response);
      });
    await api.put(`/station/properties/${_id}`, { equipament: data });
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
        <div className="form-floating mb-3">
          <input className="form-control" {...register("serial", { required: true })} placeholder="Serial" />
          <label for="floatingInput">Serial</label>
        </div>
        <Row>
          <Col>
            <div className="form-floating mb-3">
              <input className="form-control" {...register("model", { required: true })} placeholder="Modelo" />
              <label for="floatingInput">Modelo</label>
            </div>
          </Col>
          <Col>
            <div className="form-floating mb-3">
              <input className="form-control" {...register("fabricant", { required: true })} placeholder="Fabricante" />
              <label for="floatingInput">Fabricante</label>
            </div>
          </Col>
        </Row>
        <div className="form-floating mb-3">
          <select className="form-control" {...register("config.0.type")}>
            <option value="">Select...</option>
            <option value="digital">Digital</option>
            <option value="analog">Analógico</option>
          </select>
          <label for="floatingInput">Tecnologia</label>
        </div>
        {selectedType === "digital" && (
          <>
            <div className="form-floating mb-3">
              <select className="form-control" {...register("config.0.colorCode")}>
                <option value="">Select...</option>
                {Array.from({ length: 16 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
              <label for="floatingInput">Código de cor</label>
            </div>
            <div className="form-floating mb-3">
              <select className="form-control" {...register("config.0.slot")}>
                <option value="">Select...</option>
                {Array.from({ length: 3 }, (_, index) => (
                  <option key={index} value={index}>
                    {index}
                  </option>
                ))}
              </select>
              <label for="floatingInput">Slot</label>
            </div>
          </>
        )}
        {selectedType === "analog" && (
          <>
            <div className="form-floating mb-3">
              <select className="form-control" {...register("config.0.silent")}>
                <option value="">Select...</option>
                {["CSQ", "TPL", "DPL"].map((val) => (
                  <option key={val} value={val}>
                    {val}
                  </option>
                ))}
              </select>
              <label for="floatingInput">Silenciador</label>
            </div>
            {(selectedSilent === "TPL" || selectedSilent === "DPL") && (
              <>
                <div className="form-floating mb-3">
                  <input className="form-control" {...register("config.0.encoder", { valueAsNumber: true })} placeholder="Enconder" />
                  <label for="floatingInput">Encoder</label>
                </div>
                <div className="form-floating mb-3">
                  <input className="form-control" {...register("config.0.decoder", { valueAsNumber: true })} placeholder="Decoder" />
                  <label for="floatingInput">Decoder</label>
                </div>
              </>
            )}
          </>
        )}
        <div className="form-floating mb-3">
          <input className="form-control" {...register("config.0.archives.0.name", { valueAsNumber: false })} placeholder="Nome" />
          <label for="floatingInput">Nome</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="file"
            className="form-control"
            id="file"
            name="config.0.archives.0.pathUrl"
            // {...register("config.0.archives.0.pathUrl", { valueAsNumber: false })}
            onChange={hanldeUpload}
          />
        </div>
        {errors && <ErrorMessage errors={errors} name="serial" render={({ message }) => <p>{message}</p>} />}
      </form>
    </>
  );
};

export default FormRegisterEquipament;
