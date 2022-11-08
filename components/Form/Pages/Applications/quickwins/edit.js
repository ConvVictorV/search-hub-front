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
    ButtonGroup,
    Divider
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"

// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, closeModal, rowData, footer, sendText, ...rest }) {


    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();

    const [dskeyword, setDskeyword] = useState(rowData.dskeyword);
    const [dsurl, setDsurl] = useState(rowData.dsurl);
    const [dsvolume, setDsvolume] = useState(rowData.dsvolume);
    const [dsposition, setDsposition] = useState(rowData.dsposition);
    const [dstype, setDstype] = useState(rowData.dstype);
    const [dscontent, setDscontent] = useState(rowData.dscontent);
    const [dsobjective, setDsobjective] = useState(rowData.dsobjective);
    const [dsstatus, setDsstatus] = useState(rowData.dsstatus);
    const [dsdensity, setDsdensity] = useState(rowData.dsdensity);
    const [dsmonth, setDsmonth] = useState(rowData.dsmonth)
    const [dsyear, setDsyear] = useState(rowData.dsyear)
    
    axios.get('/api/get/select/customersId').then(({ data }) => {
        data.filter((row, index) => {
            const idcustomer = row.value
            rowData.idcustomer == idcustomer && setCustomer(data[index].label)
        })
    })


    function clearInputs() {
        setDskeyword('');
        setDsurl('');
        setDsvolume('');
        setDsposition('');
        setDstype('');
        setDscontent('');
        setDsobjective('');
        setDsdensity('');
    }
    const [tableData, setTableData] = useState([]);

    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
    }, [tableData])

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Quickwin editado!
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

    return (
        <Form fluid layout="inline">
            <Stack
                direction="row"
                alignItems="flex-start"
                justifyContent="space-between"
            >

                <Stack direction="column" alignItems="flex-start">
                    <p style={{
                        fontSize: 14,
                    }}>Cliente: <b>{customer}</b></p>
                    <p style={{
                        fontSize: 14,
                    }}>Mês de referência: <b>{dsmonth}</b> de <b>{dsyear}</b></p>
                </Stack>
                {/* <Form.Control name="name" placeholder="Escopo" disabled /> */}
            </Stack>
            <Stack
                direction="row"
                alignItems="flex-start"
                spacing={'30px'}
                justifyContent={'center'}
            >
                <Stack
                    direction="column"
                    spacing="10px"
                    alignItems="flex-end"
                >
                    <Form.Group controlId="dsterm">
                        <Form.ControlLabel>Termo Principal</Form.ControlLabel>
                        <Form.Control name="dsterm" onChange={setDskeyword} value={dskeyword} />
                    </Form.Group>
                    <Form.Group controlId="dsname">
                        <Form.ControlLabel>Volume de busca</Form.ControlLabel>
                        <Form.Control name="dsname" onChange={setDsvolume} value={dsvolume} />
                    </Form.Group>
                    <Form.Group controlId="dsposition">
                        <Form.ControlLabel>Posição inicial</Form.ControlLabel>
                        <Form.Control name="dsposition" onChange={setDsposition} value={dsposition} />
                    </Form.Group>
                    <Form.Group controlId="dsdensity">
                        <Form.ControlLabel>Densidade de palavras</Form.ControlLabel>
                        <Form.Control name="dsdensity" onChange={setDsdensity} value={dsdensity} />
                    </Form.Group>

                </Stack>

                <Stack
                    direction="column"
                    spacing="10px"
                    style={{
                        height: "100%"
                    }}
                    alignItems={"initial"}
                >
                    <Form.Group controlId="dsurl">
                        <Form.ControlLabel>Url da página</Form.ControlLabel>
                        <Form.Control name="dsurl" onChange={setDsurl} value={dsurl} />
                    </Form.Group>
                    <Form.Group style={{
                        width: "90%"
                    }}>
                    <Form.ControlLabel>Tipo de otimização:</Form.ControlLabel>
                    <Select
                        fetch={"/api/get/quickwinsType"}
                        placeholder={dstype}
                        onSelect={setDstype}
                        style={{
                            width: "100%",
                        }}
                    />
                    </Form.Group>
                    <Form.Group style={{
                        width: "90%"
                    }}>
                    <Form.ControlLabel>Tipo de conteúdo</Form.ControlLabel>
                    <Select
                        fetch={"/api/get/quickwinsTypeContent"}
                        placeholder={dscontent}
                        onSelect={setDscontent}
                        style={{
                            width: "100%",
                        }}
                    />
                    </Form.Group>
                    
                </Stack>
            </Stack>
            <Form.Group controlId="dsobjective" style={{
                width: '96%'
            }}>
                <Form.ControlLabel>Objetivo da otimização</Form.ControlLabel>
                <Textarea name="dsobjective" onChange={setDsobjective} value={dsobjective}></Textarea>
            </Form.Group>

            <Form.Group controlId="dsobjective" style={{
                width: '96%'
            }}>
                <Form.ControlLabel>Status:</Form.ControlLabel>
                <Select
                    fetch={"/api/get/quickWinStatus"}
                    placeholder={dsstatus}
                    onSelect={setDsstatus}
                    style={{
                        width: 250
                    }}
                />
            </Form.Group>
            <Stack
                direction="row"
                justifyContent="end"
                alignItems="flex-end"
                style={{
                    width: "100%",
                    paddingRight: "24px"
                }}
            >

                <ButtonToolbar style={{
                    display: "flex",
                    width: "100%"
                }}>

                    <Button
                        onClick={() => {
                            axios.post('/api/put/quickwins',
                                {
                                    id: rowData.id,
                                    dskeyword,
                                    dsurl,
                                    dsstatus,
                                    dsvolume: parseFloat(dsvolume.toString().replace(',','.')),
                                    dsposition: parseInt(dsposition),
                                    dsdensity: parseFloat(dsdensity.toString().replace(',','.')),
                                    dstype,
                                    dscontent,
                                    idcustomer: rowData.idcustomer,
                                    dsobjective,
                                    dsmonth,
                                    dsyear
                                }).then((e) => {
                                    sucessHandle();
                                    closeModal(true);
                                })
                                .catch((e) => {
                                    typeof e.response.data != "object"
                                        ? errorHandle(e.response.data)
                                        : errorHandle(e.response.data?.message);
                                });
                        }}
                        style={{
                            backgroundColor: "var(--color-conversion-1)",
                            color: "var(--color-darkness-background)",
                        }}>Salvar</Button>
                </ButtonToolbar>
            </Stack>
        </Form>
    );
}

export default FormComponent;
