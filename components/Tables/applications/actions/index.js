import React, { useEffect } from "react";
import {
  Avatar,
  Button,
  ButtonToolbar,
  Checkbox,
  Dropdown,
  IconButton,
  Input,
  InputGroup,
  Notification,
  Pagination,
  Panel,
  Popover,
  Radio,
  RadioGroup,
  Stack,
  Table,
  Tag,
  TagGroup,
  Tooltip,
  useToaster,
  Whisper,
} from "rsuite";

import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import LinkIcon from "@rsuite/icons/legacy/ExternalLink";
import UserIcon from "@rsuite/icons/legacy/User";
import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";

const { HeaderCell, Cell, Column } = Table;
const rowKey = "id";

// custom cells
const CheckCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props} style={{ padding: 0 }}>
    <div style={{ lineHeight: "46px" }}>
      <Checkbox
        value={rowData[dataKey]}
        inline
        onChange={onChange}
        checked={checkedKeys.some((item) => item === rowData[dataKey])}
      />
    </div>
  </Cell>
);

const LinkCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props}>
    <a
      style={{
        color: "var(--rs-text-link-hover)",
        textDecoration: "underline",
      }}
      href={rowData?.link || ""}
      target={"_blank"}
      rel="noopener noreferrer"
    >
      {rowData?.key || ""}
      <LinkIcon
        style={{
          marginLeft: "5px",
        }}
      />
    </a>
  </Cell>
);

