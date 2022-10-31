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


function FormComponent({ data, closeModal, footer, sendText, ...rest }) {


    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const [rowData, setRowData] = useState([]);


    const [dskeyword, setDskeyword] = useState('');
    const [dsurl, setDsurl] = useState('');
    const [dsvolume, setDsvolume] = useState(0);
    const [dsposition, setDsposition] = useState(0);
    const [dstype, setDstype] = useState('');
    const [dscontent, setDscontent] = useState('');
    const [dsobjective, setDsobjective] = useState('');
    const [dsstatus, setDsstatus] = useState('');
    const [dsdensity, setDsdensity] = useState(0);
    const [dsmonth, setDsmonth] = useState('')
    const [dsyear, setDsyear] = useState(2022)

    function clearInputs () {
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
                    fetch={"/api/get/quickWinDate"}
                    placeholder={"Selecione o mês de referência"}
                    onSelect={setDsmonth}
                    style={{
                        width: "100%",
                    }}
                />
                <span style={{
                    display:'flex'
                }}>
                <Form.ControlLabel>Ano de Referência</Form.ControlLabel>
                <Form.Control name="name" placeholder="" onChange={setDsyear} value={dsyear} style={{
                    width:100
                }}/>
                </span>
                {/* <Form.Control name="name" placeholder="Escopo" disabled /> */}
            </Stack>
            <Overview
                removeItem={(tableid)=>{
                    const data = tableData
                    const removeIndex = []
                    data.forEach((item,index)=>{
                        if(item.tableid == tableid){
                            removeIndex.push(index)
                        }
                    })
                    removeIndex.map(i=>data.splice(i,1))
                    setTableData(data)
                    setRefresh(refresh+1)
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
                    <Form.Group controlId="dsobjective" style={{
                        width:356
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
                    alignItems="flex-end"
                >
                    <Form.Group controlId="dsurl">
                        <Form.ControlLabel>Url da página</Form.ControlLabel>
                        <Form.Control name="dsurl" onChange={setDsurl} value={dsurl} />
                    </Form.Group>
                    <Form.Group controlId="dstype">
                        <Form.ControlLabel>Tipo de otimização</Form.ControlLabel>
                        <Form.Control name="dstype" onChange={setDstype} value={dstype} />
                    </Form.Group>
                    <Form.Group controlId="dscontent">
                        <Form.ControlLabel>Tipo de conteúdo</Form.ControlLabel>
                        <Form.Control name="dscontent" onChange={setDscontent} value={dscontent} />
                    </Form.Group>
                </Stack>
            </Stack>

            <Stack
                direction="row"
                justifyContent="end"
                alignItems="flex-end"
                style={{
                    width:"100%",
                    paddingRight: "24px"
                }}
            >

                <ButtonToolbar style={{
                    display:"flex",
                    width:"100%"
                }}>
                    <Select
                        fetch={"/api/get/quickWinStatus"}
                        placeholder={"Status do QuickWin"}
                        onSelect={setDsstatus}
                    />
                    <Button
                        onClick={() => {
                            let data = tableData
                            data.push({
                                tableid: Math.floor(Math.random() * 9999999999),
                                dskeyword,
                                dsurl,
                                dsstatus,
                                dsvolume: parseFloat(dsvolume.replace(',','.')),
                                dsposition: parseInt(dsposition),
                                dsdensity: parseFloat(dsdensity.replace(',','.')),
                                dstype,
                                dscontent,
                                idcustomer: customer,
                                dsobjective,
                                dsmonth,
                                dsyear
                            })
                            setTableData(data)
                            clearInputs()
                            setRefresh(refresh+1)
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
                <Button style={{
                    backgroundColor: "var(--color-conversion-1)",
                    color: "var(--color-darkness-background)",
                }}
                onClick={()=>{
                    axios.post('/api/post/quickwins',tableData).then((e) => {
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
