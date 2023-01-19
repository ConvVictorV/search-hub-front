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
              width: "100%",
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
              width: "100%",
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
const MensalStatusCell = ({ rowData, dataKey, ...props }) => {
  const { dsmensalreport } = rowData;
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        {(dsmensalreport && (
          <Button
            appearance="ghost"
            style={{
              color: "var(--color-conversion-7)",
              borderColor: "var(--color-conversion-7)",
              width: "100%",
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
              width: "100%",
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
    setTimeout(()=>{
      setLoading(false);
    },10000)
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
      return tableData
        .sort((t, b) => {
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
        .filter((v, i) => {
          const start = limit * (page - 1);
          const end = start + limit;
          return i >= start && i < end;
        });
    }
    return data;
  };
  return (
    <Panel className="nopadding">
      <Stack alignItems={"center"} justifyContent={"space-between"}>
        <Stack wrap spacing={24} alignItems={"center"}>
          <InputGroup
            inside
            style={{
              outlineStyle: "none",
              boxShadow: "none",
              borderColor: "transparent",
            }}
          >
            <InputGroup.Addon>
              <SearchIcon />
            </InputGroup.Addon>
            <input
              className="rs-input"
              type="text"
              onChange={(event) => setSearch(event.target.value)}
              placeholder={`Buscar (${tableData.length + " Squads"})`}
              style={{
                width: "300px",
                border: "none!important",
                outlineStyle: "none",
                boxShadow: "none",
                borderColor: "transparent",
                borderLeft: "solid 3px var(--color-conversion-1)",
                background: "var(--rs-btn-subtle-hover-bg)",
              }}
            />
          </InputGroup>
          {/* <Select
            fetch="/api/get/select/squadsId"
            placeholder="Filtre por squad"
            onSelect={filterSquadById}
            style={{
              width: "150px",
            }}
          /> */}
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
        cellBordered
        bordered
      >
        <Column sortable resizable width={75} align="center" fixed>
          <HeaderCell>#</HeaderCell>
          <Cell dataKey="idsquad" />
        </Column>
        <Column sortable width={150} fixed flexGrow={1}>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="dsname" />
        </Column>

        <Column sortable width={150} flexGrow={1}>
          <HeaderCell>Email</HeaderCell>
          <Cell dataKey="dsemail" />
        </Column>
        <Column sortable width={90} flexGrow={1}>
          <HeaderCell>Email do PO</HeaderCell>
          <Cell dataKey="dspoemail" />
        </Column>
        <Column sortable width={90} resizable>
          <HeaderCell>Status</HeaderCell>
          <StatusCell dataKey="blstatus" />
        </Column>
        <Column width={50} verticalAlign={"top"} align="center">
          <HeaderCell>...</HeaderCell>
          <ActionCell
            setDrawerOpenEdit={setDrawerOpenEdit}
            setRowData={setRowData}
            dataKey="idsquad"
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
