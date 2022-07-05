import { Form, ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, Schema, Panel } from 'rsuite'
import DefaultLayout from '../../Layouts/default'
import styles from '../../styles/register/Customer.module.css'
import Select from '../../components/Form/Select'
import TextField from '../../components/Form/Textfield'

const createCustomerSchema = Schema.Model({
  "customer-name": Schema.Types.StringType().isRequired('Digite o nome do cliente.'),
  "customer-email": Schema.Types.StringType().isRequired('Digite um email válido.').isEmail('Digite um email válido.'),
  "customer-id-squad": Schema.Types.NumberType().isRequired('Digite um id'),
  "customer-active": Schema.Types.BooleanType()
});

function Customer() {
  return (
    <DefaultLayout title="Registrar novo cliente | SearchHub" description="SearchHub Conversion" >
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
          <Panel header="Criar novo cliente" bordered style={{width:'fit-content'}}>
            <Form model={createCustomerSchema}>
              <TextField name="customer-name" label="Nome do cliente" required />
              <TextField name="customer-email" type="email" label="Email do Squad/Analista" required />
              <TextField name="customer-id-squad" type="number" label="Id do Squad" required />
              <Form.Group controlId="customer-active">
                <Checkbox> O cliente está ativo?</Checkbox>
              </Form.Group>
              <Form.Group>
                <ButtonToolbar>
                  <Button style={{
                    backgroundColor: 'var(--color-main)',
                    color: 'var(--color-darkness-background)'
                  }} type="submit">Enviar</Button>
                </ButtonToolbar>
              </Form.Group>
            </Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>


    </DefaultLayout >
  )
}

Customer.auth = {}
export default Customer