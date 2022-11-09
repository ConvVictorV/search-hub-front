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
    Panel,
    Divider
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"

// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, rowData, closeModal, footer, sendText, ...rest }) {
    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();

    const [idquickwin, setIdquickwin] = useState(rowData.id)
    const [idtexttopic, setIdTextTopic] = useState(rowData.textTopic?.idtexttopic || 0)
    const [dstitle, setDstitle] = useState(rowData.textTopic?.dstitle || '')
    const [dsdescription, setDsdescription] = useState(rowData.textTopic?.dsdescription || '')
    const [dsh1, setDsh1] = useState(rowData.textTopic?.dsh1 || '')
    const [dstextlink, setDstextlink] = useState(rowData.textTopic?.dstextlink || '')
    const [dstextstructure, setDstextstructure] = useState(rowData.textTopic?.dstextstructure || '')
    const [dssecundarykeywords, setDsecundarykeywords] = useState(rowData.textTopic?.dssecundarykeywords || '')
    const [dspeopleask, setDspeopleask] = useState(rowData.textTopic?.dspeopleask || '')
    const [dspagestructure, setDspagestructure] = useState(rowData.textTopic?.dspagestructure || '')
    const [dsrecommendations, setDsrecommendations] = useState(rowData.textTopic?.dsrecommendations || '')
    const [dscta, setDscta] = useState(rowData.textTopic?.dscta ||  '')
    const [dsfunnel, setDsfunnel] = useState(rowData.textTopic?.dsfunnel || '')

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
        axios.get('/api/get/select/customersId').then(({ data }) => {
            data.filter((row, index) => {
                const idcustomer = row.value
                rowData.idcustomer == idcustomer && setCustomer(data[index].label)
            })
        })
    }, [tableData])

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Pauta criada!
        </Message>
    );
    const messageUpdateSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Pauta editada!
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

    const createSuccessHandle = async () => {
        await clearToast().then(() => {
            toast.push(messageSucess, { placement: "topCenter" });
        });
    };
    const updateSuccessHandle = async () => {
        await clearToast().then(() => {
            toast.push(messageUpdateSucess, { placement: "topCenter" });
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
        <Form fluid>
            <Panel bordered shaded header={"Quickwin"} style={{
                width: "97%",
                background: "var(--rs-btn-subtle-hover-bg)"
            }}>
                <p>Cliente: {customer}</p>
                <p>Mês de referência: {rowData.dsmonth},{rowData.dsyear}</p>
                <p>Termo principal: {rowData.dskeyword}</p>
                <p>Url da página: {rowData.dsurl}</p>
                <p>Volume de busca: {rowData.dsvolume}</p>
                <p>Posição inicial: {rowData.dsposition}</p>
                <p>Tipo de otimização: {rowData.dstype}</p>
                <p>Tipo de conteúdo: {rowData.dscontent}</p>
                <p>Densidade de palavras: {rowData.dsdensity}</p>
                <p>Description otimizada: {rowData.dsobjective}</p>
            </Panel>

            <Panel bordered shaded header={"Snippet Otimizado"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dstitle">
                    <Form.ControlLabel>Title otimizado ( Recomendamos até 60 caracteres )</Form.ControlLabel>
                    <Form.Control name="dstitle" onChange={setDstitle} value={dstitle} />
                    <Form.ControlLabel>title com {dstitle.length > 60 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>{dstitle.length} caracteres</b> : <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>{dstitle.length} caracteres</b>}</Form.ControlLabel>
                </Form.Group>
                <Form.Group controlId="dsdescription">

                    <Form.ControlLabel>Description otimizada ( Recomendamos até 155 caracteres )</Form.ControlLabel>

                    <Textarea name="dsdescription" onChange={setDsdescription} value={dsdescription} style={{
                        width: "94%"
                    }}></Textarea>
                    <Form.ControlLabel>description com {dsdescription.length > 155 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>{dsdescription.length} caracteres</b> : <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>{dsdescription.length} caracteres</b>}</Form.ControlLabel>
                </Form.Group>
            </Panel>

            <Panel bordered shaded header={"Informações do texto"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dsh1">
                    <Form.ControlLabel>H1</Form.ControlLabel>
                    <Form.Control name="dsh1" onChange={setDsh1} value={dsh1} />
                </Form.Group>
                <Form.Group controlId="dstextlink">
                    <Form.ControlLabel>Link do Texto (Google Docs)</Form.ControlLabel>
                    <Form.Control name="dstextlink" onChange={setDstextlink} value={dstextlink} />
                </Form.Group>
            </Panel>

            <Panel bordered shaded header={"Qual é a estrutura de heading tags esperada para esse conteúdo?"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Recomendamos que você crie o esboço do texto aqui</p>
                <Form.Group controlId="dstextstructure">

                    <Textarea name="dstextstructure" onChange={setDstextstructure} value={dstextstructure} style={{
                        width: "94%"
                    }} placeholder={"Estrutura do Conteúdo (H2, H3, H4)"}></Textarea>
                </Form.Group>
            </Panel>

            <Panel bordered shaded header={"Quais as palavras-chave secundárias sugeridas?"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Recomendamos que você crie o esboço do texto aqui</p>
                <Form.Group controlId="dssecundarykeywords">

                    <Textarea name="dssecundarykeywords" onChange={setDsecundarykeywords} value={dssecundarykeywords} style={{
                        width: "94%"
                    }} placeholder={"Palavras-chave secundárias"}></Textarea>
                </Form.Group>
            </Panel>


            <Panel bordered shaded header={"Quais perguntas o texto deve responder?"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Caso você não tenha uma sugestão de heading tags insira as principais dúvidas para ajudar o redator a entender as dúvidas da persona</p>
                <Form.Group controlId="dspeopleask">

                    <Textarea name="dspeopleask" onChange={setDspeopleask} value={dspeopleask} style={{
                        width: "94%"
                    }} placeholder={"As pessoas perguntam"}></Textarea>
                </Form.Group>
            </Panel>


            <Panel bordered shaded header={"Qual é o formato do conteúdo para essa página?"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <Select
                    fetch={"/api/get/textTopic/pageStructure"}
                    placeholder={dspagestructure || "Estrutura da página"}
                    onSelect={setDspagestructure}
                    style={{
                        width: "94%",
                    }}
                />
            </Panel>
            <Panel bordered shaded header={"Recomendações e referências para ajudar o redator"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dsrecommendations">

                    <Textarea name="dsrecommendations" onChange={setDsrecommendations} value={dsrecommendations} style={{
                        width: "94%"
                    }} placeholder={"Recomendações"}></Textarea>
                </Form.Group>
            </Panel>
            <Panel bordered shaded header={"Qual é o formato do conteúdo para essa página?"} style={{
                width: "97%",
                marginTop: "20px"
            }}>
                <Select
                    fetch={"/api/get/textTopic/cta"}
                    placeholder={dscta || "CTA"}
                    onSelect={setDscta}
                    style={{
                        width: "94%",
                        marginBottom: 20
                    }}
                />
                <Select
                    fetch={"/api/get/textTopic/funnel"}
                    placeholder={dsfunnel || "Etapa do Funil"}
                    onSelect={setDsfunnel}
                    style={{
                        width: "94%",
                    }}
                />
            </Panel>

            <hr />
            <Panel>
                <ButtonToolbar style={{
                    float: "right"
                }}>


                    <Button style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}
                        onClick={() => {
                            idtexttopic == 0 ?
                            axios.post('/api/post/textTopic', {
                                idquickwin,
                                dstitle,
                                dsdescription,
                                dsh1,
                                dstextlink,
                                dstextstructure,
                                dssecundarykeywords,
                                dspeopleask,
                                dspagestructure,
                                dsrecommendations,
                                dscta,
                                dsfunnel
                            }).then((e) => {
                                createSuccessHandle();
                                closeModal(true);
                            })
                                .catch((e) => {
                                    typeof e.response.data != "object"
                                        ? errorHandle(e.response.data)
                                        : errorHandle(e.response.data?.message);
                                })
                            :
                            axios.patch('/api/put/textTopic', {
                                idtexttopic,
                                dstitle,
                                dsdescription,
                                dsh1,
                                dstextlink,
                                dstextstructure,
                                dssecundarykeywords,
                                dspeopleask,
                                dspagestructure,
                                dsrecommendations,
                                dscta,
                                dsfunnel
                            }).then((e) => {
                                updateSuccessHandle();
                                closeModal(true);
                            })
                                .catch((e) => {
                                    typeof e.response.data != "object"
                                        ? errorHandle(e.response.data)
                                        : errorHandle(e.response.data?.message);
                                })
                        }}
                    >Salvar e sair</Button>

                </ButtonToolbar>
                <ButtonToolbar style={{
                    float: "right",
                    marginRight: 10
                }}>


                    <Button style={{
                        backgroundColor: "var(--color-conversion-1)",
                        color: "var(--color-darkness-background)",
                    }}
                        onClick={() => {
                            idtexttopic == 0 ?
                            axios.post('/api/post/textTopic', {
                                idquickwin,
                                dstitle,
                                dsdescription,
                                dsh1,
                                dstextlink,
                                dstextstructure,
                                dssecundarykeywords,
                                dspeopleask,
                                dspagestructure,
                                dsrecommendations,
                                dscta,
                                dsfunnel
                            }).then((e) => {
                                createSuccessHandle();
                            })
                                .catch((e) => {
                                    typeof e.response.data != "object"
                                        ? errorHandle(e.response.data)
                                        : errorHandle(e.response.data?.message);
                                })
                            :
                            axios.patch('/api/put/textTopic', {
                                idtexttopic,
                                dstitle,
                                dsdescription,
                                dsh1,
                                dstextlink,
                                dstextstructure,
                                dssecundarykeywords,
                                dspeopleask,
                                dspagestructure,
                                dsrecommendations,
                                dscta,
                                dsfunnel
                            }).then((e) => {
                                updateSuccessHandle();
                            })
                                .catch((e) => {
                                    typeof e.response.data != "object"
                                        ? errorHandle(e.response.data)
                                        : errorHandle(e.response.data?.message);
                                })
                        }}
                    >Salvar Pauta</Button>

                </ButtonToolbar>
            </Panel>
        </Form>
    );
}

export default FormComponent;
