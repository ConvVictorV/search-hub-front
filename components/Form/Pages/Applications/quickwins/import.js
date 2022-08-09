import axios from 'axios'
import { useState } from 'react'
import { Form, useToaster, Message, Button, ButtonToolbar, RadioGroup, Radio, Notification, Uploader } from 'rsuite'
import Select from '../../../Components/Select'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const [customer, setCustomer] = useState()
    const [exportData, setExportData] = useState(data || [])
    const [files, setFiles] = useState([])
    const session = useSession()
    const toast = useToaster();

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Projeto criado!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );

    const sendData = async () => {
        axios.post('/api/get/readCsv', {
            content: await files[0].blobFile.text()
        })
            .then(({ data }) => {
                axios.post('/api/post/quickwins', {
                    idcustomer: customer,
                    rows: data,
                    session
                })
                    .then(e => {
                        sucessHandle()
                        closeModal(true)
                    })
                    .catch(e => {
                        console.log(e)
                        typeof e.response.data != 'object' ? errorHandle(e.response.data) : errorHandle(e.response.data?.message)
                    })
            })
            .catch(e => {
                console.log(e)
                typeof e.response.data != 'object' ? errorHandle(e.response.data) : errorHandle(e.response.data?.message)
            })
    }

    const clearToast = async () => new Promise((res, rej) => {
        toast.clear()
        setTimeout(() => {
            res()
        }, 1000);
    })

    const sucessHandle = async () => {
        await clearToast().then(() => {
            toast.push(messageSucess, { placement: "topCenter" })
        })

    }

    const errorHandle = async (message) => {
        await clearToast().finally(() => {
            toast.push(<Message showIcon type={"error"} duration={5000}>
                {message || "Ocorreu um erro!"}
            </Message>, { placement: "topCenter" })
        })
    }

    return (
        <Form fluid>
            <Select
                fetch={"/api/get/select/customersId"}
                placeholder={"Selecione o cliente"}
                onSelect={setCustomer}
                style={{
                    width:"100%"
                }}
            /> 
            <Uploader
                method={"GET"}
                disabled={files.length > 0}
                multiple={false}
                style={{ paddingBottom: "10px", }}
                action={""}
                draggable
                accept={'csv'} fileList={files} onChange={setFiles}>
                <div style={{
                    lineHeight: "95px",
                    marginTop: "20px"
                }}>Clique ou arraste os arquivos para fazer upload</div>
            </Uploader>
            <hr />
            <Form.Group>
                <ButtonToolbar>

                    <Button onClick={sendData} style={{
                        backgroundColor: 'var(--color-conversion-1)',
                        color: 'var(--color-darkness-background)',
                        float: 'right'
                    }} type="submit">{'Importar'}</Button>
                    <a target={"_blank"} rel="noreferrer" href={'https://docs.google.com/spreadsheets/u/1/d/19AfIBDObUompmekRDvNP4f0cCcyheCekxZoqIHl-jS0/copy'}>
                        <Button appearance="link" style={{
                            float: 'right',
                            marginRight:"10px"
                        }}>Planilha modelo</Button>
                    </a>
                </ButtonToolbar>
            </Form.Group>
        </Form>)
}

export default FormComponent;

