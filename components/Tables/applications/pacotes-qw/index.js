import React, { useEffect } from "react";
import {
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
  useToaster,
  Whisper,
  Badge
} from "rsuite";

import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";
import LinkIcon from "@rsuite/icons/legacy/ExternalLink";
import Select from "../../../../components/Form/Components/Select";

const { HeaderCell, Cell, Column } = Table;

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

const StatusCell = ({ rowData, dataKey, ...props }) => {
  const { dsstatus } = rowData;
  let color = "var(--color-conversion-1)"
  switch (dsstatus) {
    case 'Planejamento de Termo':
      color = "var(--color-conversion-8)"
      break;
    case 'Planejamento de Pauta':
      color = "var(--color-conversion-8)"
      break;
    case 'Enviado para Conteúdo':
      color = "var(--color-conversion-10)"
      break;
    case 'Conteúdo em produção':
      color = "var(--color-conversion-9)"
      break;
    case 'Conteúdo em revisão':
      color = "var(--color-conversion-2)"
      break;
    case 'Validação SEO':
      color = "var(--color-conversion-2)"
      break;
    case 'Envio ao cliente':
      color = "var(--color-conversion-5)"
      break;
    case 'Pedido de Ajustes':
      color = "var(--color-conversion-3)"
      break;
    case 'Aprovado pelo cliente':
      color = "var(--color-conversion-7)"
      break;
    case 'Implementado':
      color = "var(--color-conversion-7)"
      break;
    case 'Finalizado':
      color = "var(--color-conversion-7)"
      break;
    case 'Pausado':
      color = "var(--color-conversion-5)"
      break;
    case 'Cancelado':
      color = "var(--color-conversion-4)"
      break;
  }
  return (
    <Cell {...props} className="link-group">
      <div style={{ marginTop: "-8px" }}>
        {(dsstatus !== undefined && (
          <Button
            appearance="ghost"
            style={{
              color: color,
              borderColor: color,
              width: "100%",
            }}
          >
            <Badge style={{ background: color }} />{" "}
            {dsstatus}
          </Button>
        )) || (
            <Button
              appearance="ghost"
              style={{
                color: color,
                borderColor: color,
                width: "100%",
              }}
            >
              <Badge style={{ background: color }} />{" "}
              {"inativo"}
            </Button>
          )}
      </div>
    </Cell>
  );
};
const LinkCell = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props}>
    <a
      style={{
        color: "var(--rs-text-link-hover)",
        textDecoration: "underline",
      }}
      href={'/applications/fluxo-quickwin/package/' + rowData?.dskey}
      target={"_blank"}
      rel="noopener noreferrer"
    >
      <LinkIcon
        style={{
          marginLeft: "5px",
        }}
      />
    </a>
  </Cell>
);
const Month = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
  <Cell {...props}>{rowData?.dsmounthyear?.split("-")[0]}, {rowData?.dsmounthyear?.split("-")[1]}</Cell>
);
const SendCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      {rowData.dtsendcontent?.split('T')[0]}
      {/*  && new Date(rowData.dtsendcontent?.split('T')[0]). to locale string */}
    </Cell>
  );
}
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

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

  const toaster = useToaster();
  let checked = false;
  let indeterminate = false;
  const filterStatus = (status) => {
    if (status) {
      let data = filterData.filter(filter => filter.indexOf('dsstatus') == -1)
      setFilterData(data.concat(["dsstatus|is|" + status])) && setPage(1)
    } else {
      let data = filterData.filter(filter => filter.indexOf('dsstatus') == -1)
      setFilterData(data) && setPage(1)
    }
  };
  const filterSquad = (squad) => {
    if (squad && squad !== "") {
      let data = filterData.filter(filter => filter.indexOf('dssquadid') == -1)
      setFilterData(data.concat(["dssquadid|is|" + squad])) && setPage(1)
    } else {
      let data = filterData.filter(filter => filter.indexOf('dssquadid') == -1)
      setFilterData(data) && setPage(1)
    }
  };
  useEffect(() => {
    if (tableData?.length > 0) setLoading(false);
    setTimeout(() => {
      setLoading(false);
    }, 5000)
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

  if (checkedKeys.length === data.length) {
    checked = true;
  } else if (checkedKeys.length === 0) {
    checked = false;
  } else if (checkedKeys.length > 0 && checkedKeys.length < data.length) {
    indeterminate = true;
  }

  const handleCheckAll = (value, checked) => {
    const keys = checked ? data.map((item) => item.idqwpackage) : [];
    setCheckedKeys(keys);
  };

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

  //Configurações do filtro
  const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    const manualKeys = [
      { value: "nmcustomer", label: "Cliente" },
      { value: "dsmounthyear", label: "Mês de referência" },
      { value: "dsmounthyear", label: "Ano" },
      { value: "dsstatus", label: "Status" },
      { value: "dsresponsible", label: "Responsável" },
    ];
    const keys = Object.keys(tableData[0] || {});
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
              placeholder={`Buscar (${tableData.length + " Pacotes"})`}
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
          <Select
            fetch={"/api/get/quickWinStatus"}
            placeholder={'Status'}
            onSelect={filterStatus}
            style={{
              width: 100
            }}
          />
          <Select
            fetch={"/api/get/select/squadsId"}
            placeholder={'Squad'}
            onSelect={filterSquad}
            style={{
              width: 100
            }}
          />
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
        data={getData().length == 0 ? [] : getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        cellBordered
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
            dataKey="idqwpackage"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>
        <Column width={75} align="center">
          <HeaderCell>Visualizar</HeaderCell>
          <LinkCell dataKey="idqwpackage" />
        </Column>
        <Column sortable width={150} flexGrow={1} fixed>
          <HeaderCell>Cliente</HeaderCell>
          <Cell dataKey="nmcustomer" />
        </Column>
        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Mês de referência</HeaderCell>
          <Month dataKey="dsmounthyear" />
        </Column>
        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Squad</HeaderCell>
          <Cell dataKey="dssquad" />
        </Column>
        <Column sortable width={150} flexGrow={1} fixed>
          <HeaderCell>Analista SEO</HeaderCell>
          <Cell dataKey="dsresponsible" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>QuickWins</HeaderCell>
          <Cell dataKey="nbtotalqws" />
        </Column>
        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Palavras</HeaderCell>
          <Cell dataKey="nbtotalkeywords" />
        </Column>
        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Entrega Planejamento</HeaderCell>
          <SendCell dataKey="dtsendcontent" />
        </Column>
        <Column sortable width={250} flexGrow={1} align="center">
          <HeaderCell>Status</HeaderCell>
          <StatusCell dataKey="status" />
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
