import { useEffect, useState } from 'react';
import { Container, ButtonToolbar, IconButton, Panel, Modal, Button, Message, useToaster } from 'rsuite'
import FullWidthLayout from '../../../Layouts/fullwidth'
import React from 'react';
import TableWords from '../../../components/Tables/applications/quickwins';
import ExportForm from '../../../components/Form/Pages/Applications/quickwins/export'
import ImportForm from '../../../components/Form/Pages/Applications/quickwins/import'
import DeleteForm from '../../../components/Form/Pages/Applications/quickwins/delete'
import ReloadIcon from '@rsuite/icons/Reload';
import ImportIcon from '@rsuite/icons/Import';
import ExportIcon from '@rsuite/icons/Export';
import TrashIcon from '@rsuite/icons/Trash';

function Demo(args) {
    const [tableData, setTableData] = useState([])
    const [checkedKeys, setCheckedKeys] = React.useState([]);
    const [search, setSearch] = useState("");
    const filteredCustomers = searchCustomer(search, tableData);
    const [openExportForm, setOpenExportForm] = useState(false);
    const [openImportForm, setOpenImportForm] = useState(false);
    const [openDeleteForm, setOpenDeleteForm] = useState(false);
    
    const [rowData, setRowData] = useState();
    const toast = useToaster();

    const handleClose = () => {
        setOpenExportForm(false)
        setOpenImportForm(false)
        setOpenDeleteForm(false)
        updateData()
    };
    const getData = () =>{
        const axios = require('axios')
        axios.get('/api/get/quickwins').then(({ data }) => setTableData(data))
    }
    const updateData = () =>{
        setCheckedKeys([])
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
                {checkedKeys.length != 0 ? <IconButton icon={
                    <TrashIcon style={{
                        backgroundColor: 'transparent',
                        color: 'var(--color-conversion-4)'
                    }} />
                } onClick={() => setOpenDeleteForm(true)} appearance={"ghost"} style={{
                    color: "var(--color-conversion-4)",
                    borderColor: "var(--color-conversion-4)",
                }}>
                    {`Deletar (${checkedKeys.length})`}
                </IconButton> : ''}
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
        <FullWidthLayout toggleTheme={args.toggleTheme} title="QuickWins | SearchHub" description="SearchHub Conversion" background={2} pageName="QuickWins">
            <Container style={{
                padding: "0px 50px",
            }}>
                <Modal open={openExportForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Exportar {checkedKeys.length || ''} palavras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ExportForm closeModal={handleClose} data={tableData.filter(word=>checkedKeys.indexOf(word.idworkedpage) > -1)} />
                    </Modal.Body>
                </Modal>
                <Modal open={openImportForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Importar QuickWins</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <ImportForm closeModal={handleClose} />
                    </Modal.Body>
                </Modal>
                <Modal open={openDeleteForm} onClose={handleClose} size="xs" keyboard={false} backdrop={'static'}>
                    <Modal.Header>
                        <Modal.Title>Deletar palavras</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <DeleteForm closeModal={handleClose} data={tableData.filter(word=>checkedKeys.indexOf(word.idworkedpage) > -1)}/>
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