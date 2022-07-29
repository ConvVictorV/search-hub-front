import { useState } from 'react'
import { Form, ButtonToolbar, Button, Uploader, useToaster, Message } from 'rsuite'
import Select from '../../Components/Select'


function FormComponent({ footer, sendText, ...rest }) {
    const [files, setFiles] = useState([])
    const [customer, setCustomer] = useState(0)
    const toast = useToaster();

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Sucesso!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );

    const sendData = async () => {
        let formData = new FormData();
        formData.append("csv", files[0] && files[0].blobFile || null)
        formData.append("idcustomer", customer)
        toast.push(messageLoading, { placement: "topCenter" })
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

    const errorHandle = async () => {
        await clearToast().finally(() => {
            toast.push(messageError, { placement: "topCenter" })
        })

    }

    return (
        <Form  {...rest} fluid>
            <Uploader
                disabled={files.length > 0}
                multiple={false}
                style={{ width: "94%", paddingBottom: "10px", }}
                action={""}
                draggable
                accept={'csv'} fileList={files} onChange={setFiles}>
                <div style={{
                    lineHeight: "95px"
                }}>Clique ou arraste os arquivos para fazer upload</div>
            </Uploader>

            <Select placeholder="Conta Search Console" fetch={localStorage.getItem("host")+"/api/get/fakeCustomersSelectId"} onSelect={setCustomer} />


            <Form.Group>
                <ButtonToolbar>
                    <Button onClick={sendData} style={{
                            backgroundColor: 'var(--color-conversion-1)',
                            color: 'var(--color-darkness-background)',
                            marginTop: "20px"
                        }} type="submit">{'Enviar'}</Button>
                </ButtonToolbar>
            </Form.Group>

        </Form>)
}

export default FormComponent;