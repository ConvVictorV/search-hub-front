import { ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, Schema, Panel } from 'rsuite'
import DefaultLayout from '../../Layouts/default'
import Form from '../../components/Form'
import { useRouter } from 'next/router'
import { useState,useEffect } from 'react'

function Project(args) {
  const [host,setHost] = useState("")
  const route = useRouter()
  useEffect(()=>{
    setHost(route.pathname)
  },[])
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} title="Registrar novo projeto | SearchHub" description="SearchHub Conversion" background={2} pageName="Registrar novo Projeto">
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12}>
            <Panel header={"Informações do projeto"} bordered style={{ width: '500px',backgroundColor:"var(--rs-body)"  }} shaded >
            <Form
                fluid
                model={Schema.Model({
                  "project-customer":Schema.Types.StringType().isRequired('Selecione o projeto.'),
                  "project-url":Schema.Types.StringType().isRequired('Digite a url do projeto.'),
                  "project-account":Schema.Types.StringType().isRequired('Digite a conta do projeto.'),
                  "project-sitename":Schema.Types.StringType().isRequired('Digite o sitename do projeto.'),
                  "project-id-squad":Schema.Types.StringType().isRequired('Digite o id de squad do projeto.'),
                })}
                inputs={[
                  {
                      type: "select",
                      name: "project-customer",
                      placeholder: "Selecione o cliente",
                      fetch: host+"/api/get/customers"
                  },
                  {
                      type: "text",
                      name: "project-url",
                      label: "Nome do cliente",
                      required: true,
                      style: {
                        marginTop: "24px"
                      }
                  },
                  {
                      type: "email",
                      name: "project-account",
                      label: "Conta Google Search Console",
                      required: true
                  }, 
                  {
                    type: "email",
                    name: "project-sitename",
                    label: "Sitename Google Search Console",
                    required: true
                  },
                  {
                    type: "number",
                    name: "project-id-squad",
                    label: "Id do Squad",
                    required: true
                },
                  {
                      type: "checkbox",
                      name: "project-active",
                      options: ['Blog','Institucional']
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

Project.auth = {}
export default Project