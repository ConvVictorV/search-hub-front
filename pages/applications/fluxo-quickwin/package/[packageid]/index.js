import FunnelIcon from "@rsuite/icons/Funnel";
import MoreIcon from "@rsuite/icons/More";
import ReloadIcon from "@rsuite/icons/Reload";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

import {
  ButtonToolbar,
  Container,
  Dropdown,
  IconButton,
  Message,
  Modal,
  Popover,
  Stack,
  Tooltip,
  useToaster,
  Whisper,
  Button
} from "rsuite";
import Select from "../../../../../components/Form/Components/Select";
import DeleteForm from "../../../../../components/Form/Pages/Applications/quickwins/delete";
import ExportForm from "../../../../../components/Form/Pages/Applications/quickwins/export";
import ImportForm from "../../../../../components/Form/Pages/Applications/quickwins/import";
import CreateForm from "../../../../../components/Form/Pages/Applications/quickwins/create";
import CreateTextTopic from "../../../../../components/Form/Pages/Applications/quickwins/createTextTopic";
import CreateTextRequest from "../../../../../components/Form/Pages/Applications/quickwins/textRequest";
import EditForm from "../../../../../components/Form/Pages/Applications/quickwins/edit";
import TableWords from "../../../../../components/Tables/applications/quickwins";
import FullWidthLayout from "../../../../../Layouts/fullwidth";




// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
export async function getStaticProps() {
  return {
    props: {
    },
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { packageid: '123456789' } }],
    fallback: true, // can also be true or 'blocking'
  }
}

