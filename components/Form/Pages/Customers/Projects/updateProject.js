import axios from 'axios'
import { useSession } from 'next-auth/react';
import { useState } from 'react'
import { Form, useToaster, Message, Button, ButtonToolbar, RadioGroup, Radio } from 'rsuite'
import Select from '../../../Components/Select'

function FormComponent({ rowData, closeModal, footer, sendText, ...rest }) {

    const session = useSession();
    const idToken = session.data.id_token
    const { idproject, dsurlsite, dstype, dsaccountgsc, dssitenamegsc, nrviewIdga } = rowData
    const [projectUrl, setProjectUrl] = useState(dsurlsite || '')
    const [projectSitename, setProjectSitename] = useState(dssitenamegsc || '')
    const [projectNrGa, setProjectNrGa] = useState(nrviewIdga || 0)
    const [projectType, setProjectType] = useState(dstype || "Institucional e Blog")
    const [projectAccount, setProjectAccount] = useState(dsaccountgsc || "")

    const toast = useToaster();

    const messageLoading = (
        <Message showIcon type={"info"} duration={0}>
            Processando dados!
        </Message>
    );
    const messageSucess = (
        <Message showIcon type={"success"} duration={5000}>
            Projeto atualizado!
        </Message>
    );

    const sendData = async () => {
        toast.push(messageLoading, { placement: "topCenter" })

        axios.post('/api/put/project', {
            idproject,
            dsurlsite: projectUrl,
            dstype: projectType,
            dsaccountgsc: projectAccount,
            dssitenamegsc: projectSitename,
            nrviewIdga: projectNrGa
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
                <Form.ControlLabel>Digite a url do projeto</Form.ControlLabel>
                <Form.Control name="project-url" onChange={setProjectUrl} defaultValue={projectUrl} />
            </Form.Group>
            <Form.Group controlId="name-9">
                <Form.ControlLabel>Digite o sitename do projeto</Form.ControlLabel>
                <Form.Control name="project-sitename" onChange={setProjectSitename} defaultValue={projectSitename} />
            </Form.Group>
            <Form.Group controlId="name-9">
                <Form.ControlLabel>Digite o número de visualização no GA</Form.ControlLabel>
                <Form.Control name="project-nr-ga" onChange={setProjectNrGa} defaultValue={projectNrGa} />
            </Form.Group>
            <Form.Group controlId="name-9">
                <Form.ControlLabel>Conta GSC</Form.ControlLabel>
                <Form.Control name="project-account" onChange={setProjectAccount} defaultValue={projectAccount} />
            </Form.Group>
            <RadioGroup name="radioList" inline appearance="picker" onChange={setProjectType} defaultValue={projectType} style={{
                width: "94%",
                padding: "0px 10px",
                border: "none",
                marginTop: "20px"
            }}>
                <span style={{
                    lineHeight: "33px"
                }}>Tipo: </span>
                <Radio value="institucional e blog">Institucional e Blog</Radio>
                <Radio value="institucional">Institucional</Radio>
                <Radio value="blog">Blog</Radio>
            </RadioGroup>
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

