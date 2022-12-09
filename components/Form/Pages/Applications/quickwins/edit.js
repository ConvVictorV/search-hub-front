import axios from "axios";
import { useSession } from "next-auth/react";
import React, { forwardRef, useEffect, useState, useRef } from "react";
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
    Divider,
    Schema
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"
const { StringType, NumberType } = Schema.Types;
// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, closeModal, rowData, footer, sendText, ...rest }) {


    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();

    const [dsresponsible, setDsresponsible] = useState(rowData.dsresponsible || '')
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
    
    const model = Schema.Model({
        dskeyword: StringType().isRequired('O campo não pode estar vazio.'),
        dsvolume: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido."),
        dsurl: StringType().isURL('Digite uma url válida'),
        dsposition: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido.").max(150, "Digite um valor até 150."),
        dsdensity: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido."),
        dsyear: NumberType('Digite um número válido.').min(2017, "Digite um valor acima de 2017."),
        dsresponsible: StringType().isRequired('O campo não pode estar vazio.'),
    });
    const [formError, setFormError] = useState({});
    const formRef = useRef();
    const [formValue, setFormValue] = useState({
        dskeyword,
        dsvolume,
        dsurl,
        dsposition,
        dsdensity,
        dsyear,
        dsresponsible
    });

    axios.get('/api/get/select/customersId').then(({ data }) => {
        data.filter((row, index) => {
            const idcustomer = row.value
            rowData.idcustomer == idcustomer && setCustomer(data[index].label)
        })
    })


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
        <Form fluid layout="inline" 
        ref={formRef}
        onChange={setFormValue}
        formValue={formValue}
        onCheck={setFormError}
        model={model}>
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
                    alignItems={"initial"}
                >
                    <Form.Group controlId="dsterm">
                        <Form.ControlLabel>Analista Responsável</Form.ControlLabel>
                        <Form.Control name="dsterm" onChange={setDsresponsible} value={dsresponsible} />
                    </Form.Group>
                    <Form.Group controlId="dskeyword" ref={forwardRef}>
                        <Form.ControlLabel>Termo Principal</Form.ControlLabel>
                        <Form.Control name="dskeyword" onChange={setDskeyword} value={dskeyword} />
                    </Form.Group>
                    <Form.Group controlId="dsvolume" ref={forwardRef}>
                        <Form.ControlLabel>Volume de busca</Form.ControlLabel>
                        <Form.Control name="dsvolume" onChange={setDsvolume} value={dsvolume} />
                    </Form.Group>
                    <Form.Group controlId="dsposition" ref={forwardRef}>
                        <Form.ControlLabel>Posição inicial</Form.ControlLabel>
                        <Form.Control name="dsposition" onChange={setDsposition} value={dsposition} />
                    </Form.Group>
                    <Form.Group controlId="dsdensity" ref={forwardRef}>
                        <Form.ControlLabel>Densidade de palavras</Form.ControlLabel>
                        <Form.Control name="dsdensity" onChange={setDsdensity} value={dsdensity} />
                    </Form.Group>
                    <Form.Group controlId="dsobjective" ref={forwardRef} style={{
                        width: 356
                    }}>
                        <Form.ControlLabel>Objetivo da otimização</Form.ControlLabel>
                        <Textarea name="dsobjective" onChange={setDsobjective} value={dsobjective}></Textarea>
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
                    <Form.Group controlId="dsurl" ref={forwardRef}>
                        <Form.ControlLabel>Url da página</Form.ControlLabel>
                        <Form.Control name="dsurl" onChange={setDsurl} value={dsurl} />
                    </Form.Group>
                    <Select
                        fetch={"/api/get/quickwinsType"}
                        placeholder={dstype || "Tipo de otimização"}
                        onSelect={setDstype}
                        style={{
                            width: "94%",
                            margin: "24px 0px"
                        }}
                    />

                    <Select
                        fetch={"/api/get/quickwinsTypeContent"}
                        placeholder={dscontent || "Tipo de conteúdo"}
                        onSelect={setDscontent}
                        style={{
                            width: "94%",
                            margin: "10px 0px"

                        }}
                    />
                </Stack>
            </Stack>
            <Form.ControlLabel style={{
                lineHeight: "40px"
            }}>Status do QW</Form.ControlLabel>
            <Select
                fetch={"/api/get/quickWinStatus"}
                placeholder={dsstatus}
                onSelect={setDsstatus}
                style={{
                    width: 200
                }}
            />
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
                            setFormValue({
                                dskeyword,
                                dsvolume,
                                dsurl,
                                dsposition,
                                dsdensity,
                                dsyear,
                                dsresponsible
                            })
                            formRef.current.check()

                            const requiredFields = [
                                customer,
                                dstype,
                                dscontent,
                                dsstatus,
                                dsmonth,
                            ]

                            const requiredMessages = [
                                'Selecione um cliente',
                                'Selecione um tipo de otimização',
                                'Selecione um tipo de conteúdo',
                                'Selecione um status',
                                'Selecione um mês de referência'
                            ]

                            const erroredFields = requiredFields.map((field, index) => {
                                if (field == undefined || field?.length == 0) {
                                    return index
                                } else {
                                    return false
                                }
                            }).filter(row => row !== false)

                            if (erroredFields?.length) {
                                toast.push(<Message showIcon type={"error"}>
                                    {requiredMessages[erroredFields[0]]}
                                </Message>, { placement: "bottomCenter" });

                                return
                            }
                            if (!formRef.current.check()) {
                                return;
                            }
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
                                    dsresponsible,
                                    dsyear,
                                    
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
