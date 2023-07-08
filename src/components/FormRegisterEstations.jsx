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
      <div class="form-floating mb-3">
        <input class="form-control" {...register("property", { required: "Preencha o nome da propriedade" })} placeholder="Propriedade" />
        <label for="floatingInput">Propriedade</label>
      </div>
      <div class="form-floating mb-3">
        <input class="form-control" {...register("gerency")} placeholder="Gerente" />
        <label for="floatingInput">Gerente</label>
      </div>
      <Row>
        <Col>
          <div class="form-floating mb-3">
            <input class="form-control" {...register("estation[0].lat", { valueAsNumber: true })} placeholder="Latitude" />
            <label for="floatingInput">Latitude</label>
          </div>
        </Col>
        <Col>
          <div class="form-floating mb-3">
            <input class="form-control" {...register("estation[0].long", { valueAsNumber: true })} placeholder="Longitude" />
            <label for="floatingInput">Longitude</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="form-floating mb-3">
            <input class="form-control" {...register("estation[0].freqRx", { valueAsNumber: true })} placeholder="Frequência RX" />
            <label for="floatingInput">Frequência RX</label>
          </div>
        </Col>
        <Col>
          <div class="form-floating mb-3">
            <input class="form-control" {...register("estation[0].freqTx", { valueAsNumber: true })} placeholder="Frequência TX" />
            <label for="floatingInput">Frequência TX</label>
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          <div class="form-floating mb-3">
            <select class="form-control" {...register("estation[0].type")}>
              <option value="">Select...</option>
              <option value="digital">Digital</option>
              <option value="analog">Analógico</option>
            </select>
            <label for="floatingInput">Tecnologia</label>
          </div>
        </Col>
        {selectedType === "digital" && (
          <>
            <Col>
              <div class="form-floating mb-3">
                <select class="form-control" {...register("estation[0].config.colorCode", { valueAsNumber: true })}>
                  <option value="">Select...</option>
                  {Array.from({ length: 16 }, (_, index) => (
                    <option key={index} value={index}>
                      {index}
                    </option>
                  ))}
                </select>
                <label for="floatingInput">Frequência TX</label>
              </div>
              <div class="form-floating mb-3">
                <select class="form-control" {...register("estation[0].config.slot", { valueAsNumber: true })}>
                  <option value="">Select...</option>
                  {[0, 1, 2].map((val) => (
                    <option key={val} value={val}>
                      {val}
                    </option>
                  ))}
                </select>
                <label for="floatingInput">Frequência TX</label>
              </div>
            </Col>
          </>
        )}
        {selectedType === "analog" && (
          <>
            <Col>
              <div class="form-floating mb-3">
                <select class="form-control" {...register("estation[0].config.silent")}>
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
                  <div class="form-floating mb-3">
                    <input class="form-control" {...register("estation[0].config.encoder", { valueAsNumber: true })} placeholder="Enconder" />
                    <label for="floatingInput">Encoder</label>
                  </div>
                  <div class="form-floating mb-3">
                    <input class="form-control" {...register("estation[0].config.decoder", { valueAsNumber: true })} placeholder="Decoder" />
                    <label for="floatingInput">Decoder</label>
                  </div>
                </>
              )}
            </Col>
          </>
        )}
      </Row>
      <div class="form-floating mb-3">
        <input class="form-control" {...register("description")} type="area" placeholder="Descrição" />
        <label for="floatingInput">Descrição</label>
      </div>
      <ErrorMessage errors={errors} name="property" render={({ message }) => <p>{message}</p>} />
    </form>
  );
};

export default TesteUseForm;
