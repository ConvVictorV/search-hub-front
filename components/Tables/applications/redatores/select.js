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

const { HeaderCell, Cell, Column } = Table;
const rowKey = "idwriter";

// custom cells


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
          <h4>Detalhes do Redator</h4>
        </div>
      </div>
      <div id="expandable-body">
        <div className="expandable-col" style={{
          maxHeight: 400
        }}>
          <h5>Dados Pessoais</h5>
          <strong>Área de Formação:</strong>{rowData.dseducation}<br></br>
          <strong>Portfólio</strong> {rowData.dsportfolio}
        </div>
        <div className="expandable-col" style={{
          maxHeight: 400
        }}>
          <h5>Tipos de textos</h5>
          <strong>Categorias:</strong>
          <ul>
            {rowData.dscontentcategory == null
              ? <li key={1}>Campo vazio</li>
              : (rowData.dscontentcategory || "")
                .map(
                  (row, index) =>
                    row && <li key={index}>{row?.trim() || ""}</li>
                )}
          </ul>
          <strong>Tipos de Texto:</strong>
          <ul>
            {rowData.dscontenttype == null
              ? <li key={1}>Tipos de Conteúdo</li>
              : (rowData.dscontenttype || "")
                .map(
                  (row, index) =>
                    row && <li key={index}>{row?.trim() || ""}</li>
                )}
          </ul>
          <strong>Tipos de Página:</strong>
          <ul>
            {rowData.dspagetypes == null
              ? <li key={1}>Tipos de Páginas</li>
              : (rowData.dspagetypes || "")
                .map(
                  (row, index) =>
                    row && <li key={index}>{row?.trim() || ""}</li>
                )}
          </ul>
        </div>
        <div className="expandable-col" style={{
          maxHeight: 400
        }}>
          <h5>Dados Pagamento</h5>
          <strong>Disponibilidade de Trabalho:</strong>{rowData.dsworkavaiable}<br></br>
          <strong>Tipo de Pagamento</strong> {rowData.dspaymenttype}
        </div>
      </div>
    </div>
  );
};

const TagsCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      {rowData[dataKey].map((v, index) => <Tag key={index}>{v}</Tag>)}
    </Cell>
  );
}
const AvailabilityCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group">
      {rowData.dtnextavailability.split('T')[0]}
    </Cell>
  );
}
const RadioButtonCell = ({ rowData, dataKey, ...props }) => {
  return (
    <Cell {...props} className="link-group" style={{ marginTop: "-8px", pointerEvents: 'none' }}>
      <Radio checked={rowData.selected} />
    </Cell>
  );
}
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

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}


const WordTable = ({
  tableData,
  setSearch,
  headerMenu,
  filterActive,
  setFilterData,
  filterData,
  setWriter,
  setTableData,
  dataBkp
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
      { value: "idwriter", label: "Id Redator" },
      { value: "dsname", label: "Nome" },
      { value: "dsemail", label: "E-mail" },
      { value: "dseducation", label: "Área de Formação" },
      { value: "dsportfolio", label: "Portfólio" },
      { value: "nbwordsavaiable", label: "Disponibilidade de Palavras" },
      { value: "dsworkavaiable", label: "Disponibilidade de Trabalho" },
      { value: "dscontenttype", label: "Tipos de Conteúdo" },
      { value: "dscontentcategory", label: "Categorias de Conteúdo" },
      { value: "dspagetypes", label: "Tipos de Páginas" },
      { value: "dsclientes", label: "Clientes que atende" },
      { value: "dspaymenttype", label: "Tipo de Pagamento" },
      { value: "dsvalue", label: "Valor cobrado por 50 palavras" },
      { value: "dsstatus", label: "Status" },
      { value: "dtcreate", label: "Data de entrada" },
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
      <Stack wrap spacing={24} alignItems={"center"}>
        <InputGroup
          inside
          style={{
            outlineStyle: "none",
            boxShadow: "none",
            borderColor: "transparent",
            margin: '20px'
          }}
        >
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
          <input
            className="rs-input"
            type="text"
            onChange={(e) => {
              const { value } = e.target
              if(value.length == 0) setTableData(dataBkp)
              else{
                setTableData(dataBkp.filter(row =>
                  (row.dsname.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")).indexOf(value.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")) > -1
                ))
              }
              
            }}
            placeholder={`Buscar pelo nome do redator`}
            style={{
              width: "250px",
              border: "none!important",
              outlineStyle: "none",
              boxShadow: "none",
              borderColor: "transparent",
              borderLeft: "solid 3px var(--color-conversion-1)",
              background: "var(--rs-btn-subtle-hover-bg)",
            }}
          />
        </InputGroup>
        <InputGroup
          inside
          style={{
            outlineStyle: "none",
            boxShadow: "none",
            borderColor: "transparent",
            margin: '20px'
          }}
        >
          <InputGroup.Addon>
            <SearchIcon />
          </InputGroup.Addon>
          <input
            className="rs-input"
            type="text"
            onChange={(e) => {
              const { value } = e.target
              if(value.length == 0) setTableData(dataBkp)
              else{
                setTableData(dataBkp.filter(row =>
                  (row.dscontentcategory.toString().toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")).indexOf(value.toLowerCase().replace(/ /g, '-').replace(/\(/g, '').replace(/\)/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "")) > -1
                ))
              }
              
            }}
            placeholder={`Buscar por categoria`}
            style={{
              width: "250px",
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
      {/* <hr /> */}
      <Table
        virtualized
        autoHeight
        expandedRowKeys={expandedRowKeys}
        onRowClick={(data) => {
          tableData.map((row, index) => {
            tableData[index].selected = false
          })
          tableData[tableData.map((row, index) => row.idwriter == data.idwriter && index).filter(row => row)[0] || 0].selected = true
          setWriter(data)
        }}
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
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="idwriter"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>
        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <RadioButtonCell dataKey="selected" />
        </Column>
        <Column sortable width={150} flexGrow={1} fixed>
          <HeaderCell>Nome</HeaderCell>
          <Cell dataKey="dsname" />
        </Column>
        <Column sortable width={250} resizable align="center">
          <HeaderCell>Categoria de conteúdo</HeaderCell>
          <TagsCell dataKey="dscontentcategory" />
        </Column>
        <Column sortable width={250} resizable align="center">
          <HeaderCell>Tipos de conteúdo</HeaderCell>
          <TagsCell dataKey="dscontenttype" />
        </Column>
        <Column sortable width={150} resizable align="center">
          <HeaderCell>Disponibilidade</HeaderCell>
          <Cell dataKey="dsavailability" />
        </Column>
        <Column sortable width={150} resizable align="center">
          <HeaderCell>Disponível a partir de</HeaderCell>
          <AvailabilityCell dataKey="dtnextavailability" />
        </Column>
        <Column sortable width={150} resizable align="center">
          <HeaderCell>Valor cobrado (500 palavras)</HeaderCell>
          <Cell dataKey="dsvalue" />
        </Column>

        <Column sortable width={250} resizable align="center">
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