function Demo(args) {
  const router = useRouter()
  const packageid = router.query.packageid || null
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");
  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openCreateTextTopicForm, setOpenCreateTextTopicForm] = useState(false);
  const [openTextRequestForm, setOpenTextRequestForm] = useState(false)
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [rowData, setRowData] = useState();
  const [showButton, setShowButton] = useState(false)
  const toast = useToaster();

  const handleClose = () => {
    setOpenExportForm(false);
    setOpenImportForm(false);
    setOpenEditForm(false);
    setOpenDeleteForm(false);
    setOpenCreateForm(false);
    setOpenCreateTextTopicForm(false);
    setOpenTextRequestForm(false)
    updateData();
  };

  const getData = () => {
    const axios = require("axios");
    setTableData([])
    let page = 0
    let tableD = []
    let getQuickwins = () => {
      axios.get("/api/get/quickwins?page=" + (++page))
        .then(({ data }) => {
          if (data.length > 0) {
            tableD = tableD.concat(data)
            setTableData(tableD);
            getQuickwins()
          } else {
            axios.get('/api/get/select/customersId').then(({ data }) => {
              setTableData(tableD.map((row, index) => {
                const { idcustomer } = row
                row.nmcustomer = data.filter(customer => customer.value == idcustomer)[0]?.label || ''
                return row
              }))
            })
          }
        });
    }
    getQuickwins()
  };

  const updateData = () => {
    setCheckedKeys([]);
    toast.push(
      <Message showIcon type={"info"} duration={2000}>
        Tabela atualizada
      </Message>,
      { placement: "topCenter" }
    );
    getData();
  };
  useEffect(() => {
    getData();
    const filterQwsByPackage = (id) => {
      const removeCustomerFilter = () => {
        const filters = filterData.filter(
          (item) => item.indexOf("fkIdqwpackage") == -1
        );
        setFilterData(filters);
      };
      const addFilter = () => {
        removeCustomerFilter();
        const filters = [...filterData, `fkIdqwpackage|is|${id}`] || filters;
        setFilterData(filters);
      };
      id ? addFilter() && setPage(1) : removeCustomerFilter();
    };
    filterQwsByPackage(packageid)
  }, [packageid]);
  const renderSpeaker = ({ onClose, left, top, className, ...rest }, ref) => {
    const handleSelect = (eventKey) => {
      onClose();
      switch (eventKey) {
        case 1:
          setOpenImportForm(true);
          break;
        case 2:
          setOpenExportForm(true);
          break;
        case 3:
          setOpenDeleteForm(true);
          break;
      }
    };
    return (
      <Popover ref={ref} className={className} style={{ left, top }} full>
        <Dropdown.Menu onSelect={handleSelect}>
          <Dropdown.Item disabled eventKey={1}>Importar</Dropdown.Item>
          <Dropdown.Item disabled={checkedKeys.length == 0} eventKey={2}>{`Exportar ${checkedKeys.length != 0 ? `(${checkedKeys.length})` : ""
            }`}</Dropdown.Item>
          {checkedKeys.length != 0 ? (
            <Dropdown.Item
              disabled
              eventKey={3}
            >{`Deletar (${checkedKeys.length})`}</Dropdown.Item>
          ) : (
            ""
          )}
        </Dropdown.Menu>
      </Popover>
    );
  };

  const getHeaderTable = () => {
    return (
      <Stack
        wrap
        spacing={24}
        alignItems={"center"}
        style={{
          padding: "20px",
        }}
      >
        <div></div>
        <ButtonToolbar>

          <Button
            disabled={checkedKeys.length == 0 || tableData.filter(
              (row) => checkedKeys.indexOf(row.id) > -1
            ).map(row => {
              return row.dsstatus?.indexOf('Alocação Redatores') > -1
            }).includes(false) != false}
            onClick={() => { setOpenTextRequestForm(true) }}
            appearance={"ghost"} style={
              {
                backgroundColor: "transparent",
                color: "var(--color-conversion-1)",
                borderColor: "var(--color-conversion-1)"
              }
            }>
            Pedido de Produção
          </Button>

          <Whisper
            trigger="hover"
            placement="top"
            speaker={<Tooltip>Novo Planejamento</Tooltip>}
          >
            <IconButton
              style={
                {
                  backgroundColor: "transparent",
                  color: "var(--color-conversion-1)",
                  borderColor: "var(--color-conversion-1)"
                }
              }
              icon={<FunnelIcon style={
                {
                  backgroundColor: "transparent",
                  color: "var(--color-conversion-1)",
                  borderColor: "var(--color-conversion-1)"
                }
              } />}
              appearance={"ghost"}
              onClick={() => { setOpenCreateForm(true) }}
            >Novo Planejamento</IconButton>
          </Whisper>
          <Whisper
            trigger="hover"
            placement="top"
            speaker={<Tooltip>Filtrar</Tooltip>}
          >
            <IconButton
              style={
                !filterActive
                  ? {
                    backgroundColor: "transparent",
                    color: "var(--color-conversion-1)",
                  }
                  : {
                    backgroundColor: "var(--color-conversion-1)",
                    color: "white",
                  }
              }
              icon={<FunnelIcon />}
              appearance={"subtle"}
              onClick={() => setFilterActive(!filterActive)}
            ></IconButton>
          </Whisper>

          <Whisper
            trigger="hover"
            placement="top"
            speaker={<Tooltip>Atualizar tabela</Tooltip>}
          >
            <IconButton
              icon={
                <ReloadIcon
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-conversion-1)",
                  }}
                />
              }
              onClick={() => updateData()}
              appearance={"subtle"}
              style={{
                color: "var(--color-conversion-1)",
                borderColor: "var(--color-conversion-1)",
              }}
            ></IconButton>
          </Whisper>
          <Whisper
            trigger="click"
            placement="bottomEnd"
            speaker={renderSpeaker}
          >
            <IconButton
              icon={
                <MoreIcon
                  style={{
                    backgroundColor: "transparent",
                    color: "var(--color-conversion-1)",
                  }}
                />
              }
              appearance={"subtle"}
              style={{
                color: "var(--color-conversion-1)",
                borderColor: "var(--color-conversion-1)",
              }}
            ></IconButton>
          </Whisper>
        </ButtonToolbar>
      </Stack>
    );
  };

  function filter(search, data) {
    let filteredData = [...data];
    if (filterData.length > 0) {
      if (typeof data === "object") {
        filterData.map((filterString) => {
          filterString = filterString.split("|");
          const column = filterString[0];
          const type = filterString[1];
          const value = filterString[2];
          filteredData = filteredData.filter((row) => {
            const rowColumn = row[column];
            switch (type) {
              case "is":
                return rowColumn == value;
              case "is not":
                return rowColumn != value;
              case "contains":
                return rowColumn?.indexOf(value) > -1;
            }
          });
        });
      }
    }
    if (search.length && typeof data === "object") {
      return data.filter((row) => {
        const flatRow = JSON.stringify(row).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return flatRow.includes(search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
      });
    }
    if (filterData.length == 0) return []
    return filteredData;
  }

  return (
    <FullWidthLayout
      toggleTheme={args.toggleTheme}
      title="QuickWins | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="QuickWins"
    >
      <Container
        style={{
          padding: "0px 20px 0px 50px",
        }}
      >
        <Modal
          open={openExportForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>
              Exportar {checkedKeys.length || ""} quickwins
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExportForm
              closeModal={handleClose}
              data={tableData.filter(
                (qw) => checkedKeys.indexOf(qw.id) > -1
              )}
            />
          </Modal.Body>
        </Modal>
        <Modal
          open={openImportForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Importar QuickWins</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImportForm closeModal={handleClose} />
          </Modal.Body>
        </Modal>

        <Modal
          open={openCreateForm}
          onClose={handleClose}
          size="md"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Planejamento de QuickWins</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateForm closeModal={handleClose} />
          </Modal.Body>
        </Modal>

        <Modal
          open={openEditForm}
          onClose={handleClose}
          size="md"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Editar Quickwin</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm rowData={rowData} closeModal={handleClose} />
          </Modal.Body>
        </Modal>
        <Modal
          open={openCreateTextTopicForm}
          onClose={handleClose}
          size="md"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Planejamento de Pauta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateTextTopic rowData={rowData} closeModal={handleClose} />
          </Modal.Body>
        </Modal>

        <Modal
          open={openTextRequestForm}
          onClose={handleClose}
          size="full"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Pedido de produção</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateTextRequest rowData={tableData.filter(
              (qw) => checkedKeys.indexOf(qw.id) > -1
            )} closeModal={handleClose} />
          </Modal.Body>
        </Modal>
        {/*         
        <Modal
          open={openCreateTextTopicForm}
          onClose={handleClose}
          size="md"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Criar Pauta</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm rowData={rowData} closeModal={handleClose} />
          </Modal.Body>
        </Modal> */}
        <Modal
          open={openDeleteForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Deletar palavras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <DeleteForm
              closeModal={handleClose}
              data={tableData.filter(
                (word) => checkedKeys.indexOf(word.idworkedpage) > -1
              )}
            />
          </Modal.Body>
        </Modal>
        <TableWords
          setCheckedKeys={setCheckedKeys}
          checkedKeys={checkedKeys}
          setOpenEditForm={setOpenEditForm}
          setOpenCreateTextTopicForm={setOpenCreateTextTopicForm}
          tableData={filter(search, tableData)}
          setSearch={setSearch}
          headerMenu={getHeaderTable()}
          setRowData={setRowData}
          filterActive={filterActive}
          filterData={filterData}
          setFilterData={setFilterData}
        />
      </Container>
    </FullWidthLayout>
  );
}
Demo.auth = {};
export default Demo;