const AssigneeCell = ({
  rowData,
  onChange,
  checkedKeys,
  dataKey,
  ...props
}) => (
  <Cell {...props} style={{ padding: 0, paddingTop: 5 }}>
    <Whisper
      placement="top"
      speaker={
        rowData.assigneeName ? (
          <Tooltip>{rowData.assigneeName || ""}</Tooltip>
        ) : (
          <div></div>
        )
      }
    >
      <Avatar
        size="md"
        style={{ maxWidth: "35px", maxHeight: "35px" }}
        circle
        src={rowData.assigneeImage || null}
      >
        <UserIcon />
      </Avatar>
    </Whisper>
  </Cell>
);
const ExpandCell = ({
  rowData,
  dataKey,
  expandedRowKeys,
  onChange,
  ...props
}) => (
  <Cell {...props} style={{ padding: 5 }}>
    <IconButton
      appearance="subtle"
      onClick={() => {
        onChange(rowData);
      }}
      icon={
        expandedRowKeys.some((key) => key === rowData[rowKey]) ? (
          <CollaspedOutlineIcon
            style={{ color: "var(--color-conversion-1)" }}
          />
        ) : (
          <ExpandOutlineIcon />
        )
      }
    />
  </Cell>
);
const renderRowExpanded = (rowData) => {
  const imgUrl =
    rowData.assigneeImage ||
    "https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/622a540615521d00726eea42/36790f2b-0803-4269-9524-430c9bdb75148/32";

  return (
    <div id="expandable">
      <div id="expandable-header">
        <Avatar
          circle
          size={"lg"}
          style={{
            backgroundColor: "transparent",
          }}
          src={imgUrl.substring(0, imgUrl.length - 2) + "64"}
        />
        <div className="expandable-header-text">
          <p>{rowData.assigneeName || "Sem responsável"}</p>
          <h4>{rowData.summary}</h4>
        </div>
      </div>
      <div id="expandable-body">
        <div className="expandable-col">
          <h4>Urls Trabalhadas</h4>
          <ol>
            {rowData.urls == null
              ? <li key={1}>Campo vazio</li>
              : (rowData.urls || "").split(",").length == 1
              ? (rowData.urls || "").split("\n").map((row, index) =>
                  row == "\n" || row == "" ? (
                    ""
                  ) : (
                    <li key={index}>
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={row?.trim() || "#"}
                      >
                        {row?.trim() || ""}
                      </a>
                    </li>
                  )
                )
              : (rowData.urls || "").split(",").map((row, index) =>
                  row == "\n" || row == "" ? (
                    ""
                  ) : (
                    <li key={index}>
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={row?.trim() || "#"}
                      >
                        {row?.trim() || ""}
                      </a>
                    </li>
                  )
                )}
          </ol>
        </div>
        <div className="expandable-col">
          <h4>Palavras-chave</h4>
          <ol>
            {rowData.palavras == null
              ? <li key={1}>Campo vazio</li>
              : (rowData.palavras || "")
                  .split(",")
                  .map(
                    (row, index) =>
                      row && <li key={index}>{row?.trim() || ""}</li>
                  )}
          </ol>
        </div>
        <div className="expandable-col">
          <h4>Arquivos envolvidos</h4>
          <ol>
            {rowData.arquivos == null
              ? <li key={1}>Campo vazio</li>
              : (rowData.arquivos || "").split(",").length == 1
              ? (rowData.arquivos || "").split("\n").map((row, index) =>
                  row == "\n" || row == "" ? (
                    ""
                  ) : (
                    <li key={index}>
                      <a
                        key={index}
                        target="_blank"
                        rel="noopener noreferrer"
                        href={row
                          .split(" ")
                          .map((word) => {
                            return word.indexOf("http") > -1 ? word : "";
                          })
                          .toString()
                          .replace(/,/g, "")}
                      >
                        {row.split(" ").length == 1
                          ? row
                          : row.split(" ").map((word) => {
                              return word.indexOf("http") == -1
                                ? (word + " ").replace(":", "")
                                : "";
                            })}
                      </a>
                    </li>
                  )
                )
              : (rowData.arquivos || "").split(",").map((row, index) => (
                  <li key={index}>
                    <a
                      key={index}
                      target="_blank"
                      rel="noopener noreferrer"
                      href={row?.trim() || "#"}
                    >
                      {row?.trim() || ""}
                    </a>
                  </li>
                ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

const WordTable = ({
  tableData,
  setSearch,
  headerMenu,
  checkedKeys,
  setCheckedKeys,
  filterActive,
  setFilterData,
  filterData,
}) => {
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);

  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
  };

  const toaster = useToaster();
  let checked = false;
  let indeterminate = false;

  useEffect(() => {
    if (tableData.length > 0) {
      setLoading(false);
    }
  }, [tableData]);

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
  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.id) : [];
    setCheckedKeys(keys);
  };
  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }
  const handleCheck = (value, checked) => {
    const keys = checked
      ? [...checkedKeys, value]
      : checkedKeys.filter((item) => item !== value);
    setCheckedKeys(keys);
  };
  const getMessage = (key) => {
    let type = "";
    let value = "";
    return (
      <Notification header={"Adicionar filtro"} type="info" duration={0}>
        A coluna <b>{key}</b>
        <RadioGroup name="filterType" onChange={(t) => (type = t)}>
          <Radio value="is">é igual à</Radio>
          <Radio value="is not">é diferente de</Radio>
          <Radio value="contains">contém</Radio>
        </RadioGroup>
        <Input placeholder="Valor" onChange={(v) => (value = v)} />
        <hr />
        <ButtonToolbar>
          <Button
            appearance="default"
            onClick={() => {
              toaster.clear();
            }}
          >
            Cancelar
          </Button>
          <Button
            appearance="primary"
            style={{
              background: "var(--color-conversion-1)",
            }}
            onClick={() => {
              toaster.clear();
              if (key == "" || type == "" || value == "") return;
              const nextTags =
                [...filterData, `${key}|${type}|${value}`] || filterData;
              setFilterData(nextTags);
            }}
          >
            Aplicar
          </Button>
        </ButtonToolbar>
      </Notification>
    );
  };

  const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    //format: {"value":"","label":""}
    const keys = Object.keys(tableData[0] || {});
    const manualKeys = [
      { value: "id", label: "Id" },
      { value: "key", label: "Key da task" },
      { value: "link", label: "Link da task" },
      { value: "summary", label: "Titulo" },
      { value: "statusDate", label: "Data de implementação" },
      { value: "resolutiondate", label: "Data de finalização da task" },
      { value: "project", label: "Projeto" },
      { value: "urls", label: "Urls trabalhadas" },
      { value: "arquivos", label: "Arquivos utilizados" },
      { value: "assigneeName", label: "Responsável" },
      { value: "palavras", label: "Palavras-chave" },
      { value: "status", label: "Status de implementação" },
    ];

    const handleSelect = (eventKey) => {
      onClose();
      const message = getMessage(manualKeys[eventKey].value);
      toaster.push(message, { placement: "topEnd" });
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          {manualKeys.map((key, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index}>
                {key.label}
              </Dropdown.Item>
            );
          })}
        </Dropdown.Menu>
      </Popover>
    );
  };
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
  const removeTag = (tag) => {
    const nextTags = filterData.filter((item) => item !== tag);
    setFilterData(nextTags);
  };

  const renderFilters = () => {
    return (
      <TagGroup>
        {filterData.map((tag, index) => (
          <Tag key={index} closable onClose={() => removeTag(tag)}>
            <span style={{ textTransform: "capitalize" }}>
              {tag.split("|")[0]}
            </span>{" "}
            {tag.split("|")[1]} <span>{tag.split("|")[2]}</span>
          </Tag>
        ))}
      </TagGroup>
    );
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
              placeholder={`Buscar (${tableData.length + " Ações"})`}
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
        </Stack>
        {headerMenu}
      </Stack>
      {filterActive ? (
        <Stack
          alignItems={"flex-start"}
          style={{
            paddingBottom: "6px",
          }}
        >
          <Whisper
            trigger="click"
            placement="bottomStart"
            speaker={renderSpeaker}
          >
            <IconButton
              size="xs"
              icon={<PlusIcon />}
              style={{
                marginRight: "6px",
                background: "var(--color-conversion-1)",
                color: "white",
              }}
            />
          </Whisper>
          {renderFilters()}
        </Stack>
      ) : (
        ""
      )}

      {/* <hr /> */}
      <Table
        virtualized
        autoHeight
        expandedRowKeys={expandedRowKeys}
        onRowClick={(data) => {}}
        shouldUpdateScroll={false}
        renderRowExpanded={renderRowExpanded}
        rowKey={rowKey}
        data={getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        cellBordered
        rowExpandedHeight={300}
        bordered
      >
        <Column width={50} align="center">
          <HeaderCell style={{ padding: 0 }}>
            <div style={{ lineHeight: "40px" }}>
              <Checkbox
                inline
                checked={checked}
                indeterminate={indeterminate}
                onChange={handleCheckAll}
              />
            </div>
          </HeaderCell>
          <CheckCell
            dataKey="id"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="id"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>
        <Column sortable resizable width={100} fixed align="center">
          <HeaderCell>Link</HeaderCell>
          <LinkCell dataKey="link" />
        </Column>
        <Column sortable width={200} flexGrow={1} align="center">
          <HeaderCell>Titulo</HeaderCell>
          <Cell dataKey="summary" />
        </Column>
        <Column sortable resizable width={200} align="center">
          <HeaderCell>Palavras-chave</HeaderCell>
          <Cell dataKey="palavras" />
        </Column>
        <Column sortable resizable width={150} align="center">
          <HeaderCell>Task finalizada em</HeaderCell>
          <Cell dataKey="resolutiondate" />
        </Column>
        <Column sortable resizable width={150} align="center">
          <HeaderCell>Implementado em</HeaderCell>
          <Cell dataKey="statusDate" />
        </Column>
        <Column sortable resizable width={150} align="center">
          <HeaderCell>Status</HeaderCell>
          <Cell dataKey="status" />
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

export default WordTable;
