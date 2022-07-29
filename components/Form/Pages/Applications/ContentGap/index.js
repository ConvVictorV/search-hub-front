import axios from 'axios'
import { useState } from 'react'
import { Form, ButtonToolbar, Button, TagInput, RadioGroup, Radio, useToaster, Message, Uploader } from 'rsuite'
import Select from '../../../Components/Select'


function FormComponent({ footer, sendText, ...rest }) {
    const [files, setFiles] = useState([])
    const [account, setAccount] = useState('')
    const [keywords, setKeywords] = useState([])
    const [type, setType] = useState('blog')
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
        formData.append("idcustomer", 10000)
        formData.append("csv", files[0].blobFile)
        formData.append("dssitenamegsc", account)
        formData.append("termos_para_retirar", keywords.toString().replace(/,/g, '|'))
        formData.append("dstype", type)
        formData.append("dsaccountgsc", "ga")
        formData.append("save", false)
        toast.push(messageLoading, { placement: "topCenter" })
        axios.get("https://southamerica-east1-iconic-rampart-279113.cloudfunctions.net/post_content_gap", {
            headers: {
                "cache-control": "no-cache",
                "pragma": "no-cache",
            },
            body: formData,
            method: "POST",
            mode: "cors",
            credentials: "omit"
        })
            .then(result => { console.log(result); })
            .then(sucessHandle)
            .catch(errorHandle)

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

            <Select placeholder="Conta Search Console" fetch="/api/get/fakeCustomersSelectName" onSelect={setAccount} />
            <TagInput
                trigger={['Enter']}
                placeholder="Palavras para remover"
                style={{
                    width: "94%",
                    margin: "15px 0px"
                }}
                menuStyle={{ width: "94%" }}
                onChange={setKeywords}
            />
            <RadioGroup name="radioList" style={{ marginBottom: 15 }} value={type} onChange={setType}>
                <p>Tipo do site</p>
                <Radio value="blog">Blog</Radio>
                <Radio value="institucional">Institucional</Radio>
            </RadioGroup>

            <Form.Group>
                <ButtonToolbar>
                    <Button onClick={sendData} style={{
                        backgroundColor: 'var(--color-conversion-1)',
                        color: 'var(--color-darkness-background)'
                    }} type="submit">{sendText || 'Enviar'}</Button>
                </ButtonToolbar>
            </Form.Group>

        </Form>)
}

export default FormComponent;