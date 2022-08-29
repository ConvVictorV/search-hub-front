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

import SearchIcon from "@rsuite/icons/Search";

const { HeaderCell, Cell, Column } = Table;

import EditIcon from "@rsuite/icons/Edit";
import Select from "../../../Form/Components/Select";

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
  const { dsreport } = rowData;
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        {(dsreport && (
          <Button
            appearance="ghost"
            style={{
              color: "var(--color-conversion-7)",
              borderColor: "var(--color-conversion-7)",
            }}
          >
            <Badge style={{ background: "var(--color-conversion-7)" }} />{" "}
            {"sim"}
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
            {"não"}
          </Button>
        )}
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

const TableProjects = ({
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

  useEffect(() => {
    if (tableData.length > 0) setLoading(false);
  }, [tableData]);
  const filterSquadById = (id) => {
    id
      ? setFilterData({
          filter: {
            idsquad: id,
          },
        }) && setPage(1)
      : setFilterData();
  };
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
      return tableData.sort((t, b) => {
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
      }).filter((v, i) => {
        const start = limit * (page - 1);
        const end = start + limit;
        return i >= start && i < end;
      });
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
              placeholder={`Buscar (${tableData.length + " Projetos"})`}
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
        <Column sortable resizable width={75} align="center" fixed>
          <HeaderCell>Id Cliente</HeaderCell>
          <Cell dataKey="idcustomer" />
        </Column>
        <Column sortable resizable width={75} align="center" fixed>
          <HeaderCell>Id Projeto</HeaderCell>
          <Cell dataKey="idproject" />
        </Column>
        <Column sortable resizable width={150} fixed flexGrow={1}>
          <HeaderCell>Url do Site</HeaderCell>
          <Cell dataKey="dsurlsite" />
        </Column>

        <Column sortable resizable width={50}>
          <HeaderCell>Tipo do Site</HeaderCell>
          <Cell dataKey="dstype" />
        </Column>
        <Column sortable width={90}>
          <HeaderCell>Conta GSC</HeaderCell>
          <Cell dataKey="dsaccountgsc" />
        </Column>
        <Column sortable width={100}>
          <HeaderCell>Sitename GSC</HeaderCell>
          <Cell dataKey="dssitenamegsc" />
        </Column>
        <Column sortable width={100}>
          <HeaderCell>Id GA</HeaderCell>
          <Cell dataKey="nrviewIdga" />
        </Column>
        <Column sortable resizable width={100}>
          <HeaderCell>Report</HeaderCell>
          <StatusCell dataKey="dsreport" />
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

export default TableProjects;
