import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Panel, Modal, Button, Message, useToaster } from 'rsuite'
import FullWidthLayout from '../../../Layouts/fullwidth'
import React from 'react';
import TableWords from '../../../components/Tables/words';
import ExportForm from '../../../components/Form/Pages/Applications/DataForSeo/export'
import ImportForm from '../../../components/Form/Pages/Applications/DataForSeo/import'
import ReloadIcon from '@rsuite/icons/Reload';
import ImportIcon from '@rsuite/icons/Import';
import ExportIcon from '@rsuite/icons/Export';

function Demo(args) {
    const [tableData, setTableData] = useState([])
    const [checkedKeys, setCheckedKeys] = React.useState([]);
    const [search, setSearch] = useState("");
    const filteredCustomers = searchCustomer(search, tableData);
    const [openExportForm, setOpenExportForm] = useState(false);
    const [openImportForm, setOpenImportForm] = useState(false);
    const [rowData, setRowData] = useState();
    const toast = useToaster();

    const handleClose = () => {
        setOpenExportForm(false);
        setOpenImportForm(false)
        updateData()
    };
    const getData = () =>{
        const axios = require('axios')
        axios.get('/api/get/words').then(({ data }) => setTableData(data))
    }
    const updateData = () =>{
        toast.push(<Message showIcon type={"info"} duration={2000}>
        Tabela atualizada
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
                    <ImportIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => setOpenImportForm(true)} appearance={"ghost"} style={{
                    color: "var(--color-conversion-1)",
                    borderColor: "var(--color-conversion-1)",
                }}>
                    Importar
                </IconButton>
                <IconButton icon={
                    <ExportIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-1)'
                    }} />
                } onClick={() => setOpenExportForm(true)} appearance={"ghost"} style={{
                    color: "var(--color-conversion-1)",
                    borderColor: "var(--color-conversion-1)",
                }}>
                    {'Exportar '+ (checkedKeys.length != 0 ? `(${checkedKeys.length})` : '')}
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
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Clientes | SearchHub" description="SearchHub Conversion" background={2} pageName="Clientes">
            <Container style={{
                padding: "0px 50px",
            }}>
                <Modal open={openExportForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Exportar {checkedKeys.length || ''} palavras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ExportForm closeModal={handleClose} data={tableData.filter(word=>checkedKeys.indexOf(word.idword) > -1)} />
                    </Modal.Body>
                </Modal>
                <Modal open={openImportForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Importar palavras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImportForm closeModal={handleClose} />
                    </Modal.Body>
                </Modal>
                <TableWords
                    checkedKeys={checkedKeys}
                    setCheckedKeys={setCheckedKeys}
                    tableData={filteredCustomers}
                    setSearch={setSearch}
                    headerMenu={getHeaderTable()}
                    setRowData={setRowData}
                />
            </Container>

        </FullWidthLayout >
    );
};
Demo.auth = {}
export default Demo