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
    Schema,
    Checkbox
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"

const { StringType, NumberType } = Schema.Types;


// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);

const model = Schema.Model({
    dskeyword: StringType().isRequired('O campo não pode estar vazio.'),
    dsvolume: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido."),
    dsurl: StringType()
        .addRule(value => {
            if (dstype == "Criação nova página") return true
            else if (value.indexOf('http') == -1) return false
        }, 'Digite uma url válida'),
    dsposition: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido.").max(150, "Digite um valor até 150."),
    dsdensity: NumberType('Digite um número válido.').isRequired('O campo não pode estar vazio.').min(1, "Digite um valor válido."),
    dsyear: NumberType('Digite um número válido.').min(2017, "Digite um valor acima de 2017."),
    dsresponsible: StringType().isRequired('O campo não pode estar vazio.'),
});
const openInNewTab = (url) => {
    if (typeof window !== "undefined") {
        window.open(url, '_blank', 'noreferrer');
    }
};
function FormComponent({ data, closeModal, footer, sendText, packagedata, ...rest }) {
    const formRef = React.useRef();
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
        dsresponsible
    });
    const [dskeyword, setDskeyword] = useState('');
    const [dsresponsible, setDsresponsible] = useState('')
    const [dsurl, setDsurl] = useState('');
    const [dsvolume, setDsvolume] = useState('');
    const [dsposition, setDsposition] = useState('');
    const [dstype, setDstype] = useState('');
    const [dscontent, setDscontent] = useState('');
    const [dsobjective, setDsobjective] = useState('');
    const [dsstatus, setDsstatus] = useState('Planejamento de termos');
    const [dsdensity, setDsdensity] = useState('');
    const [dsmonth, setDsmonth] = useState('')
    const [dsyear, setDsyear] = useState(2022)

    function clearInputs() {
        [...document.querySelectorAll('.rs-stack:not(:last-child):not(:first-child) span.rs-picker-toggle-clean.rs-btn-close, .rs-btn-toolbar span.rs-picker-toggle-clean.rs-btn-close')].map(clean => clean.click())
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



            <Form.ControlLabel style={{
                lineHeight: "40px"
            }}>Resumo dos QWs Adicionados</Form.ControlLabel>
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
                editItem={(tableid) => {
                    const data = tableData
                    const removeIndex = []
                    data.forEach((item, index) => {
                        if (item.tableid == tableid) {
                            removeIndex.push(index)
                            setDskeyword(item.dskeyword)
                            setDsresponsible(item.dsresponsible)
                            setDsurl(item.dsurl)
                            setDsvolume(item.dsvolume + "")
                            setDsposition(item.dsposition)
                            setDstype(item.dstype)
                            setDscontent(item.dscontent)
                            setDsobjective(item.dsobjective)
                            setDsstatus(item.dsstatus)
                            setDsdensity(item.dsdensity + "")
                            setDsmonth(item.dsmonth)
                            setDsyear(item.dsyear)
                            setFormValue({
                                dskeyword: item.dskeyword,
                                dsvolume: item.dsvolume + "",
                                dsurl: item.dsurl,
                                dsposition: item.dsposition,
                                dsdensity: item.dsdensity + "",
                                dsyear: item.dsyear,
                                dsresponsible: item.dsresponsible
                            })

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
                        <Form.Control name="dsvolume" onBlur={() => setDsvolume(dsvolume.replaceAll('.', ''))} onChange={setDsvolume} value={dsvolume} />
                    </Form.Group>
                    <Form.Group controlId="dsposition" ref={forwardRef}>
                        <Form.ControlLabel>Posição inicial</Form.ControlLabel>
                        <Form.Control name="dsposition" onBlur={() => setDsposition(dsposition.replaceAll('.', ''))} onChange={setDsposition} disabled={dsposition == 100} value={dsposition} />
                        <Checkbox style={{
                            marginLeft: '-10px',
                            fontStyle: 'italic'
                        }} value="" onChange={(value, checked) => checked ? setDsposition(100) : setDsposition('')}>Não posiciona</Checkbox>
                    </Form.Group>
                    <Form.Group controlId="dsdensity" ref={forwardRef}>
                        <Form.ControlLabel>Densidade de palavras</Form.ControlLabel>
                        <Form.Control name="dsdensity" onChange={setDsdensity} onBlur={() => setDsdensity(dsdensity.replaceAll('.', ''))} value={dsdensity} />
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
                    <Select
                        fetch={"/api/get/quickwinsType"}
                        placeholder={dstype || "Tipo de otimização"}
                        onSelect={setDstype}
                        style={{
                            width: "100%",
                            margin: "28px 0px 0px"
                        }}
                    />
                    <Form.Group controlId="dsurl" ref={forwardRef}>
                        <Form.ControlLabel>Url sugerida</Form.ControlLabel>
                        <Form.Control name="dsurl" onChange={setDsurl} value={dsurl} />
                    </Form.Group>
                    <Select
                        fetch={"/api/get/quickwinsTypeContent"}
                        placeholder={dscontent || "Tipo de conteúdo"}
                        onSelect={setDscontent}
                        style={{
                            width: "100%",
                            margin: "28px 0px"

                        }}
                    />
                </Stack>
            </Stack>
            <Form.ControlLabel style={{
                lineHeight: "40px"
            }}></Form.ControlLabel>

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
                                dsresponsible: packagedata.dsresponsible
                            })
                            setTimeout(() => {
                                formRef.current.check()
                                console.log(formError)

                                const requiredFields = [
                                    dstype,
                                    dscontent,
                                    dsstatus,
                                ]

                                const requiredMessages = [
                                    'Selecione um tipo de otimização',
                                    'Selecione um tipo de conteúdo',
                                    'Selecione um status',
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
                                let data = tableData
                                data.push({
                                    tableid: Math.floor(Math.random() * 9999999999),
                                    dskeyword,
                                    dsresponsible: packagedata.dsresponsible,
                                    dsurl,
                                    dsstatus,
                                    dsvolume: parseFloat(dsvolume.replace(',', '.')),
                                    dsposition: parseInt(dsposition),
                                    dsdensity: parseFloat(dsdensity.replace(',', '.')),
                                    dstype,
                                    dscontent,
                                    idcustomer: packagedata.idcustomer,
                                    dsobjective,
                                    dsmonth: packagedata.dsmounthyear.split('-')[0],
                                    dsyear: parseInt(packagedata.dsmounthyear.split('-')[1]),
                                    fkIdqwpackage: packagedata.dskey,
                                    idpackage: packagedata.idpackage,
                                    nbtotalqwold: packagedata.nbtotalqws,
                                    nbtotalkeywordsold: packagedata.nbtotalkeywords
                                })
                                setTableData(data)
                                clearInputs()
                                setFormValue({
                                    dskeyword,
                                    dsresponsible,
                                    dsvolume,
                                    dsurl,
                                    dsposition,
                                    dsdensity,
                                    dsyear,
                                })
                                setRefresh(refresh + 1)
                            })
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
                        axios.post('/api/post/qwpackagesUpdate', tableData)
                            .catch((e) => {
                                typeof e.response.data != "object"
                                    ? errorHandle(e.response.data)
                                    : errorHandle(e.response.data?.message);
                            });
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
