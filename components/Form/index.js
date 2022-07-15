import { Form, ButtonToolbar, Button, Checkbox } from 'rsuite'
import Select from '../../components/Form/Select'
import TextField from '../../components/Form/Textfield'


function FormComponent({ footer, sendText, model, inputs, ...rest }) {

    return (
        <Form model={model || false} {...rest}>
            {inputs.map((input,key) => {
                if (input.type == "text" || input.type == "number" || input.type == "email" || input.type == undefined) return (<TextField defaultValue={input.defaultValue || null} disabled={input.disabled} key={key} name={input.name} label={input.label} required={input.required && !input.defaultValue ? input.required : false} type={input.type} style={input.style} />)
                if (input.type == "checkbox") return (<Form.Group controlId={input.name} style={input.style}>{input.options.map((option,checkKey) => <Checkbox  disabled={input.disabled} key={checkKey} defaultChecked={option.checked}>{option.label}</Checkbox>)}</Form.Group>)
                if (input.type == "select") return (<Select  disabled={input.disabled} fetch={input.fetch} placeholder={input.placeholder} style={input.style} />)
                
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