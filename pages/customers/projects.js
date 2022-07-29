import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Panel, Modal, Button, Message, useToaster } from 'rsuite'
import FullWidthLayout from '../../Layouts/fullwidth'
import React from 'react';
import TableProjects from '../../components/Tables/customers/projects';
import PlusIcon from '@rsuite/icons/Plus'
import EditForm from '../../components/Form/Pages/Customers/Projects/updateProject'
import CreateForm from '../../components/Form/Pages/Customers/Projects/createProject'
import ReloadIcon from '@rsuite/icons/Reload';

function Demo(args) {
    const [tableData, setTableData] = useState([])
    const [search, setSearch] = useState("");
    const filteredCustomers = searchCustomer(search, tableData);
    const [openEditForm, setOpenEditForm] = useState(false);
    const [openCreateForm, setOpenCreateForm] = useState(false);
    const [rowData, setRowData] = useState();
    const toast = useToaster()
    const handleClose = () => {
        setOpenEditForm(false);
        setOpenCreateForm(false);
        updateData()
    };

    const getData = () =>{
        const axios = require('axios')
        axios.get(localStorage.getItem("host")+'/api/get/projects').then(({ data }) => setTableData(data))
    }
    const updateData = () =>{
        toast.push(<Message showIcon type={"success"} duration={2000}>
        Dados atualizados
    </Message>, { placement: "topCenter" })
        getData()
    }
    useEffect(() => {
        getData()
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
                    Adicionar projeto
                </IconButton>

                <IconButton icon={
                    <ReloadIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => updateData()} appearance={"ghost"} style={{
                    color: "var(--color-conversion-1)",
                    borderColor: "var(--color-conversion-1)",
                }}>
                    Atualizar
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
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Projetos | SearchHub" description="SearchHub Conversion" background={2} pageName="Projetos">
            <Container style={{
                padding: "0px 50px",
            }}>
                <Modal open={openEditForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Atualizar projeto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <EditForm closeModal={handleClose} rowData={rowData} />
                    </Modal.Body>
                </Modal>

                <Modal open={openCreateForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Criar projeto</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <CreateForm closeModal={handleClose} />
                    </Modal.Body>
                </Modal>
                <TableProjects
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