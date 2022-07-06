import { Form, ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, Schema, Panel } from 'rsuite'
import DefaultLayout from '../../Layouts/default'
import TextField from '../../components/Form/Textfield'
import Select from '../../components/Form/Select'

const createCustomerSchema = Schema.Model({
  "project-customer":Schema.Types.StringType().isRequired('Selecione o cliente.'),
  "project-url":Schema.Types.StringType().isRequired('Digite a url do cliente.'),
  "project-account":Schema.Types.StringType().isRequired('Digite a conta do cliente.'),
  "project-sitename":Schema.Types.StringType().isRequired('Digite o sitename do cliente.'),
  "project-id-squad":Schema.Types.StringType().isRequired('Digite o id de squad do cliente.'),
});

function Project(args) {
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} title="Registrar novo projeto | SearchHub" description="SearchHub Conversion" background={1} pageName="Registrar novo Projeto">
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel bordered style={{ width: 'fit-content',backgroundColor:"var(--rs-body)"  }} shaded >
              <Form model={createCustomerSchema}>
                <Form.Group controlId="project-customer" required style={{
                  marginBottom: "0px"
                }}>
                  <Select size="lg" fetch={`${process.env.NEXTAUTH_URL}api/get/customers`} placeholder="Selecione o cliente" />
                  {/* <span className="rs-form-error-message rs-form-error-message-show"><span className="rs-form-error-message-arrow"></span><span className="rs-form-error-message-inner">Digite a url do cliente.</span></span> */}
                </Form.Group>
                <TextField size="lg" name="project-url" type="text" label="Url do projeto" style={{
                  marginTop: "25px"
                }} required />
                <TextField size="lg" name="project-account" type="text" label="Conta Google Search Console" required />
                <TextField size="lg" name="project-sitename" type="text" label="Sitename Google Search Console" required />
                <TextField size="lg" name="project-id-squad" type="number" label="Id do Squad" required />
                <Form.Group controlId="project-blog" style={{
                  marginBottom: "0px"
                }}>
                  <Checkbox>Blog</Checkbox>
                </Form.Group>
                <Form.Group controlId="project-institucional">
                  <Checkbox>Institucional</Checkbox>
                </Form.Group>
                <Form.Group>
                  <ButtonToolbar>
                    <Button style={{
                      backgroundColor: 'var(--color-conversion-1)',
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

Project.auth = {}
export default Project