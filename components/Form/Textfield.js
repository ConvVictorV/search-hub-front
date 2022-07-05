import { Form } from 'rsuite'

const TextField = ({ name, label, accepter, required, ...rest }) => (
    <Form.Group controlId={name}>
        <Form.ControlLabel>{label} </Form.ControlLabel>
        <Form.Control name={name} accepter={accepter} {...rest} />
        {required ? <Form.HelpText tooltip>{label} é obrigatório</Form.HelpText> : <></>}
    </Form.Group>
);

export default TextField