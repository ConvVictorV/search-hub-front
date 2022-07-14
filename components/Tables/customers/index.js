import { Panel, InputGroup, Input, Pagination, Table, IconButton, Divider, Whisper, Popover, Dropdown, Badge } from 'rsuite'
import React, { useEffect } from 'react';

import SearchIcon from '@rsuite/icons/Search'

const { HeaderCell, Cell, Column } = Table;

import EditIcon from '@rsuite/icons/Edit';
import MoreIcon from '@rsuite/icons/More';




const renderMenu = ({ onClose, left, top, className }, ref) => {
    const handleSelect = eventKey => {
        onClose();
    };
    return (
        <Popover ref={ref} className={className} style={{ left, top }} full>
            <Dropdown.Menu onSelect={handleSelect}>
                <Dropdown.Item eventKey={3}>Download As...</Dropdown.Item>
                <Dropdown.Item eventKey={4}>Export PDF</Dropdown.Item>
                <Dropdown.Item eventKey={5}>Export HTML</Dropdown.Item>
                <Dropdown.Item eventKey={6}>Settings</Dropdown.Item>
                <Dropdown.Item eventKey={7}>About</Dropdown.Item>
            </Dropdown.Menu>
        </Popover>
    );
};

// custom cells
const ActionCell = ({ rowData, dataKey, ...props }) => {
    function handleAction() {
        console.log(rowData);
    }
    return (
        <Cell {...props} className="link-group">
            <div style={{ marginTop: "-8px" }}>
                <IconButton appearance="subtle" onClick={handleAction} icon={<EditIcon />} />
                <Divider vertical />
                <Whisper placement="autoVerticalStart" trigger="click" speaker={renderMenu}>
                    <IconButton appearance="subtle" icon={<MoreIcon />} />
                </Whisper>
            </div>
        </Cell>
    );
};
const StatusCell = ({ rowData, dataKey, ...props }) => {
    const { blstatus } = rowData
    return (
        <Cell {...props} className="link-group">
            {blstatus && <><Badge style={{ background: 'var(--color-conversion-7)' }} /> {blstatus.toString()}</> || <><Badge style={{ background: 'var(--color-conversion-4)' }} /> {"false"}</>}
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


const TableCustomers = ({ tableData, setSearch, headerMenu }) => {
    const [loading, setLoading] = React.useState(true);
    const [limit, setLimit] = React.useState(8);
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
            <span><h3 style={{ paddingBottom: "10px",display:"inline-block",paddingRight:"10px"}}>Busca</h3>
            <p style={{display:"contents",color: "darkgray"}}>{tableData.length+' Clientes'}</p></span>
            <InputGroup inside>
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
            <hr />
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

                <Column sortable resizable width={100}>
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
                <Column width={200} verticalAlign={"top"} >
                    <HeaderCell>Action</HeaderCell>
                    <ActionCell dataKey="idcustomer" />
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