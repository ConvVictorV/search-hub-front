import axios from 'axios'
import { useState } from 'react'
import { Form, useToaster, Message, Toggle, Button, ButtonToolbar } from 'rsuite'

function FormComponent({ closeModal, footer, sendText, ...rest }) {
    const [customerName, setCustomerName] = useState('')
    const [customerEmail, setCustomerEmail] = useState('')
    const [customerIdSquad, setCustomerIdSquad] = useState('')
    const [customerActive, setCustomerActive] = useState(false)    

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
        axios.post('/api/post/customer',{
            nmcustomer:customerName,
            blstatus:customerActive,
            idsquad:customerIdSquad,
            dsclientemail:customerEmail,
        }).then((s)=>{
            console.log(s)
            sucessHandle()
        }).catch((e)=>{
            console.log(e)
            errorHandle()
        }).finally(()=>{
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

    const errorHandle = async () => {
        await clearToast().finally(() => {
            toast.push(messageError, { placement: "topCenter" })
        })
    }

    return (
        <Form fluid>
            <Form.Group controlId="name-9">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control name="customer-name" onChange={setCustomerName} />
            </Form.Group>
            <Form.Group controlId="email-9">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="customer-email" type="email" onChange={setCustomerEmail} />
            </Form.Group>
            <Form.Group controlId="password-9">
                <Form.ControlLabel>Id do Squad</Form.ControlLabel>
                <Form.Control name="customer-id-squad" type="number" autoComplete="off" onChange={setCustomerIdSquad} />
            </Form.Group>
            <Toggle size="lg" checkedChildren="Ativo" unCheckedChildren="Inativo" onChange={setCustomerActive} />
            <hr/>
            <Form.Group>
                <ButtonToolbar>
                    <Button onClick={sendData} style={{
                        backgroundColor: 'var(--color-conversion-1)',
                        color: 'var(--color-darkness-background)',
                        float: 'right'
                    }} type="submit">{'Enviar'}</Button>
                </ButtonToolbar>
            </Form.Group>
        </Form>)
}

export default FormComponent;

