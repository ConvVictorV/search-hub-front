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
  Button,
  Message,
  Modal,
  Popover,
  Stack,
  Tooltip,
  useToaster,
  Whisper,
} from "rsuite";
import ExportForm from "../../../components/Form/Pages/Applications/pacotes-qw/export";
import ImportForm from "../../../components/Form/Pages/Applications/quickwins/import";
import SendToContentForm from "../../../components/Form/Pages/Applications/pacotes-qw/sendtocontent"
import CreateForm from "../../../components/Form/Pages/Applications/quickwins/create";
import TableWords from "../../../components/Tables/applications/pacotes-qw";
import FullWidthLayout from "../../../Layouts/fullwidth";

function Demo(args) {
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");
  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [openSendToContent, setOpenSendToContent] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const route = useRouter()
  const [rowData, setRowData] = useState();
  const toast = useToaster();

  const handleClose = () => {
    setOpenExportForm(false);
    setOpenImportForm(false);
    setOpenSendToContent(false);
    setOpenCreateForm(false)
    updateData();
  };
  const getData = () => {
    const axios = require("axios");
    setTableData([])
    let page = 0
    let tableD = []
    let getWords = () => {
      axios.get("/api/get/qwPackages?page=" + (++page))
        .then(({ data }) => {
          if (data.length > 0) {
            tableD = tableD.concat(data)
            setTableData(tableD);
            getWords()
          } else {
            axios.get('/api/get/customers').then(({ data: customers }) => {
              axios.get('/api/get/select/squadsId').then(({ data: squads }) => {
                setTableData(tableD.map((row, index) => {
                  const { idcustomer } = row
                  const { nmcustomer, idsquad } = customers.filter(customer => customer.idcustomer == idcustomer)[0]
                  row.nmcustomer = nmcustomer || ''
                  row.dssquadid = idsquad || 0
                  row.dssquad = squads.filter(squad => squad.value == idsquad)[0]?.label || ''
                  return row
                }))
              })
              setTableData(tableD.map((row, index) => {
                const { idcustomer } = row
                row.nmcustomer = data.filter(customer => customer.idcustomer == idcustomer)[0]?.nmcustomer || ''
                return row
              }))
            }).finally(()=>{
              
            })
            
          }
        });
    }
    getWords()
  };
  useEffect(() => {
    if (localStorage.getItem('customerName')) {
      const routePath = (route.pathname.split('/')[1]) + "/" + (route.pathname.split('/')[2])
      route.push("/" + routePath + "/customer/" + localStorage.getItem('customerName'))
    } else {
      getData();
    }
  }, []);
  const filterCustomerById = (id) => {
    const removeCustomerFilter = () => {
      const filters = filterData.filter(
        (item) => item.indexOf("idcustomer") == -1
      );
      setFilterData(filters);
      console.log(filterData);
    };
    const addCustomerFilter = () => {
      removeCustomerFilter();
      const filters = [...filterData, `idcustomer|is|${id}`] || filters;
      setFilterData(filters);
    };
    id ? addCustomerFilter() && setPage(1) : removeCustomerFilter();
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
    if (localStorage.getItem('customerName')) {
      const routePath = (route.pathname.split('/')[1]) + "/" + (route.pathname.split('/')[2])
      route.push("/" + routePath + "/customer/" + localStorage.getItem('customerName'))
    } else {
      getData();
    }
  }, []);
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
              eventKey={3}
              disabled
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
            style={
              {
                color: "var(--color-conversion-1)",
                borderColor: "var(--color-conversion-1)"
              }
            }
            appearance={"ghost"}
            onClick={() => { setOpenCreateForm(true) }}
          >Novo Planejamento</Button>

          <Button
            style={
              {
                backgroundColor: "var(--color-conversion-1)",
                color: "white",
                borderColor: "var(--color-conversion-1)"
              }
            }
            appearance={"ghost"}
            onClick={() => { setOpenSendToContent(true) }}
          >Envio para conteúdo</Button>
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
          const value = filterString[2]?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
          filteredData = filteredData.filter((row) => {
            const rowColumn = row[column]?.toString()?.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
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
    return filteredData;
  }

  return (
    <FullWidthLayout
      toggleTheme={args.toggleTheme}
      title="Pacotes QuickWins | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="Pacotes QuickWins"
    >
      <Container
        style={{
          padding: "0px 20px 0px 50px",
        }}
      >
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
          open={openExportForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>
              Exportar {checkedKeys.length || ""} pacotes
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExportForm
              closeModal={handleClose}
              data={tableData.filter(
                (word) => checkedKeys.indexOf(word.idqwpackage) > -1
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
          open={openSendToContent}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Enviar para o time de Conteúdo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Tem certeza que deseja enviar esses {checkedKeys.length} pacotes para conteúdo?
            <SendToContentForm
              closeModal={handleClose}
              data={tableData.filter(
                (qw) => checkedKeys.indexOf(qw.idqwpackage) > -1
              )}
            ></SendToContentForm>
          </Modal.Body>
        </Modal>



        <TableWords
          checkedKeys={checkedKeys}
          setCheckedKeys={setCheckedKeys}
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
