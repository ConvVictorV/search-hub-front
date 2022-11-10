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
} from "rsuite";
import ExportForm from "../../../../../components/Form/Pages/Applications/quickwins/exportOld";
import ImportForm from "../../../../../components/Form/Pages/Applications/quickwins/import";
import TableWords from "../../../../../components/Tables/applications/pacotes-qw";
import FullWidthLayout from "../../../../../Layouts/fullwidth";


export async function getStaticProps() {
  const res_customers = await fetch(`${process.env.BACKENDHOST}/customers`)
  const customers = await res_customers.json()
  return {
    props: {
      customers
    },
    // Next.js will attempt to re-generate the page:
    // - When a request comes in
    // - At most once every 10 seconds
    revalidate: 60, // In seconds
  }
}

export async function getStaticPaths() {
  return {
    paths: [{ params: { namecustomer: 'customer-customer' } }, { params: { namecustomer: 'customer' } }, { params: { namecustomer: '123-customer' } }, { params: { namecustomer: 'customer-123' } }],
    fallback: true, // can also be true or 'blocking'
  }
}

function Demo(args) {
  const route = useRouter()
  const namecustomer = route.query.namecustomer?.toLowerCase().replace(/ /g, '').replace(/-/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\(/g, '').replace(/\)/g, '');
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");
  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);
  const [rowData, setRowData] = useState();
  const toast = useToaster();

  const handleClose = () => {
    setOpenExportForm(false);
    setOpenImportForm(false);
    updateData();
  };
  const getData = () => {
    const axios = require("axios");
    
    setTableData([])
    let page = 0
    let tableD = []
    let getPackages = () => {
      axios.get(`/api/get/qwPackages${(localStorage.getItem('customerId') && localStorage.getItem('customerId') != 'undefined') ? 
        `?idcustomer=${localStorage.getItem('customerId')}&page=${++page}` : `?page=${++page}`}`)
        .then(({ data }) => {
          if (data.length > 0) {
            tableD = tableD.concat(data)
            setTableData(tableD);
            getPackages()
          }
        });
    }
    getPackages()
  };
  useEffect(() => {
    namecustomer && getData();
  }, [namecustomer]);
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
    namecustomer && getData();
  }, [namecustomer]);
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
          <Dropdown.Item eventKey={1}>Importar</Dropdown.Item>
          <Dropdown.Item eventKey={2}>{`Exportar ${
            checkedKeys.length != 0 ? `(${checkedKeys.length})` : ""
          }`}</Dropdown.Item>
          {checkedKeys.length != 0 ? (
            <Dropdown.Item
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
          open={openExportForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>
              Exportar {checkedKeys.length || ""} palavras
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExportForm
              closeModal={handleClose}
              data={tableData.filter(
                (word) => checkedKeys.indexOf(word.idworkedpage) > -1
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
