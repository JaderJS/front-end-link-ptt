import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ErrorMessage } from "@hookform/error-message";
import { Row, Col } from "reactstrap";
import api from "../services/axios";

const TesteUseForm = ({ submit, setSubmit }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      property: "Santa Maria",
      gerency: "Leandro",
      estation: [
        {
          lat: -18.43,
          long: -55.4,
          freqRx: 155.55,
          freqTx: 155.55,
          type: "digital",
          config: { coclorCode: 0, slot: 1 },
        },
      ],
      description: "Algum conteudo ",
    },
  });

  const selectedType = watch("estation[0].type");
  const selectedSilent = watch("estation[0].config.silent");

  useEffect(() => {
    if (submit) {
      handleSubmit(onSubmit)();
      setSubmit((previus) => !previus);
    }
  }, [submit]);

  const onSubmit = async (data) => {
    await api.post("/station/properties", data).then((response) => {});
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="form-floating mb-3">
        <input className="form-control" {...register("property", { required: "Preencha o nome da propriedade" })} placeholder="Propriedade" />
        <label htmlFor="floatingInput">Propriedade</label>
      </div>
      <div className="form-floating mb-3">
        <input className="form-control" {...register("gerency")} placeholder="Gerente" />
        <label htmlFor="floatingInput">Gerente</label>
      </div>
      <Row>
        <Col>classfor
          <div className="form-floating mb-3">
            <input className="form-control" {...register("estation[0].lat", { valueAsNumber: true })} placeholder="Latitude" />
            <label htmlFor="floatingInput">Latitude</label>
          </div>
        </Col>
        <Col>
          <div className="form-floating mb-3">
            <input className="form-control" {...register("estation[0].long", { valueAsNumber: true })} placeholder="Longitude" />
            <label htmlFor="floatingInput">Longitude</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-floating mb-3">
            <input className="form-control" {...register("estation[0].freqRx", { valueAsNumber: true })} placeholder="Frequência RX" />
            <label htmlFor="floatingInput">Frequência RX</label>
          </div>
        </Col>
        <Col>
          <div className="form-floating mb-3">
            <input className="form-control" {...register("estation[0].freqTx", { valueAsNumber: true })} placeholder="Frequência TX" />
            <label htmlFor="floatingInput">Frequência TX</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div className="form-floating mb-3">
            <select className="form-control" {...register("estation[0].type")}>
              <option value="">Select...</option>
              <option value="digital">Digital</option>
              <option value="analog">Analógico</option>
            </select>
            <label htmlFor="floatingInput">Tecnologia</label>
          </div>
        </Col>
        {selectedType === "digital" && (
          <>
            <Col>
              <div className="form-floating mb-3">
                <select className="form-control" {...register("estation[0].config.colorCode", { valueAsNumber: true })}>
                  <option value="">Select...</option>
                  {Array.from({ length: 16 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Frequência TX</label>
              </div>
              <div className="form-floating mb-3">
                <select className="form-control" {...register("estation[0].config.slot", { valueAsNumber: true })}>
                  <option value="">Select...</option>
                  {[0, 1, 2].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Frequência TX</label>
              </div>
            </Col>
          </>
        )}
        {selectedType === "analog" && (
          <>
            <Col>
              <div className="form-floating mb-3">
                <select className="form-control" {...register("estation[0].config.silent")}>
                  <option value="">Select...</option>
                  {["CSQ", "TPL", "DPL"].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <label htmlFor="floatingInput">Silenciador</label>
              </div>
              {(selectedSilent === "TPL" || selectedSilent === "DPL") && (
                <>
                  <div className="form-floating mb-3">
                    <input className="form-control" {...register("estation[0].config.encoder", { valueAsNumber: true })} placeholder="Enconder" />
                    <label htmlFor="floatingInput">Encoder</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input className="form-control" {...register("estation[0].config.decoder", { valueAsNumber: true })} placeholder="Decoder" />
                    <label htmlFor="floatingInput">Decoder</label>
                  </div>
                </>
              )}
            </Col>
          </>
        )}
      </Row>
      <div className="form-floating mb-3">
        <input className="form-control" {...register("description")} type="area" placeholder="Descrição" />
        <label htmlFor="floatingInput">Descrição</label>
      </div>
      <ErrorMessage errors={errors} name="property" render={({ message }) => <p>{message}</p>} />
    </form>
  );
};

export default TesteUseForm;
