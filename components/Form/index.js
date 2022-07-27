import { useEffect, useState } from 'react'
import { Form, ButtonToolbar, Button, Checkbox, Uploader } from 'rsuite'
import Select from '../../components/Form/Select'
import TextField from '../../components/Form/Textfield'


function FormComponent({ footer, sendText, model, inputs, ...rest }) {
    const [files,setFiles] = useState([])
    useEffect(()=>{console.log(files)})
    return (
        <Form model={model || false} {...rest}>
            {inputs.map((input,key) => {
                if (input.type == "text" || input.type == "number" || input.type == "email" || input.type == undefined) return (<TextField defaultValue={input.defaultValue || null} disabled={input.disabled} key={key} name={input.name} label={input.label} required={input.required && !input.defaultValue ? input.required : false} type={input.type} style={input.style} />)
                if (input.type == "checkbox") return (<Form.Group style={input.style}>{input.options.map((option,checkKey) => <Checkbox disabled={input.disabled} key={checkKey} controlId={input.name} defaultChecked={option.checked}>{option.label}</Checkbox>)}</Form.Group>)
                if (input.type == "select") return (<Select disabled={input.disabled} fetch={input.fetch} placeholder={input.placeholder} style={input.style} />)
                if (input.type == "uploader") return (<Uploader disabled={files.length > 0 } multiple={false} style={{width:"94%",paddingBottom:"10px", }} action={""} draggable accept={input.accept} fileList={files} onChange={setFiles}><div key="1" style={{
                    lineHeight:"95px"
                }}>{input.label || "Clique ou arraste os arquivos para fazer upload"}</div></Uploader>)
                
            })}
            {footer ||
                <Form.Group>
                    <ButtonToolbar>
                        <Button style={{
                            backgroundColor: 'var(--color-conversion-1)',
                            color: 'var(--color-darkness-background)'
                        }} type="submit">{sendText || 'Enviar'}</Button>
                    </ButtonToolbar>
                </Form.Group>
            }
        </Form>)
}

export default FormComponent;