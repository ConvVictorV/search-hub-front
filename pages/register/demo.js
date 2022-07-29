import { useEffect, useState } from 'react';
import { Pagination, Table, IconButton, Divider, Whisper, Popover, Dropdown, Container, Panel } from 'rsuite'
import FullWidthLayout from '../../Layouts/fullwidth'
import React from 'react';
import { useRouter } from 'next/router';
import EditIcon from '@rsuite/icons/Edit';
import MoreIcon from '@rsuite/icons/More';

const { HeaderCell, Cell, Column } = Table;

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

function Demo(args) {
    const [loading, setLoading] = React.useState(false);
    const [limit, setLimit] = React.useState(12);
    const [page, setPage] = React.useState(1);
    const [fakeData, setFakeData] = React.useState([])
    const [host, setHost] = useState("")
    const [sortColumn, setSortColumn] = React.useState();
    const [sortType, setSortType] = React.useState();




    const route = useRouter()
    useEffect(() => {
        setLoading(true)
        setHost(route.pathname)
        fetch(host + '/api/get/fakeData').then(({data}) => setFakeData(data)).then(() => setLoading(false))
    }, [])

    const handleChangeLimit = dataKey => {
        setPage(1);
        setLimit(dataKey);
    };

    const handleSortColumn = (sortColumn, sortType) => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setSortColumn(sortColumn);
            setSortType(sortType);
        }, 500);
    };

    const data = fakeData.filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
    });

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
        <FullWidthLayout toggleTheme={args.toggleTheme} title="Table example | SearchHub" description="SearchHub Conversion" background={2} pageName="Table example">
            <Container style={{
                padding: "50px",
            }}>
                <Panel bordered style={{ backgroundColor: "var(--rs-bg-card)", padding: "0px" }} shaded>
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
                            <Cell dataKey="id" />
                        </Column>

                        <Column sortable resizable width={100} fixed>
                            <HeaderCell>First Name</HeaderCell>
                            <Cell dataKey="firstName" />
                        </Column>

                        <Column sortable resizable width={100}>
                            <HeaderCell>Last Name</HeaderCell>
                            <Cell dataKey="lastName" />
                        </Column>

                        <Column sortable resizable width={200}>
                            <HeaderCell>City</HeaderCell>
                            <Cell dataKey="city" />
                        </Column>
                        <Column sortable width={200} flexGrow={1}>
                            <HeaderCell>Company Name</HeaderCell>
                            <Cell dataKey="companyName" />
                        </Column>
                        <Column width={200} verticalAlign={"top"} >
                            <HeaderCell>Action</HeaderCell>
                            <ActionCell dataKey="id" />
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
                            layout={['total', '-', 'limit', '|', 'pager', 'skip']}
                            total={fakeData.length}
                            limitOptions={[10, 20]}
                            limit={limit}
                            activePage={page}
                            onChangePage={setPage}
                            onChangeLimit={handleChangeLimit}
                        />
                    </div>
                </Panel>
            </Container>

        </FullWidthLayout >
    );
};
Demo.auth = {}
export default Demo