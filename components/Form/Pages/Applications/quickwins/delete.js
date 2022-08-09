import axios from 'axios'
import { useState } from 'react'
import { Form, useToaster, Message, Button, ButtonToolbar, RadioGroup, Radio, Notification, Uploader } from 'rsuite'
import Select from '../../../Components/Select'
import Link from 'next/link'
import { useSession } from 'next-auth/react';

function FormComponent({ data, closeModal, footer, sendText, ...rest }) {
    const session = useSession();
    const idToken = session.data.id_token
    const [qws, setQws] = useState(data)
    const [customer, setCustomer] = useState()
    const toast = useToaster();

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Palavras deletadas!
        </Message>
    );
    const messageError = (
        <Message showIcon type={"error"} duration={5000}>
            Ocorreu um erro!
        </Message>
    );

    const sendData = async () => {
        toast.push(messageLoading, { placement: "topCenter" })
        axios.post('/api/delete/quickwins',{
            qws: qws.map(qw => qw.idworkedpage),
            idcustomer: customer
        }, {
            headers: {
                authorization: idToken,
            }
        }).then((s) => {
            console.log(s)
            sucessHandle()
        }).catch((e) => {
            const message = "Ocorreu um erro"
            const error = e.response?.data
            if (error == "Credenciais inválidas") message = "Você não possui permissão"
            errorHandle(message)
        }).finally(() => {
            closeModal()
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
            <Form.Group>
                <Select
                    fetch={"/api/get/select/customersId"}
                    placeholder={"Selecione o cliente"}
                    onSelect={setCustomer}
                    style={{
                        width: "100%"
                    }}
                />
                <ButtonToolbar style={{
                    marginTop: "20px"
                }}>
                    <Button onClick={sendData} style={{
                        backgroundColor: 'var(--color-conversion-4)',
                        color: 'var(--color-darkness-background)',
                        float: 'right'
                    }} type="submit">{'Deletar'}</Button>
                    <Button onClick={closeModal} style={{
                        backgroundColor: 'var(--color-conversion-1)',
                        color: 'var(--color-darkness-background)',
                        float: 'right',
                        marginRight: "5px"
                    }} type="submit">{'Voltar'}</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>)
}

export default FormComponent;

