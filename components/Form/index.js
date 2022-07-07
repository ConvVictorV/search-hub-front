import { Form, ButtonToolbar, Button, Checkbox } from 'rsuite'
import Select from '../../components/Form/Select'
import TextField from '../../components/Form/Textfield'


function FormComponent({ footer, model, inputs, ...rest }) {

    return (
        <Form model={model || false} {...rest}>
            {inputs.map((input,key) => {
                if (input.type == "text" || input.type == "number" || input.type == "email" || input.type == undefined) return (<TextField key={key} name={input.name} label={input.label} required={input.required || false} type={input.type} style={input.style} />)
                if (input.type == "checkbox") return (<Form.Group controlId={input.name} style={input.style}>{input.options.map((option,checkkey) => <Checkbox key={checkkey}>{option}</Checkbox>)}</Form.Group>)
                if (input.type == "select") return (<Select fetch={input.fetch} placeholder={input.placeholder} style={input.style} />)
                
            })}
            {footer ||
                <Form.Group>
                    <ButtonToolbar>
                        <Button style={{
                            backgroundColor: 'var(--color-conversion-1)',
                            color: 'var(--color-darkness-background)'
                        }} type="submit">Enviar</Button>
                    </ButtonToolbar>
                </Form.Group>
            }
        </Form>)
}

export default FormComponent;