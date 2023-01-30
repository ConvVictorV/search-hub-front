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
    Toggle
} from "rsuite";
import Select from "../../../Components/Select";
import Overview from "../../../../Tables/applications/quickwins/overview"
const { StringType, NumberType } = Schema.Types;
// eslint-disable-next-line react/display-name
const Textarea = forwardRef((props, ref) => <Input {...props} as="textarea" ref={ref} />);


function FormComponent({ data, rowData, closeModal, footer, sendText, ...rest }) {
    const [exportData, setExportData] = useState(data || []);
    const [files, setFiles] = useState([]);
    const session = useSession();
    const toast = useToaster();
    const formRef = React.useRef();

    const [idsquad, setIdquickwin] = useState(rowData?.idsquad || 0)
    const [dsname, setDsName] = useState(rowData?.dsname || '')
    const [dsemail, setDsEmail] = useState(rowData?.dsemail || '')
    const [dspoemail, setDsPoEmail] = useState(rowData?.dspoemail || '')
    const [blstatus, setDsStatus] = useState(rowData?.blstatus || false)
    const initStatus = rowData?.blstatus || false

    const [formError, setFormError] = useState({});

    const model = Schema.Model({

    });
    const [formValue, setFormValue] = useState({

    });

    const [tableData, setTableData] = useState([]);

    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
    }, [])

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Squad criado!
        </Message>
    );
    const messageUpdateSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Squad editado!
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
        ]

        const requiredMessages = [
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

    return (
        <Form
            fluid
            ref={formRef}
            onChange={setFormValue}
            formValue={formValue}
            onCheck={setFormError}
            model={model}>

            <Panel bordered shaded header={"Informações"} style={{
                width: "97%",
                padding: "20px 0px",
                marginTop: "20px"
            }}>
                <Form.Group controlId="dsname">
                    <Form.ControlLabel>Nome do squad</Form.ControlLabel>
                    <Form.Control name="dsname" onChange={setDsName} value={dsname} />
                </Form.Group>
                <Form.Group controlId="dsemail">
                    <Form.ControlLabel>Email do squad</Form.ControlLabel>
                    <Form.Control name="dsemail" onChange={setDsEmail} value={dsemail} />
                </Form.Group>
                <Form.Group controlId="dspoemail">
                    <Form.ControlLabel>Email do PO</Form.ControlLabel>
                    <Form.Control name="dspoemail" onChange={setDsPoEmail} value={dspoemail} />
                </Form.Group>
                <Form.ControlLabel style={{
                    marginTop: 40,
                    display: "block"
                }}>Squad está ativo?</Form.ControlLabel><br />
                <Toggle
                    size="lg"
                    checkedChildren="Ativo"
                    unCheckedChildren="Inativo"
                    onChange={setDsStatus}
                    defaultChecked={initStatus}
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
                                idsquad == 0 ?
                                    axios.post('/api/post/squad', {
                                        dsname,
                                        dsemail,
                                        dspoemail,
                                        blstatus,
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
                                    axios.patch('/api/put/squad', {
                                        idsquad,
                                        dsname,
                                        dsemail,
                                        dspoemail,
                                        blstatus
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
                
            </Panel>
        </Form>
    );
}

export default FormComponent;
