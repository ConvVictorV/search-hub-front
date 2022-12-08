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

import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";
import LinkIcon from "@rsuite/icons/legacy/ExternalLink";
import EditIcon from "@rsuite/icons/Edit";


const { HeaderCell, Cell, Column } = Table;
const rowKey = "idtextrequest";

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
    return (
      <div id="expandable">
        <div id="expandable-header">
          <div className="expandable-header-text">
            <h4>Detalhes do Pedido</h4>
          </div>
        </div>
        <div id="expandable-body">
          <div className="expandable-col"  style={{
            maxHeight:400
          }}>
            <strong>Tipo de conteúdo</strong><br></br>{rowData.dscontenttype}<br></br>
          </div>
          <div className="expandable-col"  style={{
            maxHeight:400
          }}>
            <strong>Total de palavras</strong><br></br>{rowData.nbtotalkeywords}<br></br>
          </div>
          <div className="expandable-col"  style={{
            maxHeight:400
          }}>
            <strong>Total de Quick Wins</strong><br></br>{rowData.nbtotalqws}<br></br>
          </div>
          <div className="expandable-col"  style={{
            maxHeight:400
          }}>
            <strong>Analista Conteúdo responsável<br></br></strong>{rowData.dsresponsible}<br></br>
          </div>
        </div>
      </div>
    );
  };

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
      href={'/applications/fluxo-quickwin/package/'+rowData?.dskey}
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
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const DateEntrance = ({ rowData, onChange, checkedKeys, dataKey, ...props }) => (
    <Cell {...props}>{rowData?.dtdeadline?.split("T")[0]}</Cell>
  );

const WordTable = ({
  setDrawerOpenEdit,
  tableData,
  setSearch,
  headerMenu,
  checkedKeys,
  setCheckedKeys,
  filterActive,
  setRowData,
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
    if (tableData?.length > 0) setLoading(false);
    setTimeout(()=>{
      setLoading(false);
    },5000)
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
    const keys = checked ? data.map((item) => item.idworkedpage) : [];
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

  //Configurações do filtro
  const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    const manualKeys = [
        { value: "idtextrequest", label: "Código"}, 
        { value: "dsvalue", label: "Valor do pedido"}, 
        { value: "dtdeadline", label: "Prazo de entrega"}, 
        { value: "fkwriter", label: "Redator"}, 
        { value: "dsstatus", label: "Status do pedido"}, 
        { value: "nbtotalkeywords", label: "Total de palavras"}, 
        { value: "nbtotalqws", label: "Total de Quick Wins"}, 
        { value: "dsresponsible", label: "Analista Conteúdo responsável"}, 
        { value: "fkidquickwin", label: "id qw"}, 
        { value: "dscontenttype", label: "Tipo de conteúdo"}, 
        { value: "idcustomer", label: "Cliente"},
        { value: "dsmonth", label: "Mês de referência"}
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
              placeholder={`Buscar (${tableData.length + " Pedido de Produção"})`}
              style={{
                width: "500px",
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
        data={getData().length == 0 ? [] : getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        cellBordered
        rowExpandedHeight={400}
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
            dataKey="idtextrequest"
            checkedKeys={checkedKeys}
            onChange={handleCheck}
          />
        </Column>
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="idtextrequest"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>
        
        <Column sortable width={150} flexGrow={1} fixed>
          <HeaderCell>Código</HeaderCell>
          <Cell dataKey="idtextrequest" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Cliente</HeaderCell>
          <Cell dataKey="nmcustomer" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Mês de referência</HeaderCell>
          <Cell dataKey="dsmonth" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Valor do pedido</HeaderCell>
          <Cell dataKey="dsvalue" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Prazo de entrega</HeaderCell>
          <DateEntrance dataKey="dtdeadline" />
        </Column>

        <Column sortable width={150} flexGrow={1} align="center">
          <HeaderCell>Redator</HeaderCell>
          <Cell dataKey="fkwriter" />
        </Column>

        <Column sortable width={250} flexGrow={1} align="center">
          <HeaderCell>Status</HeaderCell>
          <StatusCell dataKey="dsstatus" />
        </Column>
        
        <Column width={50} verticalAlign={"top"} align="center">
          <HeaderCell>...</HeaderCell>
          <ActionCell
            setDrawerOpenEdit={setDrawerOpenEdit}
            setRowData={setRowData}
            dataKey="idtextrequest"
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

export default WordTable;
