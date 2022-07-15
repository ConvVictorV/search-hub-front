import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Schema, Panel, Stack } from 'rsuite'
import FullWidthLayout from '../../../Layouts/fullwidth'
import React from 'react';
import { useRouter } from 'next/router';
import DrawerComponent from '../../../components/Drawer';
import PlusIcon from '@rsuite/icons/Plus'
import Form from '../../../components/Form'
import TableProjects from '../../../components/Tables/projects';

const createNewCustomerForm = () => {
    return (
        <Panel style={{
            width: "500px",
            margin: "auto"
        }}>
            <Form
                fluid
                model={Schema.Model({
                    "project-url": Schema.Types.StringType().isRequired('Digite a url do projeto.'),
                    "project-account": Schema.Types.StringType().isRequired('Digite a conta do projeto.'),
                    "project-sitename": Schema.Types.StringType().isRequired('Digite o sitename do projeto.'),
                    "project-id-ga": Schema.Types.StringType().isRequired('Digite o id do GA.'),
                })}
                inputs={[
                    {
                        type: "text",
                        name: "project-url",
                        label: "Url do site",
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
                        name: "project-id-ga",
                        label: "Id do GA",
                        required: true
                    },
                    {
                        type: "checkbox",
                        name: "project-type",
                        options: [{ "label": "Blog", checked: true }, { "label": "Insitucional", checked: true }]
                    }
                ]}
            ></Form>
        </Panel>
    )
}
const createEditCustomerForm = (data) => {
    return (
        <Panel style={{
            width: "500px",
            margin: "auto"
        }}>
            <Form
                sendText="Salvar"
                fluid
                inputs={[
                    {
                        type: "text",
                        name: "project-url",
                        label: "Url do site",
                        defaultValue:  data.dsurlsite,
                        required: true,
                        disabled:true,
                        style: {
                            marginTop: "24px"
                        }
                    },
                    {
                        type: "text",
                        name: "project-account",
                        label: "Conta Google Search Console",
                        defaultValue:  data.dsaccountgsc,
                        required: true,
                        disabled:true
                        
                    },
                    {
                        type: "text",
                        name: "project-sitename",
                        label: "Sitename Google Search Console",
                        defaultValue:  data.dssitenamegsc,
                        required: true,
                        disabled:true
                    },
                    {
                        type: "number",
                        name: "project-id-ga",
                        label: "Id do GA",
                        defaultValue:  data.nrviewIdga,
                        required: true,
                        disabled:true
                        
                    },
                    {
                        type: "checkbox",
                        name: "project-type",
                        options: [{ "label": "Blog", checked: true }, { "label": "Insitucional", checked: true }]
                    }
                ]}
            ></Form>
        </Panel>
    )
}

function Demo(args) {
    const [tableData, setTableData] = React.useState([])
    const [search, setSearch] = useState("");
    const [host, setHost] = useState("")
    const [drawerOpenCreate, setDrawerOpenCreate] = useState(false);
    const [drawerOpenEdit, setDrawerOpenEdit] = useState(false);
    const [editRowData, setRowData] = useState(false);
    const filteredCustomers = searchCustomer(search, tableData);


    const getHeaderTable = () => {
        return (
            <ButtonToolbar style={{ paddingBottom: "18px", display: "flex", justifyContent: "end" }}>
                <IconButton icon={
                    <PlusIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => setDrawerOpenCreate(true)} appearance={"ghost"} style={{
                    color: "var(--color-conversion-1)",
                    borderColor: "var(--color-conversion-1)",
                }}>
                    Adicionar projeto
                </IconButton>
            </ButtonToolbar>
        )
    }

    function searchCustomer(search, customers) {
        if (search.length && typeof customers === "object") {
            return customers.filter((customer) => {
                const flatCustomer = JSON.stringify(customer).toLowerCase();
                return flatCustomer.includes(search.toLowerCase());
            });
        }
        return customers;
    }

    const route = useRouter()
    useEffect(() => {
        setHost(route.pathname)
        fetch(host + '/api/get/fakeProjects').then(r => r.json()).then(data => setTableData(data))
    }, [])

    return (
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Projetos | SearchHub" description="SearchHub Conversion" background={2} pageName="Projetos">
            <Container style={{
                padding: "0px 50px",
            }}>
                <DrawerComponent
                    size={"full"}
                    title="Adicionar projeto"
                    placement={"bottom"}
                    open={drawerOpenCreate}
                    setOpen={setDrawerOpenCreate}
                    body={createNewCustomerForm()}
                />
                <DrawerComponent
                    size={"full"}
                    title="Editar projeto"
                    placement={"bottom"}
                    open={drawerOpenEdit}
                    setOpen={setDrawerOpenEdit}
                    body={createEditCustomerForm(editRowData)}
                />
                <TableProjects
                    tableData={filteredCustomers}
                    setSearch={setSearch}
                    headerMenu={getHeaderTable()}
                    setRowData={setRowData}
                    setDrawerOpenEdit={setDrawerOpenEdit}
                />
            </Container>

        </FullWidthLayout >
    );
};
Demo.auth = {}
export default Demo