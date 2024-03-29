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
    Schema,
    DatePicker
} from "rsuite";
import Select from "../../../Components/Select";
import SelectWriter from "../../../../Tables/applications/redatores/select"
const { StringType, NumberType, DateType, ObjectType } = Schema.Types;
// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, rowData, closeModal, footer, sendText, tableData, ...rest }) {
    const dataCustomer = rowData[0]?.nmcustomer
    const dataIdCustomer = rowData[0]?.idcustomer
    const dataMonth = rowData[0]?.dsmonth
    const dataYear = rowData[0]?.dsyear || new Date().getFullYear()
    const dataContent = rowData[0]?.dscontent || rowData[0]?.dscontenttype
    const dataTotalQuickwins = (rowData.length || rowData[0]?.nbtotalqws) || 0
    const dataTotalWords = rowData.reduce(getTotal, 0) || rowData[0]?.nbtotalkeywords
    const [idtextrequest, setIdtextrequest] = useState(rowData.idtextrequest || 0)

    function getTotal(total, item) {
        return total + item.dsdensity
    }

    const session = useSession();
    const toast = useToaster();
    const formRef = React.useRef();
    
    const [idtexttopic, setIdTextTopic] = useState(rowData.textTopic?.idtexttopic || 0)
    const [dstitle, setDstitle] = useState(rowData.textTopic?.dstitle || '')
    const [dsdescription, setDsdescription] = useState(rowData.textTopic?.dsdescription || '')

    const [dsTotalValue, setDsTotalValue] = useState(rowData[0]?.dsvalue || '')
    const [dsObservations, setDsObservations] = useState(rowData[0]?.dsorientation|| '')
    const [dsFinalDate, setDsFinalDate] = useState(rowData[0]?.dtdeadline || new Date())
    const [dsresponsible, setDsresponsible] = useState(rowData[0]?.dsresponsible || '')
    const [jiraKey, setJiraKey] = useState(rowData[0]?.jiraKey || '')
    const [dstextlink, setDstextlink] = useState(rowData.textTopic?.dstextlink || '')
    const [dstextstructure, setDstextstructure] = useState(rowData.textTopic?.dstextstructure || '')
    const [dssecundarykeywords, setDsecundarykeywords] = useState(rowData.textTopic?.dssecundarykeywords || '')
    const [dspeopleask, setDspeopleask] = useState(rowData.textTopic?.dspeopleask || '')
    const [dspagestructure, setDspagestructure] = useState(rowData.textTopic?.dspagestructure || '')
    const [dsrecommendations, setDsrecommendations] = useState(rowData.textTopic?.dsrecommendations || '')
    const [dscta, setDscta] = useState(rowData.textTopic?.dscta || '')
    const [dsfunnel, setDsfunnel] = useState(rowData.textTopic?.dsfunnel || '')
    const [formError, setFormError] = useState({});

    const [writers, setWriters] = useState([])
    const [writer,setWriter] = useState({})
    const [dataBkp, setDataBkp] = useState([])
    
    const model = Schema.Model({
        // dstitle: StringType().isRequired('O campo não pode estar vazio.'),
        // dsdescription: StringType().isRequired('O campo não pode estar vazio.'),
        // dstextlink: StringType().isRequired('O campo não pode estar vazio.').isURL('Digite uma url válida').addRule((value, data) => {
        //     return value.indexOf('docs') > - 1
        // }, "A url precisa ser um docs."),
        // dstextstructure: StringType(),
        // dssecundarykeywords: StringType(),
        // dspeopleask: StringType().isRequired('O campo não pode estar vazio.'),
        // dsrecommendations: StringType().isRequired('O campo não pode estar vazio.'),
        dsvalue: StringType().isRequired('Digite um valor válido'),
        datePicker: DateType().isRequired('Selecione uma data').min(new Date(), 'Data a partir de: '+new Date().toLocaleDateString()),
        dsobs: StringType().isRequired('O campo não pode estar vazio.'),
        dsresponsible: StringType().isRequired('O campo não pode estar vazio.'),
    });
    const [formValue, setFormValue] = useState({
        dstitle,
        dsdescription,
        dsvalue: dsTotalValue,
        // datePicker: dsFinalDate,
        dsobs: dsObservations,
        writer,
        dsresponsible,
        dstextlink,
        dstextstructure,
        dssecundarykeywords,
        dspeopleask,
        dspagestructure,
        dsrecommendations,
        dscta,
        dsfunnel,
    });


    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        let pageWriter = 0
        let writersD = []
        let nextPage = true

        getWriters()

        function getWriters() {
            pageWriter = pageWriter + 1
            axios.get('/api/get/writers?page=' + pageWriter)
            .then(({ data }) => {
                writersD = writersD.concat(data)
                setWriters(writersD)
                setDataBkp(writersD)
                data.length != 0 && getWriters()
            })
           
        }
        
    }, [])

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Dados Enviados!
        </Message>
    );
    const messageUpdateSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Dados Enviados!
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
        formValue.datePicker = dsFinalDate
        console.log(formError)
        const requiredFields = [
            writer,
        ]

        const requiredMessages = [
            'Selecione um redator',

        ]
        const erroredFields = requiredFields.map((field, index) => {
            if(typeof field == 'object' && (Object.keys(field)).length == 0){
                return index
            }
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

    return (
        <Form
            fluid
            layout="inline" 
            ref={formRef}
            onChange={setFormValue}
            formValue={formValue}
            onCheck={setFormError}
            // onFocus={() => { formRef.current?.check(); }}
            // onBlur={() => { formRef.current?.check(); }}
            model={model}
        >

            <Panel bordered shaded header={"Resumo do pedido"} style={{
                width: "97%",
                padding: "20px 0px",
                background: "var(--rs-btn-subtle-hover-bg)"
            }}>
                <p><b>Cliente</b>: {dataCustomer}</p>
                <p><b>Mês de referência</b>: {dataMonth}, {dataYear}</p>
                <p><b>Tipo de conteúdo</b>: {dataContent}</p>
                <p><b>Total de quickwins</b>: {dataTotalQuickwins}</p>
                <p><b>Total de palavras</b>: {dataTotalWords}</p>
            </Panel>

            <Panel bordered shaded style={{
                width: "97%",
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dsvalue" style={{
                    display: 'inline-flex',
                    flexDirection: 'column'
                }}>
                    <Form.ControlLabel>Valor Total do pedido</Form.ControlLabel>
                    <Form.Control name="dsvalue" onChange={setDsTotalValue} value={dsTotalValue} />
                </Form.Group>
                <Form.Group controlId="datePicker" style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    marginLeft: 30
                }}>
                    <Form.ControlLabel>Prazo de entrega final do pedido</Form.ControlLabel>
                    <Form.Control name="datePicker" accepter={DatePicker} 
                    value={new Date(dsFinalDate)}
                    onChange={(value) => {
                        value ? setDsFinalDate(value.toISOString()) : setDsFinalDate(false)
                    }} />
                </Form.Group>
                <Form.Group controlId="dsresponsible" style={{
                    display: 'inline-flex',
                    flexDirection: 'column',
                    marginLeft: 30
                }}>
                    <Form.ControlLabel>Analista Responsável</Form.ControlLabel>
                    <Form.Control name="dsresponsible" onChange={setDsresponsible} value={dsresponsible} />
                </Form.Group>
                
                

                <Form.Group controlId="dsobs" style={{
                    display: 'flex',
                    flexDirection: 'column'
                }}>
                    <Form.ControlLabel>Observações para o redator</Form.ControlLabel>
                    <Form.Control rows={3} name="dsobs" style={{
                        width: 875
                    }} onChange={setDsObservations} value={dsObservations} accepter={Textarea} placeholder={"Observações"} />
                </Form.Group>
                <Form.Group controlId="jirakey" style={{
                    display: dsTotalValue ? 'inline-flex':'none',
                    flexDirection: 'column',
                }}>
                    <Form.ControlLabel>Chave do Jira</Form.ControlLabel>
                    <Form.Control name="jirakey" onChange={setJiraKey} value={jiraKey} />
                </Form.Group>
            </Panel>
            
            <Panel bordered shaded style={{
                width: "97%",
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <h5>Redator selecionado: <i style={{fontWeight:"normal"}}>{writer.dsname || "Nenhum redator selecionado, clique na linha para selecionar um redator"}</i></h5><br></br>
                <SelectWriter setTableData={setWriters} setWriter={setWriter} tableData={writers} dataBkp={dataBkp} />
            </Panel>

            
            <Panel>
                <ButtonToolbar style={{
                    float: "right"
                }}>
                    <Button
                        disabled={session.status !== "authenticated"}
                        style={{
                            backgroundColor: "var(--color-conversion-1)",
                            color: "var(--color-darkness-background)",
                        }}
                        onClick={() => {
                            if (validate() == false) {
                                return
                            } else {

                                idtexttopic == 0 ?
                                    axios.post('/api/post/textRequest', {
                                        dsvalue: dsTotalValue,
                                        dtdeadline: dsFinalDate,
                                        fkwriter: writer.idwriter,
                                        dsstatus: "Pedido aguardando aceite",
                                        dtcreate: new Date().toISOString(),
                                        dsorientation: dsObservations,
                                        nbtotalkeywords: dataTotalWords,
                                        nbtotalqws: dataTotalQuickwins,
                                        dsresponsible: dsresponsible,
                                        dscontenttype: dataContent,
                                        dsmonth: dataMonth,
                                        idcustomer: dataIdCustomer,
                                        fkidquickwin: rowData.map(row=>row.id),
                                        jiraKey
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
                                        dstextlink,
                                        dstextstructure,
                                        dssecundarykeywords,
                                        dspeopleask,
                                        dspagestructure,
                                        dsrecommendations,
                                        dscta,
                                        dsfunnel,
                                        jiraKey
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
                    >Enviar Pedido</Button>
                </ButtonToolbar>
            </Panel>
        </Form>
    );
}

export default FormComponent;
