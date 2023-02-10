import React, { useEffect, useState } from "react";
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
  Badge,
  Tooltip
} from "rsuite";

import PlusIcon from "@rsuite/icons/Plus";
import SearchIcon from "@rsuite/icons/Search";
import CollaspedOutlineIcon from "@rsuite/icons/CollaspedOutline";
import ExpandOutlineIcon from "@rsuite/icons/ExpandOutline";
import EditIcon from "@rsuite/icons/Edit";
import DocPassIcon from '@rsuite/icons/DocPass';
import axios from "axios";
import { Loader } from 'rsuite';
import Select from "../../../Form/Components/Select";
import Link from "next/link";

const { HeaderCell, Cell, Column } = Table;


const LinkCell = ({ rowData, onChange, dataKey, ...props }) => (
  <Cell {...props}>
    <a
      style={{
        color: "var(--rs-text-link-hover)",
        textDecoration: "underline",
      }}
      href={rowData?.dsurl || ""}
      target={"_blank"}
      rel="noopener noreferrer"
    >
      {rowData?.dsurl || ""}
    </a>
  </Cell>
);
const NmCustomer = ({ rowData, dataKey, ...props }) => {
  const { nmcustomer } = rowData;
  return (
    <Cell {...props} className="link-group">
      {(nmcustomer && capitalizeFirstLetter(nmcustomer)) || <Loader />}
    </Cell>
  );
};
const StatusCell = ({ rowData, dataKey, ...props }) => {
  const { dsstatus } = rowData;
  let color = "var(--color-conversion-1)"
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

const rowKey = "id";

const WordTable = ({
  tableData,
  setSearch,
  headerMenu,
  filterActive,
  setFilterData,
  filterData,
  setOpenEditForm,
  setRowData,
  setOpenCreateTextTopicForm
}) => {
  const [loading, setLoading] = React.useState(true);
  const [limit, setLimit] = React.useState(12);
  const [page, setPage] = React.useState(1);
  const [sortColumn, setSortColumn] = React.useState();
  const [sortType, setSortType] = React.useState();
  const [expandedRowKeys, setExpandedRowKeys] = React.useState([]);
  const [previousExpandedKeys, setPreviousExpandedKeys] = React.useState([]);
  const [refresh, setRefresh] = React.useState(0)


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
      // if (!previousExpandedKeys.includes(rowData.id)) {
      setTimeout(() => {
        setRefresh(refresh + 1)
      }, 2000)
      axios.get('/api/get/select/customersId').then(({ data }) => {
        data.filter((row, index) => {
          const idcustomer = row.value
          rowData.idcustomer == idcustomer && (rowData.customer = data[index].label)
        })
      })
      let data = previousExpandedKeys
      data.push(rowData.id)
      setPreviousExpandedKeys(data)
      axios.get('/api/get/textTopic/textTopic?idquickwin=' + rowData.id).then(({ data }) => {
        rowData.textTopic = data[0] || 'Sem pautas'
      }).catch(e => {
        console.log(e)
      })
      // }
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
  };

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
  const filterContent = (dscontent) => {
    if (dscontent) {
      let data = filterData.filter(filter => filter.indexOf('dscontent') == -1)
      setFilterData(data.concat(["dscontent|is|" + dscontent])) && setPage(1)
    } else {
      let data = filterData.filter(filter => filter.indexOf('dscontent') == -1)
      setFilterData(data) && setPage(1)
    }
  };
  const filterMonth = (month) => {
    if (month) {
      let data = filterData.filter(filter => filter.indexOf('dsmonth') == -1)
      setFilterData(data.concat(["dsmonth|is|" + month])) && setPage(1)
    } else {
      let data = filterData.filter(filter => filter.indexOf('dsmonth') == -1)
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

  const ActionCell = ({
    setOpenEditForm,
    setOpenCreateTextTopicForm,
    rowData,
    dataKey,
    setRowData,
    ...props
  }) => {
    function openEdit() {
      setRowData(rowData);
      setOpenEditForm(true);
    }
    async function openCreateTextTopic() {
      await axios.get('/api/get/textTopic/textTopic?idquickwin=' + rowData.id).then(({ data }) => {
        rowData.textTopic = data[0] || undefined
      }).catch(e => {
        console.log(e)
      })
      setRowData(rowData);
      setOpenCreateTextTopicForm(true);
    }
    return (
      <Cell {...props} className="link-group">
        <div style={{ marginTop: "-8px", display: "flex", justifyContent: "space-between" }}>
          <Whisper
            trigger="hover"
            placement="top"
            speaker={<Tooltip>Editar QuickWin</Tooltip>}
          >
            <IconButton
              appearance="primary"
              style={{
                background: "var(--color-conversion-1)",
              }}
              onClick={openEdit}
              icon={<EditIcon />}
            />
          </Whisper>
          <Whisper
            trigger="hover"
            placement="top"
            speaker={<Tooltip>Editar Pauta</Tooltip>}
          >
            <IconButton
              appearance="primary"
              style={{
                background: "var(--color-conversion-1)",
              }}
              onClick={openCreateTextTopic}
              icon={<DocPassIcon />}
            />
          </Whisper>
        </div>
      </Cell>
    );
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


  const renderRowExpanded = (rowData) => {

    return (
      <Stack id="expandable" direction="row" alignItems="baseline" justifyContent="space-between">

        <Panel bordered shaded header={"Informações do QuickWin"} style={{
          background: "var(--rs-btn-subtle-hover-bg)",
          width: '47vw'
        }}>
          <div style={{
            padding: 20
          }}>
            <p><strong>Responsável</strong>: {rowData.dsresponsible}</p>
            <p><strong>Cliente</strong>: {rowData.customer}</p>
            <p><strong>Mês de referência</strong>: {rowData.dsmonth}, {rowData.dsyear}</p>
            <p><strong>Termo principal</strong>: {rowData.dskeyword}</p>
            <p><strong>Url da página</strong>: <Link href={rowData.dsurl}><a target="_blank">{rowData.dsurl}</a></Link></p>
            <p><strong>Volume de busca</strong>: {rowData.dsvolume}</p>
            <p><strong>Posição inicial</strong>: {rowData.dsposition}</p>
            <p><strong>Tipo de otimização</strong>: {rowData.dstype}</p>
            <p><strong>Tipo de conteúdo</strong>: {rowData.dscontent}</p>
            <p><strong>Densidade de palavras</strong>: {rowData.dsdensity}</p>
            <p><strong>Objetivo da otimização</strong>: {rowData.dsobjective}</p>
          </div>
        </Panel>

        {rowData.textTopic ? rowData.textTopic == "Sem pautas" ? <div style={{paddingRight:30}}>Sem pautas cadastradas</div> : <Panel bordered shaded header={"Informações da pauta"} style={{
          background: "var(--rs-btn-subtle-hover-bg)",
          width: '47vw'
        }}>
          <div style={{
            padding: 20,
            overflowY: 'auto',
            overflowX: 'hidden',
            maxHeight: 400
          }}>
            <p><strong>Title Otimizado</strong>: {rowData.textTopic?.dstitle}</p>
            <p><strong>Description otimizado</strong>: {rowData.textTopic?.dsdescription}</p>
            <p><strong>H1</strong>: {rowData.textTopic?.dsh1}</p>
            <p><strong>Link do texto</strong>:<Link href={rowData.textTopic?.dstextlink}><a target="_blank">{rowData.textTopic?.dstextlink}</a></Link></p>
            <p style={{ whiteSpace: 'pre-wrap' }}><strong>Estrutura do texto</strong>:<br />{rowData.textTopic?.dstextstructure}</p>
            <p><strong>Termos secundários</strong>: {rowData.textTopic?.dssecundarykeywords}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}><strong>Perguntas frequentes</strong>:<br />{rowData.textTopic?.dspeopleask}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}><strong>Estrutura da página</strong>:<br />{rowData.textTopic?.dspagestructure}</p>
            <p style={{ whiteSpace: 'pre-wrap' }}><strong>Recomendações</strong>:<br />{rowData.textTopic?.dsrecommendations}</p>
            <p><strong>Cta</strong>: {rowData.textTopic?.dscta}</p>
            <p><strong>Etapa do funil</strong>: {rowData.textTopic?.dsfunnel}</p>
          </div>
        </Panel> : <Loader backdrop content="Buscando pautas..." />}
      </Stack>
    );
  };
  const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    const manualKeys = [
      { value: "dskeyword", label: "Palavra Chave" },
      { value: "dsinitposition", label: "Posição Inicial" },
      { value: "dspageurl", label: "Url" },
      { value: "dtcomp", label: "Data de Competência" },
      { value: "dsuser", label: "Usuário" },
      { value: "dtimplement", label: "Data de Implementação" },
      { value: "nmsquad", label: "Squad" },
    ];
    const keys = Object.keys(tableData[0] || {});
    const handleSelect = (eventKey) => {
      onClose();
      const message = getMessage(keys[eventKey]);
      toaster.push(message, { placement: "topEnd" });
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          {keys.map((key, index) => {
            return (
              <Dropdown.Item eventKey={index} key={index}>
                {key}
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
        {filterData?.map((tag, index) => (
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
  return (
    <Panel className="nopadding">
      <Table
        virtualized
        autoHeight
        data={getData().length == 0 ? [] : getData()}
        loading={loading}
        sortColumn={sortColumn}
        sortType={sortType}
        onSortColumn={handleSortColumn}
        renderRowExpanded={renderRowExpanded}
        expandedRowKeys={expandedRowKeys}
        shouldUpdateScroll={false}
        rowKey={rowKey}
        rowExpandedHeight={500}
        cellBordered
        bordered
      >

        <Column width={70} align="center">
          <HeaderCell>#</HeaderCell>
          <ExpandCell
            dataKey="id"
            expandedRowKeys={expandedRowKeys}
            onChange={handleExpanded}
          />
        </Column>

        <Column sortable resizable width={150} fixed>
          <HeaderCell>Palavra</HeaderCell>
          <Cell dataKey="dskeyword" />
        </Column>
        <Column sortable resizable width={200} flexGrow={1} align="center">
          <HeaderCell>Url</HeaderCell>
          <LinkCell dataKey="dsurl" />
        </Column>
        <Column sortable resizable width={150} align="center">
          <HeaderCell>Volume de buscas</HeaderCell>
          <Cell dataKey="dsvolume" />
        </Column>
        <Column sortable resizable width={130} align="center">
          <HeaderCell>Posicionamento</HeaderCell>
          <Cell dataKey="dsposition" />
        </Column>
        <Column sortable resizable width={100} align="center">
          <HeaderCell>Densidade</HeaderCell>
          <Cell dataKey="dsdensity" />
        </Column>
        <Column sortable resizable width={225} align="center">
          <HeaderCell>Tipo de otimização
          </HeaderCell>
          <Cell dataKey="dstype" />
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
