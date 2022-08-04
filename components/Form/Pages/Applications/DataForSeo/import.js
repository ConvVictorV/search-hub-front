import axios from 'axios'
import { useState } from 'react'
import { Form, useToaster, Message, Button, ButtonToolbar, RadioGroup, Radio, Notification, Uploader } from 'rsuite'
import Select from '../../../Components/Select'
import Link from 'next/link'

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const [project, setProject] = useState(521)
    const [exportData, setExportData] = useState(data || [])
    const [files, setFiles] = useState([])

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
                axios.post('/api/post/words', {
                    idproject: project,
                    rows: data
                })
                    .then(e => {
                        sucessHandle()
                        closeModal(true)
                    })
                    .catch(e => {
                        console.log(e)
                        errorHandle(e.response.data)
                    })
            })
            .catch(e => {
                console.log(e)
                errorHandle(e.response.data)
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
            {exportData.length == 0 ? <Select
                fetch={"/api/get/select/projectsId"}
                placeholder={"Selecione o projeto"}
                onSelect={setProject}
                style={{
                    width:"100%"
                }}
            /> : ''}
            <Uploader
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
                    <a target={"_blank"} rel="noreferrer" href={'https://docs.google.com/spreadsheets/u/1/d/1i_D7efNj9kdKzbSjycFpWLT3EFVGMw6fMYo_am2cTrw/copy'}>
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

