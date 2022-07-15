import { Panel, InputGroup, Input, Pagination, Table, IconButton, Divider, Whisper, Popover, Dropdown, Badge, Button } from 'rsuite'
import React, { useEffect } from 'react';

import SearchIcon from '@rsuite/icons/Search'

const { HeaderCell, Cell, Column } = Table;

import EditIcon from '@rsuite/icons/Edit';
import MoreIcon from '@rsuite/icons/More';


// custom cells
const ActionCell = ({ setDrawerOpenEdit, rowData, dataKey, setRowData, ...props }) => {
    function handleAction() {
        setRowData(rowData);
        setDrawerOpenEdit(true);
    }
    return (
        <Cell {...props} className="link-group">
            <div style={{ marginTop: "-8px" }}>
                <IconButton appearance="primary" style={{
                    background: "var(--color-conversion-1)"
                }} onClick={handleAction} icon={<EditIcon />} />
            </div>
        </Cell>
    );
};
const StatusCell = ({ rowData, dataKey, ...props }) => {
    const { blstatus } = rowData
    return (
        <Cell {...props} className="link-group">
            <div style={{ marginTop: "-8px" }}>
                {blstatus && <Button appearance='ghost' style={{
                    color: 'var(--color-conversion-7)',
                    borderColor: 'var(--color-conversion-7)'
                }}><Badge style={{ background: 'var(--color-conversion-7)' }} /> {"ativo"}</Button> || <Button appearance='ghost' style={{
                    color: 'var(--color-conversion-4)',
                    borderColor: 'var(--color-conversion-4)'
                }}><Badge style={{ background: 'var(--color-conversion-4)' }} /> {"inativo"}</Button>}
            </div>
        </Cell>
    );
};
const NmCustomer = ({ rowData, dataKey, ...props }) => {
    const { nmcustomer } = rowData
    return (
        <Cell {...props} className="link-group">
            {nmcustomer && capitalizeFirstLetter(nmcustomer) || "false"}
        </Cell>
    );
};
// 

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


const TableCustomers = ({ setDrawerOpenEdit, tableData, setSearch, headerMenu, setRowData }) => {
    const [loading, setLoading] = React.useState(true);
    const [limit, setLimit] = React.useState(12);
    const [page, setPage] = React.useState(1);
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();

    useEffect(() => {
        if (tableData) setLoading(false)
    }, [])

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setSortColumn(sortColumn);
            setSortType(sortType);
            setLoading(false);
        }, 500);
    };

    const data = typeof tableData == "object" ? tableData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    }) : [];

    const getData = () => {
        if (sortColumn && sortType) {
            return data.sort((a, b) => {
                let x = a[sortColumn];
                let y = b[sortColumn];
                if (typeof x === 'string') {
                    x = x.charCodeAt();
                }
                if (typeof y === 'string') {
                    y = y.charCodeAt();
                }
                if (sortType === 'asc') {
                    return x - y;
                } else {
                    return y - x;
                }
            });
        }
        return data;
    };
    return (
        <Panel bordered style={{ backgroundColor: "var(--rs-bg-card)", padding: "0px" }} shaded>
            {headerMenu}
            <span><h3 style={{ paddingBottom: "10px", display: "inline-block", paddingRight: "10px" }}>Busca</h3>
                <p style={{ display: "contents", color: "darkgray" }}>{tableData.length + ' Clientes'}</p></span>
            <InputGroup inside style={{
                marginBottom: "20px"
            }}>
                <InputGroup.Addon>
                    <SearchIcon />
                </InputGroup.Addon>
                <input
                    className="rs-input"
                    type="text"
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Buscar cliente ( Utilize o valor de qualquer coluna )"
                />

            </InputGroup>
            {/* <hr /> */}
            <Table
                virtualized
                autoHeight
                data={getData()}
                loading={loading}
                sortColumn={sortColumn}
                sortType={sortType}
                onSortColumn={handleSortColumn}
            >
                <Column sortable resizable width={50} align="center" fixed>
                    <HeaderCell>Id</HeaderCell>
                    <Cell dataKey="idcustomer" />
                </Column>

                <Column sortable resizable width={200} fixed>
                    <HeaderCell>Nome</HeaderCell>
                    <NmCustomer dataKey="nmcustomer" />
                </Column>

                <Column sortable resizable width={100} >
                    <HeaderCell>Status</HeaderCell>
                    <StatusCell dataKey="blstatus" />
                </Column>

                <Column sortable resizable width={100}>
                    <HeaderCell>ID Squad</HeaderCell>
                    <Cell dataKey="idsquad" />
                </Column>
                <Column sortable width={200} flexGrow={1}>
                    <HeaderCell>Email</HeaderCell>
                    <Cell dataKey="dsclientemail" />
                </Column>
                <Column width={200} verticalAlign={"top"} align="center"  >
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell setDrawerOpenEdit={setDrawerOpenEdit} setRowData={setRowData} dataKey="idcustomer" />
                </Column>
            </Table>
            <div style={{ padding: 20 }}>
                <Pagination
                    prev
                    next
                    first
                    last
                    ellipsis
                    boundaryLinks
                    maxButtons={5}
                    size="xs"
                    total={tableData.length}
                    layout={['-', 'limit', '|', 'pager', 'skip']}
                    limitOptions={[10, 20]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </Panel>)
}

export default TableCustomers