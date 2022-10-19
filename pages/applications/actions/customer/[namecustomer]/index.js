import FunnelIcon from "@rsuite/icons/Funnel";
import ReloadIcon from "@rsuite/icons/Reload";
import React, { useEffect, useState } from "react";

import FileDownloadIcon from "@rsuite/icons/FileDownload";
import {
  ButtonToolbar,
  Container,
  IconButton,
  Message,
  Modal,
  Stack,
  Tooltip,
  useToaster,
  Whisper,
} from "rsuite";
import Select from "../../../../../components/Form/Components/Select";
import ExportForm from "../../../../../components/Form/Pages/Applications/Actions/export";
import TableWords from "../../../../../components/Tables/applications/actions";
import FullWidthLayout from "../../../../../Layouts/fullwidth";
import { useRouter } from "next/router";

function Demo({ customer, ...args }) {
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");
  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [filterActive, setFilterActive] = useState(false);

  const router = useRouter()
  const namecustomer = router.query.namecustomer?.toLowerCase().replace(/ /g, '').replace(/-/g, '').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\(/g, '').replace(/\)/g, '');
  const [rowData, setRowData] = useState();
  const toast = useToaster();

  const handleClose = () => {
    setOpenExportForm(false);
    setOpenImportForm(false);
    setOpenDeleteForm(false);
    updateData();
  };
  const getData = () => {
    const axios = require("axios");
    setTableData([])
    let page = 0
    let tableD = []
    let getIssues = async () => {
      axios.get("/api/get/jiraIssuesAllPages?page=" + (++page))
        .then(({ data }) => {
          if (data.length > 0) {
            tableD = tableD.concat(data)
            setTableData(tableD);
            getIssues()
          }
        });
    }
    getIssues().then(()=>{
      axios.get('/api/get/select/customersJiraKeys').then(({data})=>{
        const jira = data.filter(({label})=>{
          return label.toLowerCase().replace(/ /g,'').replace(/-/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\(/g,'').replace(/\)/g,'') == namecustomer
        })[0]
        jira && filterCustomerById(jira.value)
      })
    })
  };
  const filterCustomerById = (id) => {
    const removeCustomerFilter = () => {
      const filters = filterData.filter(
        (item) => item.indexOf("project") == -1
      );
      setFilterData(filters);
    };
    const addCustomerFilter = () => {
      removeCustomerFilter();
      const filters = [...filterData, `project|is|${id}`] || filters;
      setFilterData(filters);
    };
    id ? addCustomerFilter() && setPage(1) : removeCustomerFilter();
    id == 0 && addCustomerFilter() && setPage(1)
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
        <Select
          fetch="/api/get/select/customersJiraKeys"
          placeholder="Filtre por cliente"
          onSelect={filterCustomerById}
          style={{
            width: "150px",
          }}
        />
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

          <IconButton
            icon={
              <FileDownloadIcon
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-conversion-1)",
                }}
                onClick={() => {
                  setOpenExportForm(true);
                }}
              />
            }
            appearance={"subtle"}
            style={{
              color: "var(--color-conversion-1)",
              borderColor: "var(--color-conversion-1)",
            }}
          ></IconButton>
        </ButtonToolbar>
      </Stack>
    );
  };

  function filter(search, data) {
    let filteredData = [...tableData];
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
                const flatRow = JSON.stringify(row).toLowerCase().normalize('NFD');
        return flatRow.includes(search.toLowerCase().normalize('NFD'));
      });
    }
    return filteredData;
  }

  return (
    <FullWidthLayout
      toggleTheme={args.toggleTheme}
      title="Ações do projeto | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="Ações do projeto"
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
            <Modal.Title>Exportar {checkedKeys.length || ""}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ExportForm
              closeModal={handleClose}
              data={tableData.filter(
                (word) => checkedKeys.indexOf(word.id) > -1
              )}
            />
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
