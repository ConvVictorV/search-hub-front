import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Panel, Modal, Button } from 'rsuite'
import FullWidthLayout from '../../Layouts/fullwidth'
import React from 'react';
import { useRouter } from 'next/router';
import TableCustomers from '../../components/Tables/customers';
import DrawerComponent from '../../components/Drawer';
import PlusIcon from '@rsuite/icons/Plus'
import { useSession } from 'next-auth/react';
import { getToken } from 'next-auth/jwt';
import EditForm from '../../components/Form/Pages/Customers/updateCustomer'
import CreateForm from '../../components/Form/Pages/Customers/createCustomer'



function Demo(args) {
    const session = useSession()
    const [tableData, setTableData] = useState([])
    const [search, setSearch] = useState("");
    const filteredCustomers = searchCustomer(search, tableData);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [rowData, setRowData] = useState();

    const handleClose = () => {
        setOpenEditForm(false);
        setOpenCreateForm(false);
    };

    useEffect(() => {
        const axios = require('axios')
        axios.get('/api/get/customers').then(({ data }) => setTableData(data))
    }, [])

    const getHeaderTable = () => {
        return (
            <ButtonToolbar style={{ paddingBottom: "18px", display: "flex", justifyContent: "end" }}>
                <IconButton icon={
                    <PlusIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => setOpenCreateForm(true)} appearance={"ghost"} style={{
                    color: "var(--color-conversion-1)",
                    borderColor: "var(--color-conversion-1)",
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

    return (
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Clientes | SearchHub" description="SearchHub Conversion" background={2} pageName="Clientes">
            <Container style={{
                padding: "0px 50px",
            }}>
                <Modal open={openEditForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Atualizar cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditForm closeModal={handleClose} data={rowData} />
                    </Modal.Body>
                </Modal>

                <Modal open={openCreateForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Criar cliente</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateForm closeModal={handleClose} />
                    </Modal.Body>
                </Modal>
                <TableCustomers
                    tableData={filteredCustomers}
                    setSearch={setSearch}
                    headerMenu={getHeaderTable()}
                    setRowData={setRowData}
                    setDrawerOpenEdit={setOpenEditForm}
                />
            </Container>

        </FullWidthLayout >
    );
};
Demo.auth = {}
export default Demo