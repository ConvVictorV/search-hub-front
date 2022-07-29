import axios from 'axios'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Form, useToaster, Message, Toggle, Button, ButtonToolbar } from 'rsuite'

function FormComponent({ closeModal, data, footer, sendText, ...rest }) {
    const session = useSession();
    const idToken = session.data.id_token
    const toast = useToaster();
    const { blstatus, dsclientemail, idcustomer, idsquad, nmcustomer } = data
    const [customerId, setCustomerId] = useState(idcustomer || '')
    const [customerName, setCustomerName] = useState(nmcustomer || '')
    const [customerEmail, setCustomerEmail] = useState(dsclientemail || '')
    const [customerIdSquad, setCustomerIdSquad] = useState(idsquad || '')
    const [customerActive, setCustomerActive] = useState(blstatus || false)


    console.log(session)
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

    const sendData = async () => {
        axios.post('/api/put/customer', {
            idcustomer: customerId,
            nmcustomer: customerName,
            blstatus: customerActive,
            idsquad: customerIdSquad,
            dsclientemail: customerEmail,
        }, {
            headers: {
                authorization: idToken
            }
        }).then((s) => {
            console.log(s)
            sucessHandle()
        }).catch((e) => {
            const message = "Ocorreu um erro"
            const error = e.response?.data
            if(error == "Credenciais inválidas") message = "Você não possui permissão"
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
            <Form.Group controlId="name-9">
                <Form.ControlLabel>ID</Form.ControlLabel>
                <Form.Control name="customer-name" onChange={setCustomerId} defaultValue={idcustomer} readOnly={true} />
            </Form.Group>
            <Form.Group controlId="name-9">
                <Form.ControlLabel>Nome</Form.ControlLabel>
                <Form.Control name="customer-name" onChange={setCustomerName} defaultValue={nmcustomer} />
            </Form.Group>
            <Form.Group controlId="email-9">
                <Form.ControlLabel>Email</Form.ControlLabel>
                <Form.Control name="customer-email" type="email" onChange={setCustomerEmail} defaultValue={dsclientemail} />
            </Form.Group>
            <Form.Group controlId="password-9">
                <Form.ControlLabel>Id do Squad</Form.ControlLabel>
                <Form.Control name="customer-id-squad" type="number" autoComplete="off" onChange={setCustomerIdSquad} defaultValue={idsquad} />
            </Form.Group>
            <Toggle size="lg" checkedChildren="Ativo" unCheckedChildren="Inativo" onChange={setCustomerActive} defaultChecked={blstatus} />
            <hr />
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

