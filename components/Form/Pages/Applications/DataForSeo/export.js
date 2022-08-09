import axios from 'axios'
import { useState } from 'react'
import { Form, useToaster, Message, Button, ButtonToolbar, RadioGroup, Radio, Notification } from 'rsuite'
import Select from '../../../Components/Select'
import Link from 'next/link'

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const [projectCustomer, setProjectCustomer] = useState(false)
    const [exportData, setExportData] = useState(data || [])


    const toast = useToaster();

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Palavras exportadas!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );

    const downloadData = async data => {
        closeModal(true)
        clearToast().then(() => {
            const url = window?.URL?.createObjectURL(new Blob([data]))
            toast.push(
                <Notification type="info" header="Download pronto" closable duration={0} style={{ width: 320 }}>
                    <hr />
                    <a href={url} download={`${projectCustomer || 0}_export_words_${new Date().getTime()}.csv`}><Button>Download</Button></a>
                </Notification>
                , { placement: "topCenter" }
            )
        })
    }

    const sendData = async () => {
        toast.push(messageLoading, { placement: "topCenter" })
        if (exportData.length == 0) {
            await axios.get(projectCustomer ? `/api/get/exportWords?idcustomer=${projectCustomer}` : `/api/get/exportWords`)
                .then(({ data }) => downloadData(data))
                .catch((e) => {
                    console.log(e)
                    errorHandle()
                })
        } else {
            await axios.post(`/api/get/exportWords`, {
                content: exportData
            })
                .then(({ data }) => downloadData(data))
                .catch((e) => {
                    console.log(e)
                    errorHandle()
                })
        }
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
        <Form fluid>
            {exportData.length == 0 ? <Select
                fetch={"/api/get/select/customersId"}
                placeholder={"Selecione o cliente"}
                onSelect={setProjectCustomer}
                style={{
                    width:"100%"
                }}
            /> : ''}

            <hr />
            <Form.Group>
                <ButtonToolbar>
                    <Button onClick={sendData} style={{
                        backgroundColor: 'var(--color-conversion-1)',
                        color: 'var(--color-darkness-background)',
                        float: 'right'
                    }} type="submit">{'Exportar'}</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>)
}

export default FormComponent;

