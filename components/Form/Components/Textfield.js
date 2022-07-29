import { Form } from 'rsuite'

const TextField = ({ name, label, accepter, required, style, size, ...rest }) => (
    <Form.Group controlId={name} style={style}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control size={size} name={name} accepter={accepter} {...rest} />
        {required ? <Form.HelpText tooltip>{label} é obrigatório</Form.HelpText> : <></>}
    </Form.Group>
);

export default TextField