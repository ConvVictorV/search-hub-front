import { ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, Schema, Panel } from 'rsuite'
import DefaultLayout from '../../Layouts/default'
import styles from '../../styles/register/Customer.module.css'
import Select from '../../components/Form/Select'
import TextField from '../../components/Form/Textfield'
import Form from '../../components/Form'

const createCustomerSchema = Schema.Model({
  "customer-name": Schema.Types.StringType().isRequired('Digite o nome do cliente.'),
  "customer-email": Schema.Types.StringType().isRequired('Digite um email válido.').isEmail('Digite um email válido.'),
  "customer-id-squad": Schema.Types.NumberType().isRequired('Digite um id'),
  "customer-active": Schema.Types.BooleanType()
});

function Customer(args) {
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} title="Registrar novo cliente | SearchHub" description="SearchHub Conversion" background={2} pageName="Registrar novo Cliente" >
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel header={"Informações do cliente"} style={{ width: '500px', backgroundColor: "var(--rs-body)" }} shaded bordered>
              <Form
                fluid
                model={Schema.Model({
                  "customer-name": Schema.Types.StringType().isRequired('Digite o nome do cliente.'),
                  "customer-email": Schema.Types.StringType().isRequired('Digite um email.').isEmail('Digite um email válido.'),
                  "customer-id-squad": Schema.Types.NumberType().isRequired('Digite um id.'),
                  "customer-active": Schema.Types.BooleanType()
                })}
                inputs={[
                  {
                      type: "text",
                      name: "customer-name",
                      label: "Nome do cliente",
                      required: true
                  },
                  {
                      type: "email",
                      name: "customer-email",
                      label: "Email do Squad/Analista",
                      required: true
                  },
                  {
                    type: "number",
                    name: "customer-id-squad",
                    label: "Id do Squad",
                    required: true
                },
                  {
                      type: "checkbox",
                      name: "customer-active",
                      options: ['O cliente está ativo?']
                  }
              ]}
              ></Form>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>


    </DefaultLayout >
  )
}

Customer.auth = {}
export default Customer