import { Panel, InputGroup, Checkbox, Pagination, Table, Stack } from 'rsuite'
import { useState, useEffect } from 'react';
import SearchIcon from '@rsuite/icons/Search'
const { HeaderCell, Cell, Column } = Table;
import Select from '../../../Form/Components/Select';

// custom cells
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props} style={{ padding: 0 }}>
        <div style={{ lineHeight: '46px' }}>
            <Checkbox
                value={rowData[dataKey]}
                inline
                onChange={onChange}
                checked={checkedKeys.some(item => item === rowData[dataKey])}
            />
        </div>
    </Cell>
);
const Inserted = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props}>
        {rowData?.dtregister?.split('T')[0]}
    </Cell>
);
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
const NmCustomer = ({ rowData, dataKey, ...props }) => {
    const { nmcustomer } = rowData
    return (
        <Cell {...props} className="link-group">
            {nmcustomer && capitalizeFirstLetter(nmcustomer) || "false"}
        </Cell>
    );
};
const WordTable = ({ tableData, setSearch, headerMenu, checkedKeys, setCheckedKeys, setFilterData }) => {

    const [loading, setLoading] = useState(true);
    const [limit, setLimit] = useState(12);
    const [page, setPage] = useState(1);
    const [sortColumn, setSortColumn] = useState();
    const [sortType, setSortType] = useState();

    const filterCustomerById = (id) =>{
        id ?
        (setFilterData({
            filter:{
                idcustomer:id
            }
        }) && setPage(1)) : setFilterData()
    }
    let checked = false;
    let indeterminate = false;

    
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

    const setPageData = (arrayData) => {
        return typeof tableData == "object" ? arrayData.filter((v, i) => {
            const start = limit * (page - 1);
            const end = start + limit;
            return i >= start && i < end;
        }) : [];
    }
    const data = typeof tableData == "object" ? tableData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end
    }) : [];
    if (checkedKeys.length === data.length) {
        checked = true;
    } else if (checkedKeys.length === 0) {
        checked = false;
    } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
        indeterminate = true;
    }

    const handleCheckAll = (value, checked) => {
        const keys = checked ? data.map(item => item.idword) : [];
        setCheckedKeys(keys);
    };
    const handleCheck = (value, checked) => {
        const keys = checked ? [...checkedKeys, value] : checkedKeys.filter(item => item !== value);
        setCheckedKeys(keys);
    };

    const getData = () => {
        if (sortColumn && sortType) {
            return setPageData(tableData.sort((a, b) => {
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
            }));
        }
        return data;
    };
    return (
        <Panel bordered style={{ backgroundColor: "var(--rs-bg-card)", padding: "0px" }} shaded>
            <Stack
                alignItems={"center"}
                justifyContent={"space-between"}>
                <Stack 
                wrap spacing={24}
                alignItems={"center"}>
                <InputGroup inside>
                    <InputGroup.Addon>
                        <SearchIcon />
                    </InputGroup.Addon>
                    <input
                        className="rs-input"
                        type="text"
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={`Buscar (${tableData.length + ' Palavras'})`}
                        style={{
                            width: "300px"
                        }}
                    />
                </InputGroup>
                <Select fetch="/api/get/select/customersId" placeholder="Filtre por cliente" onSelect={filterCustomerById}  style={{
                width:"150px"
                }}/>
                </Stack>
                {headerMenu}
            </Stack>
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
                <Column width={50} align="center">
                    <HeaderCell style={{ padding: 0 }}>
                        <div style={{ lineHeight: '40px' }}>
                            <Checkbox
                                inline
                                checked={checked}
                                indeterminate={indeterminate}
                                onChange={handleCheckAll}
                            />
                        </div>
                    </HeaderCell>
                    <CheckCell dataKey="idword" checkedKeys={checkedKeys} onChange={handleCheck} />
                </Column>
                <Column sortable resizable width={200} fixed>
                    <HeaderCell>Palavra</HeaderCell>
                    <Cell dataKey="dskeyword" />
                </Column>

                <Column sortable resizable width={200} fixed>
                    <HeaderCell>Categoria</HeaderCell>
                    <Cell dataKey="dscategoryword" />
                </Column>

                <Column sortable resizable width={100} align="center">
                    <HeaderCell>Localização</HeaderCell>
                    <Cell dataKey="dslocation" />
                </Column>

                <Column sortable resizable width={200} align="center">
                    <HeaderCell>Cidade</HeaderCell>
                    <Cell dataKey="dscity" />
                </Column>
                <Column sortable width={200} flexGrow={1} align="center">
                    <HeaderCell>Cliente</HeaderCell>
                    <NmCustomer dataKey="nmcustomer" />
                </Column>
                <Column sortable width={150} align="center">
                    <HeaderCell>Inserida em</HeaderCell>
                    <Inserted dataKey="dtregister" />
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
                    limitOptions={[10, 50, 100]}
                    limit={limit}
                    activePage={page}
                    onChangePage={setPage}
                    onChangeLimit={handleChangeLimit}
                />
            </div>
        </Panel>)
}

export default WordTable