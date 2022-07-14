import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Schema, Panel } from 'rsuite'
import FullWidthLayout from '../../Layouts/fullwidth'
import React from 'react';
import { useRouter } from 'next/router';
import TableCustomers from '../../components/Tables/customers';
import DrawerComponent from '../../components/Drawer';
import PlusIcon from '@rsuite/icons/Plus'
import Form from '../../components/Form'

const createCustomForm = () => {
    return (
        <Panel style={{
            width: "500px",
            margin: "auto"
        }}>
            <Form
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
    )
}

function Demo(args) {
    const [tableData, setTableData] = React.useState([])
    const [search, setSearch] = useState("");
    const [host, setHost] = useState("")
    const [drawerOpen, setDrawerOpen] = useState(false);
    const filteredCustomers = searchCustomer(search, tableData);

    const getHeaderTable = () => {
        return (
            <ButtonToolbar style={{ paddingBottom: "18px",display: "flex",justifyContent: "end" }}>
                <IconButton icon={
                    <PlusIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => setDrawerOpen(true)} appearance={"ghost"} style={{
                    color:"var(--color-conversion-1)",
                    borderColor:"var(--color-conversion-1)",
                }}>
                    Adicionar cliente
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
        fetch(host + '/api/get/fakeCustomers').then(r => r.json()).then(data => setTableData(data))
    }, [])

    return (
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Clientes | SearchHub" description="SearchHub Conversion" background={2} pageName="Clientes">
            <Container style={{
                padding: "0px 50px",
            }}>
                <DrawerComponent
                    size={"lg"}
                    title="Adicionar cliente"
                    placement={"bottom"}
                    open={drawerOpen}
                    setOpen={setDrawerOpen}
                    body={createCustomForm()}
                />
                <TableCustomers
                    tableData={filteredCustomers}
                    setSearch={setSearch}
                    headerMenu={getHeaderTable()}
                />
            </Container>

        </FullWidthLayout >
    );
};
Demo.auth = {}
export default Demo