import React, { useEffect } from "react";
import {
  Badge,
  Button,
  IconButton,
  InputGroup,
  Pagination,
  Panel,
  Stack,
  Table,
} from "rsuite";

import EditIcon from "@rsuite/icons/Edit";
import SearchIcon from "@rsuite/icons/Search";
import Select from "../../Form/Components/Select";

const { HeaderCell, Cell, Column } = Table;

// custom cells
const ActionCell = ({
  setDrawerOpenEdit,
  rowData,
  dataKey,
  setRowData,
  ...props
}) => {
  function handleAction() {
    setRowData(rowData);
    setDrawerOpenEdit(true);
  }
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        <IconButton
          appearance="primary"
          style={{
            background: "var(--color-conversion-1)",
          }}
          onClick={handleAction}
          icon={<EditIcon />}
        />
      </div>
    </Cell>
  );
};
const StatusCell = ({ rowData, dataKey, ...props }) => {
  const { blstatus } = rowData;
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        {(blstatus && (
          <Button
            appearance="ghost"
            style={{
              color: "var(--color-conversion-7)",
              borderColor: "var(--color-conversion-7)",
            }}
          >
            <Badge style={{ background: "var(--color-conversion-7)" }} />{" "}
            {"ativo"}
          </Button>
        )) || (
          <Button
            appearance="ghost"
            style={{
              color: "var(--color-conversion-4)",
              borderColor: "var(--color-conversion-4)",
            }}
          >
            <Badge style={{ background: "var(--color-conversion-4)" }} />{" "}
            {"inativo"}
          </Button>
        )}
      </div>
    </Cell>
  );
};
const EmailCell = ({ rowData, dataKey, ...props }) => {
  const { dsclientemail } = rowData;
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        {dsclientemail
          ? dsclientemail.split(",").map((email, key) => (
              <Button key={key} appearance="subtle" style={{}}>
                {email}
              </Button>
            ))
          : ""}
      </div>
    </Cell>
  );
};
const NmCustomer = ({ rowData, dataKey, ...props }) => {
  const { nmcustomer } = rowData;
  return (
    <Cell {...props} className="link-group">
      {(nmcustomer && capitalizeFirstLetter(nmcustomer)) || "false"}
    </Cell>
  );
};
//

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const TableCustomers = ({
  setDrawerOpenEdit,
  tableData,
  setSearch,
  headerMenu,
  setRowData,
  setFilterData,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();

  const filterSquadById = (id) => {
    id
      ? setFilterData({
          filter: {
            idsquad: id,
          },
        }) && setPage(1)
      : setFilterData();
  };
  useEffect(() => {
    if (tableData) setLoading(false);
  }, []);

  const handleChangeLimit = (dataKey) => {
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
    return typeof tableData == "object"
      ? arrayData.filter((v, i) => {
          const start = limit * (page - 1);
          const end = start + limit;
          return i >= start && i < end;
        })
      : [];
  };
  const data =
    typeof tableData == "object"
      ? tableData.filter((v, i) => {
          const start = limit * (page - 1);
          const end = start + limit;
          return i >= start && i < end;
        })
      : [];

  const getData = () => {
    if (sortColumn && sortType) {
      return setPageData(
        tableData.sort((t, b) => {
          let topRow = t[sortColumn];
          let bottomRow = b[sortColumn];
          if (new Date(topRow) != "Invalid Date") {
            //date column
            return sortType === "asc"
              ? new Date(topRow).getTime() - new Date(bottomRow).getTime()
              : new Date(bottomRow).getTime() - new Date(topRow).getTime();
          } else if (!isNaN(parseInt(topRow))) {
            // number column
            return sortType === "asc" ? topRow - bottomRow : bottomRow - topRow;
          } else {
            topRow = topRow?.trim().toUpperCase() || "z";
            bottomRow = bottomRow?.trim().toUpperCase() || "z";

            // string column
            return sortType === "asc"
              ? topRow.localeCompare(bottomRow)
              : bottomRow?.localeCompare(topRow);
          }
        })
      );
    }
    return data;
  };

  return (
    <Panel
      bordered
      style={{ backgroundColor: "var(--rs-bg-card)", padding: "0px" }}
      shaded
    >
      <Stack alignItems={"center"} justifyContent={"space-between"}>
        <Stack wrap spacing={24} alignItems={"center"}>
          <InputGroup inside>
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
            <input
              className="rs-input"
              type="text"
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Buscar (${tableData.length + " Clientes"})`}
              style={{
                width: "300px",
              }}
            />
          </InputGroup>
          <Select
            fetch="/api/get/select/squadsId"
            placeholder="Filtre por squad"
            onSelect={filterSquadById}
            style={{
              width: "150px",
            }}
          />
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

        <Column sortable resizable width={200}>
          <HeaderCell>Squad</HeaderCell>
          <Cell dataKey="dsname" />
        </Column>
        <Column sortable width={200} flexGrow={1}>
          <HeaderCell>Email</HeaderCell>
          <EmailCell dataKey="dsclientemail" />
        </Column>
        <Column sortable width={200} flexGrow={1}>
          <HeaderCell>Dominio</HeaderCell>
          <Cell dataKey="dsdomain" />
        </Column>
        <Column width={50} verticalAlign={"top"} align="center">
          <HeaderCell>Editar</HeaderCell>
          <ActionCell
            setDrawerOpenEdit={setDrawerOpenEdit}
            setRowData={setRowData}
            dataKey="idcustomer"
          />
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
          layout={["-", "limit", "|", "pager", "skip"]}
          limitOptions={[10, 50, 100]}
          limit={limit}
          activePage={page}
          onChangePage={setPage}
          onChangeLimit={handleChangeLimit}
        />
      </div>
    </Panel>
  );
};

export default TableCustomers;
