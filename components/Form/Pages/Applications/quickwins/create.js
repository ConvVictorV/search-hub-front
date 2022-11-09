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
    Divider,
    Schema
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"

const { StringType, NumberType } = Schema.Types;


// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
    dskeyword: StringType().isRequired('O campo não pode estar vazio.'),
    dsvolume: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1,"Digite um valor válido."),
    dsurl: StringType().isURL('Digite uma url válida'),
    dsposition: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1,"Digite um valor válido.").max(150,"Digite um valor até 150."),
    dsdensity: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1,"Digite um valor válido."),
    dsyear: NumberType('Digite um número válido.').min(2017,"Digite um valor acima de 2017."),
});

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const formRef = React.useRef();
    const [customer, setCustomer] = useState('');
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const [rowData, setRowData] = useState([]);
    const [formError, setFormError] = useState({});
    const [formValue, setFormValue] = useState({
        dskeyword,
        dsvolume,
        dsurl,
        dsposition,
        dsdensity,
        dsyear,
    });
    const [dskeyword, setDskeyword] = useState('');
    const [dsurl, setDsurl] = useState('');
    const [dsvolume, setDsvolume] = useState('');
    const [dsposition, setDsposition] = useState('');
    const [dstype, setDstype] = useState('');
    const [dscontent, setDscontent] = useState('');
    const [dsobjective, setDsobjective] = useState('');
    const [dsstatus, setDsstatus] = useState('Planejamento de Termo');
    const [dsdensity, setDsdensity] = useState('');
    const [dsmonth, setDsmonth] = useState('')
    const [dsyear, setDsyear] = useState(2022)

    function clearInputs() {
        [...document.querySelectorAll('.rs-stack:nth-child(3) span.rs-picker-toggle-clean.rs-btn-close, .rs-btn-toolbar span.rs-picker-toggle-clean.rs-btn-close')].map(clean=>clean.click())
        setDskeyword('');
        setDsurl('');
        setDsvolume('');
        setDsposition('');
        setDstype('');
        setDscontent('');
        setDsobjective('');
        setDsdensity('');
        setRefresh(refresh + 1)
            
 
        
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

    return (
        <Form 
        fluid 
        layout="inline" 
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
                <Form.Group>
                    <Form.ControlLabel style={{
                        lineHeight: "40px"
                    }}>Cliente</Form.ControlLabel>
                    <Select
                        fetch={"/api/get/select/customersId"}
                        placeholder={"Selecione o cliente"}
                        onSelect={setCustomer}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Group>
                
                <Form.Group>
                    <Form.ControlLabel style={{
                        lineHeight: "40px"
                    }}>Mês de referência</Form.ControlLabel>
                    <Select
                        fetch={"/api/get/quickWinDate"}
                        placeholder={"Selecione o mês de referência"}
                        onSelect={setDsmonth}
                        style={{
                            width: "100%",
                        }}
                    />
                </Form.Group>
                
                <Form.Group controlId="dsyear" ref={forwardRef}
                    style={{
                        display: 'flex',
                        flexDirection: 'column'
                    }}>
                    <Form.ControlLabel style={{
                        lineHeight: "40px"
                    }}>Ano de Referência</Form.ControlLabel>
                    <Form.Control name="dsyear" placeholder="" onChange={setDsyear} value={dsyear} style={{
                        width: 100
                    }} />
                </Form.Group>
                {/* <Form.Control name="name" placeholder="Escopo" disabled /> */}
            </Stack>
            
            <Form.ControlLabel style={{
                        lineHeight: "40px"
                    }}>Resumo do planejamento</Form.ControlLabel>
            <Overview
                removeItem={(tableid) => {
                    const data = tableData
                    const removeIndex = []
                    data.forEach((item, index) => {
                        if (item.tableid == tableid) {
                            removeIndex.push(index)
                        }
                    })
                    removeIndex.map(i => data.splice(i, 1))
                    setTableData(data)
                    setRefresh(refresh + 1)
                }}
                tableData={tableData}
                setRowData={setRowData}
            // setDrawerOpenEdit={}
            />
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
                        <Form.ControlLabel>Description otimizada</Form.ControlLabel>
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
                        placeholder={"Tipo de otimização"}
                        onSelect={setDstype}
                        style={{
                            width: "94%",
                            margin: "24px 0px"
                        }}
                    />

                    <Select
                        fetch={"/api/get/quickwinsTypeContent"}
                        placeholder={"Tipo de conteúdo"}
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
                            width:200
                        }}
                    />
            <Stack
                direction="row"
                justifyContent="end"
                alignItems="initial"
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
                                }else{
                                    return false
                                }
                            }).filter(row=>row !== false)

                            if (erroredFields?.length) {
                                toast.push(<Message showIcon type={"error"}>
                                    {requiredMessages[erroredFields[0]]}
                                </Message>, { placement: "bottomCenter" });

                                return
                            }
                            if (!formRef.current.check()) {
                                return;
                            }



                            let data = tableData
                            data.push({
                                tableid: Math.floor(Math.random() * 9999999999),
                                dskeyword,
                                dsurl,
                                dsstatus,
                                dsvolume: parseFloat(dsvolume.replace(',', '.')),
                                dsposition: parseInt(dsposition),
                                dsdensity: parseFloat(dsdensity.replace(',', '.')),
                                dstype,
                                dscontent,
                                idcustomer: customer,
                                dsobjective,
                                dsmonth,
                                dsyear
                            })
                            setTableData(data)
                            clearInputs()
                            setFormValue({
                                dskeyword,
                                dsvolume,
                                dsurl,
                                dsposition,
                                dsdensity,
                                dsyear,
                            })
                            setRefresh(refresh + 1)
                        }}
                        style={{
                            backgroundColor: "var(--color-conversion-1)",
                            color: "var(--color-darkness-background)",
                        }}>Adicionar QuickWin</Button>
                </ButtonToolbar>
            </Stack>

            <hr />
            <ButtonToolbar style={{
                float: "right"
            }}>

                <Button
                    disabled
                    style={{
                        backgroundColor: "var(--color-conversion-11)",
                        color: "var(--color-darkness-background)",
                    }}>Exportar para planilha</Button>
                <Button 
                    disabled={tableData?.length == 0}
                    style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}
                    onClick={() => {
                        axios.post('/api/post/quickwins', tableData).then((e) => {
                            sucessHandle();
                            closeModal(true);
                        })
                            .catch((e) => {
                                typeof e.response.data != "object"
                                    ? errorHandle(e.response.data)
                                    : errorHandle(e.response.data?.message);
                            });
                    }}
                >Salvar planejamento</Button>

            </ButtonToolbar>
        </Form>
    );
}

export default FormComponent;
