import axios from "axios";
import { useSession } from "next-auth/react";
import React, { forwardRef, useEffect, useState } from "react";
import {
    Button,
    ButtonToolbar,
    Form,
    Message,
    Uploader,
    useToaster,
    Stack,
    Input,
    ButtonGroup
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"

// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, closeModal, footer, sendText, ...rest }) {

    
    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const [rowData, setRowData] = useState([]);


    const [dstermo, setDstermo] = useState('');
    const [dsurl, setDsurl] = useState('');
    const [dsvolume, setDsvolume] = useState(0);
    const [dsposition, setDsposition] = useState(0);
    const [dstype, setDstype] = useState('');
    const [dscontent, setDscontent] = useState('');
    const [dsobjective, setDsobjective] = useState('');
    const [dsstatus, setDsstatus] = useState('');
    const [tableData, setTableData] = useState([]);

    
    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Quickwins criados!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );


    const clearToast = async () =>
        new Promise((res, rej) => {
            toast.clear();
            setTimeout(() => {
                res();
            }, 1000);
        });

    const sucessHandle = async () => {
        await clearToast().then(() => {
            toast.push(messageSucess, { placement: "topCenter" });
        });
    };

    const errorHandle = async (message) => {
        await clearToast().finally(() => {
            toast.push(
                <Message showIcon type={"error"} duration={5000}>
                    {message || "Ocorreu um erro!"}
                </Message>,
                { placement: "topCenter" }
            );
        });
    };

    useState(()=>{
        console.log("rodou")
    },tableData)
    return (
        <Form fluid layout="inline">
            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
            >
                <Select
                    fetch={"/api/get/select/customersId"}
                    placeholder={"Selecione o cliente"}
                    onSelect={setCustomer}
                    style={{
                        width: "100%",
                    }}
                />
                <Select
                    fetch={"/api/get/select/customersId"}
                    placeholder={"Selecione o mês de referência"}
                    onSelect={setCustomer}
                    style={{
                        width: "100%",
                    }}
                />
                <Form.Control name="name" placeholder="Escopo" />
            </Stack>
            <Overview
                tableData={tableData}
                setRowData={setRowData}
            // setDrawerOpenEdit={}
            />
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={'30px'}
            >
                <Stack
                    direction="column"
                    spacing="10px"
                    alignItems="flex-end"
                >
                    <Form.Group controlId="dsterm">
                        <Form.ControlLabel>Termo Principal</Form.ControlLabel>
                        <Form.Control name="dsterm" onChange={setDstermo} />
                    </Form.Group>
                    <Form.Group controlId="dsname">
                        <Form.ControlLabel>Volume de busca</Form.ControlLabel>
                        <Form.Control name="dsname" onChange={setDsurl} />
                    </Form.Group>
                    <Form.Group controlId="dsposition">
                        <Form.ControlLabel>Posição inicial</Form.ControlLabel>
                        <Form.Control name="dsposition" onChange={setDsvolume} />
                    </Form.Group>
                    <Form.Group controlId="dsdensity">
                        <Form.ControlLabel>Densidade de palavras</Form.ControlLabel>
                        <Form.Control name="dsdensity" onChange={setDsposition} />
                    </Form.Group>
                </Stack>
                <Stack
                    direction="column"
                    spacing="10px"
                    style={{
                        height: "100%"
                    }}
                    alignItems="flex-end"
                >
                    <Form.Group controlId="dsurl">
                        <Form.ControlLabel>Url da página</Form.ControlLabel>
                        <Form.Control name="dsurl" onChange={setDstype} />
                    </Form.Group>
                    <Form.Group controlId="dstype">
                        <Form.ControlLabel>Tipo de otimização</Form.ControlLabel>
                        <Form.Control name="dstype" onChange={setDscontent} />
                    </Form.Group>
                    <Form.Group controlId="dscontent">
                        <Form.ControlLabel>Tipo de conteúdo</Form.ControlLabel>
                        <Form.Control name="dscontent" onChange={setDsobjective} />
                    </Form.Group>
                </Stack>
            </Stack>
            <Form.ControlLabel>Objetivo da otimização</Form.ControlLabel>
            <Textarea name="dsobjective" onChange={setDsobjective}></Textarea>
            <Stack
                direction="row"
                justifyContent="space-between"
            >
                <Select
                    fetch={"/api/get/select/customersId"}
                    placeholder={"Status do QuickWin"}
                    onSelect={setDsstatus}
                    style={{
                        width: "100%",
                    }}
                />
                <ButtonToolbar >
                    <Button 
                    onClick={()=>{
                        let data = tableData
                        data.push({
                            dstermo,
                            dsurl,
                            dsvolume,
                            dsposition,
                            dstype,
                            dscontent,
                            dsobjective,
                            dsstatus,
                        })
                        setTableData(data)
                    }}
                    style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}>Salvar</Button>
                    <Button style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}>Cadastrar Pauta</Button>
                </ButtonToolbar>
            </Stack>

            <hr />
            <ButtonToolbar style={{
                float: "right"
            }}>
                <Button style={{
                    backgroundColor: "var(--color-conversion-1)",
                    color: "var(--color-darkness-background)",
                }}>Salvar planejamento</Button>
                <Button style={{
                    backgroundColor: "var(--color-conversion-1)",
                    color: "var(--color-darkness-background)",
                }}>Gerar planilha</Button>
            </ButtonToolbar>
        </Form>
    );
}

export default FormComponent;
