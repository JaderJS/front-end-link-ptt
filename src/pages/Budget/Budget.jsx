import React, { useState } from 'react'
import Main from '../../components/Main'
import { Button, Row, Col, Table } from 'reactstrap'
import { ModalForm } from '../../components/ModalForm'
import RegisterSellEquipament from '../../components/Forms/RegisterSellEquipament'
import './styles.css'
import html2canvas from 'html2canvas';

import jsPDF from 'jspdf';

const Budget = () => {
    const [show, setShow] = useState()
    const [submit, setSubmit] = useState(false)
    const [data, setData] = useState()

    const [values, setValues] = useState([
        { mtr: 'qtd', und: 0, name: 'Lore ipsum', description: 'Lorem ipsum', val: 123 },
    ]);


    const generatePDF = async () => {
        const element = document.getElementById('pdf-content');

        const canvas = await html2canvas(element, { scale: 3 });
        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210;
        const pdf = new jsPDF('p', 'mm', 'a4');
        const ratio = canvas.width / canvas.height;
        const margin = 20;
        const adjustedImgHeight = (imgWidth - 2 * margin) / ratio;
        pdf.addImage(imgData, 'PNG', margin, margin, imgWidth - 2 * margin, adjustedImgHeight);
        pdf.save(`${data?.client || 'Orçamento'}.pdf`);

    };

    const handleData = (event) => {
        const { name, value } = event.target;
        setData((prev) => ({ ...prev, [name]: value }));
    }

    return (
        <Main>
            <Row>
                <Button onClick={generatePDF}>Gerar PDF</Button>
                <Button className='m-3' onClick={() => setShow(() => true)}>Cadastro novo equipamento</Button>
                <ModalForm title={"Cadastro equipamentos"} show={show} setShow={setShow} submit={submit} setSubmit={setSubmit}>
                    <RegisterSellEquipament submit={submit} setSubmit={setSubmit} />
                </ModalForm>
            </Row>
            <div id="pdf-content">
                <Row >
                    <h5 >Link Radio Comunicações</h5>
                    <p className='text-muted'>32.700.330/0001-86</p>
                </Row>
                <Row >
                    <div className="container-line">
                        <div className="line-2"></div>
                        <div>Dados do cliente</div>
                        <div className="line-2"></div>
                    </div>

                    <Col>
                        <div className="input-group m-1">
                            <span className="input-group-text">Cliente: </span>
                            <input name='client' type="text" className="form-control" onChange={(event) => handleData(event)} />
                        </div>
                        <div className="input-group m-1">
                            <span className="input-group-text">Email: </span>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="input-group m-1">
                            <span className="input-group-text" >Cidade: </span>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="input-group m-1">
                            <span className="input-group-text" >Endereço: </span>
                            <input type="text" className="form-control" />
                        </div>
                    </Col>
                    <Col>
                        <div className="input-group m-1">
                            <span className="input-group-text" >CPF/CNPJ: </span>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="input-group m-1">
                            <span className="input-group-text"  >Telefone: </span>
                            <input type="text" className="form-control" />
                            <span className="input-group-text"  >UF: </span>
                            <input type="text" className="form-control" />
                        </div>
                        <div className="input-group m-1">
                            <span className="input-group-text"  >CEP: </span>
                            <input type="text" className="form-control" />
                        </div>
                    </Col>
                </Row>
                <Row className='m-3'>
                    <BudgetTable values={values} setValues={setValues} />
                </Row>
                <Row >
                    <div className="container-line">
                        <p className="text">Valor Total</p>
                        <div className="line"></div>
                        <p className="text">R$</p>
                        <p className="text">{values.reduce((sum, val) => sum + (+val.und * +val.val), 0)}</p>
                    </div>
                </Row>
                <div className="footer fixed-bottom bg-light text-center py-2">
                    Este é o rodapé do seu orçamento.
                </div>
            </div>
        </Main>
    )
}

const BudgetTable = ({ values, setValues }) => {

    const handleInput = (event, index) => {
        const { name, value } = event.target;
        if (isNaN(+value)) {
            return
        }
        const updatedValues = values.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setValues(updatedValues);
    };
    const handleInputText = (event, index) => {
        const { name, value } = event.target;

        const updatedValues = values.map((item, i) =>
            i === index ? { ...item, [name]: value } : item
        );
        setValues(updatedValues);
    };

    const addValue = () => {
        setValues((prev) => ([...prev, { mtr: 'qtd', und: 0, name: 'Lore ipsum', description: 'Lorem ipsum', val: 123 }]))
    }

    return (
        <>
            <Table hover size='sm'>
                <thead className="fw-normal">
                    <tr>
                        <th>#</th>
                        <th>mtr</th>
                        <th>und</th>
                        <th>nome</th>
                        <th>descrição</th>
                        <th>Valor unitário</th>
                        <th>Valor total</th>
                    </tr>
                </thead>
                <tbody>
                    {values?.map((value, index) => (
                        <React.Fragment key={index}>

                            <tr>
                                <th scope='row'>{index}</th>
                                <th>{value.mtr}</th>
                                <th>
                                    <input
                                        name='und'
                                        type='text'
                                        style={{ all: 'unset', maxWidth: '4rem' }}
                                        onChange={(e) => handleInput(e, index)}
                                        inputMode="numeric"
                                        pattern="[0-9]+(\.[0-9]*)?"
                                        value={value.und} />
                                </th>
                                <th>
                                    <input
                                        name='name'
                                        type='text'
                                        style={{ all: 'unset' }}
                                        onChange={(e) => handleInputText(e, index)}
                                        value={value.name} />
                                </th>
                                <th>
                                    <input
                                        name='description'
                                        type='text'
                                        style={{ all: 'unset' }}
                                        onChange={(e) => handleInputText(e, index)}
                                        value={value.description} />
                                </th>
                                <th>
                                    <input
                                        name='val'
                                        type='text'
                                        style={{ all: 'unset', maxWidth: '4rem' }}
                                        onChange={(e) => handleInput(e, index)}
                                        inputMode="numeric"
                                        pattern="[0-9]+(\.[0-9]*)?"
                                        value={value.val} />
                                </th>
                                <th>{value.und * value.val}</th>
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </Table>
            <Button onClick={addValue}>+</Button>
        </>
    )
}


export default Budget