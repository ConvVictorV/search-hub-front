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
    Divider,
    Schema
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"
const { StringType, NumberType } = Schema.Types;
// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, rowData, closeModal, footer, sendText, ...rest }) {
    const [customer, setCustomer] = useState();
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const formRef = React.useRef();
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
    const [dscta, setDscta] = useState(rowData.textTopic?.dscta || '')
    const [dsfunnel, setDsfunnel] = useState(rowData.textTopic?.dsfunnel || '')
    const [formError, setFormError] = useState({});
    const model = Schema.Model({
        dstitle: StringType().isRequired('O campo não pode estar vazio.'),
        dsdescription: StringType().isRequired('O campo não pode estar vazio.'),
        dsh1: StringType().isRequired('O campo não pode estar vazio.'),
        dstextlink: StringType().isRequired('O campo não pode estar vazio.').isURL('Digite uma url válida').addRule((value, data) => {
            return value.indexOf('docs') > - 1
        }, "A url precisa ser um docs."),
        dstextstructure: StringType(),
        dssecundarykeywords: StringType(),
        dspeopleask: StringType().isRequired('O campo não pode estar vazio.'),
        dsrecommendations: StringType().isRequired('O campo não pode estar vazio.'),
    });
    const [formValue, setFormValue] = useState({
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
        dsfunnel,
    });

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

    function validate() {
        const requiredFields = [
            dspagestructure,
            dscta,
            dsfunnel,
        ]

        const requiredMessages = [
            'Selecione um tipo de estrutura para a página',
            'Selecione um tipo de cta',
            'Selecione uma etapa do funil',
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

            return false
        }
        else if (!formRef.current.check()) {
            return false
        } else {
            return true
        }
    }
    function getTextWidth(text, font) {
        // re-use canvas object for better performance
        const canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
        const context = canvas.getContext("2d");
        context.font = font;
        const metrics = context.measureText(text);
        return metrics.width;
    }

    function getCssStyle(element, prop) {
        return window.getComputedStyle(element, null).getPropertyValue(prop);
    }

    function getCanvasFont(el = document.body) {
        const fontWeight = getCssStyle(el, 'font-weight') || 'normal';
        const fontSize = getCssStyle(el, 'font-size') || '16px';
        const fontFamily = getCssStyle(el, 'font-family') || 'Times New Roman';

        return `${fontWeight} ${fontSize} ${fontFamily}`;
    }
    return (
        <Form
            fluid
            ref={formRef}
            onChange={setFormValue}
            formValue={formValue}
            onCheck={setFormError}
            model={model}>
            <Panel bordered shaded header={"Quickwin"} style={{
                width: "97%",
                padding: "20px 0px",
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
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dstitle">
                    <Form.ControlLabel>Title otimizado</Form.ControlLabel>
                    <Form.Control name="dstitle" onChange={setDstitle} value={dstitle} />
                    <Form.ControlLabel>title com {dstitle.length > 60 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>({dstitle.length}/60)</b>: <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>({dstitle.length}/60)</b>} caracteres e {Math.round(getTextWidth(dstitle, "20px arial")) > 580 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>({Math.round(getTextWidth(dstitle, "20px arial"))}/580)</b>: <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>({Math.round(getTextWidth(dstitle, "20px arial"))}/580)</b>} pixels</Form.ControlLabel>
                </Form.Group>
                <Form.Group controlId="dsdescription">

                    <Form.ControlLabel>Description otimizada</Form.ControlLabel>
                    <Form.Control rows={3} name="dsdescription" onChange={setDsdescription} value={dsdescription} accepter={Textarea} />
                    <Form.ControlLabel>description com {dsdescription.length > 155 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>({dsdescription.length}/155)</b> : <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>({dsdescription.length}/155)</b>} caracteres e {Math.round(getTextWidth(dsdescription, "20px arial")) > 990 ? <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-4)"
                    }}>({Math.round(getTextWidth(dsdescription, "20px arial"))}/990)</b>: <b style={{
                        lineHeight: "40px",
                        color: "var(--color-conversion-7)"
                    }}>({Math.round(getTextWidth(dsdescription, "20px arial"))}/990)</b>} pixels</Form.ControlLabel>
                </Form.Group>
            </Panel>

            <Panel bordered shaded header={"Informações do texto"} style={{
                width: "97%",
                padding: "20px 0px",
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
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Recomendamos que você crie o esboço do texto aqui</p>
                <Form.Group controlId="dstextstructure">
                    <Form.Control placeholder={"Estrutura do Conteúdo (H2, H3, H4)"} rows={3} name="dstextstructure" onChange={setDstextstructure} value={dstextstructure} accepter={Textarea} />
                </Form.Group>
            </Panel>

            <Panel bordered shaded header={"Quais as palavras-chave secundárias sugeridas?"} style={{
                width: "97%",
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Recomendamos que você crie o esboço do texto aqui</p>
                <Form.Group controlId="dssecundarykeywords">
                    <Form.Control rows={3} name="dssecundarykeywords" onChange={setDsecundarykeywords} value={dssecundarykeywords} accepter={Textarea} placeholder={"Palavras-chave secundárias"} />
                </Form.Group>
            </Panel>


            <Panel bordered shaded header={"Quais perguntas o texto deve responder?"} style={{
                width: "97%",
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <p style={{
                    paddingBottom: 20
                }}>Caso você não tenha uma sugestão de heading tags insira as principais dúvidas para ajudar o redator a entender as dúvidas da persona</p>
                <Form.Group controlId="dspeopleask">
                    <Form.Control rows={3} name="dspeopleask" onChange={setDspeopleask} value={dspeopleask} accepter={Textarea} placeholder={"As pessoas perguntam"} />
                </Form.Group>
            </Panel>


            <Panel bordered shaded header={"Qual é o formato do conteúdo para essa página?"} style={{
                width: "97%",
                padding: "20px 0px",
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
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dsrecommendations">
                    <Form.Control rows={3} name="dsrecommendations" onChange={setDsrecommendations} value={dsrecommendations} accepter={Textarea} placeholder={"Recomendações"} />

                </Form.Group>
            </Panel>
            <Panel bordered shaded header={"Qual é o formato do conteúdo para essa página?"} style={{
                width: "97%",
                padding: "20px 0px",
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


                    <Button
                        style={{
                            backgroundColor: "var(--color-conversion-1)",
                            color: "var(--color-darkness-background)",
                        }}
                        onClick={() => {
                            if (validate() == false) {
                                return
                            } else {
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
                                        dsfunnel,
                                        
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
                                        dsfunnel,
                                        
                                    }).then((e) => {
                                        updateSuccessHandle();
                                        closeModal(true);
                                    })
                                        .catch((e) => {
                                            typeof e.response.data != "object"
                                                ? errorHandle(e.response.data)
                                                : errorHandle(e.response.data?.message);
                                        })
                            }

                        }}
                    >Salvar e sair</Button>

                </ButtonToolbar>
                <ButtonToolbar style={{
                    float: "right",
                    marginRight: 10
                }}>


                    <Button
                        style={{
                            backgroundColor: "var(--color-conversion-12)",
                            color: "var(--color-darkness-background)",
                        }}
                        onClick={() => {
                            if (validate() == false) {
                                return
                            }
                            else {
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
                            }
                        }}
                    >Salvar Pauta</Button>

                </ButtonToolbar>
            </Panel>
        </Form>
    );
}

export default FormComponent;
