import ExportIcon from "@rsuite/icons/Export";
import ImportIcon from "@rsuite/icons/Import";
import ReloadIcon from "@rsuite/icons/Reload";
import TrashIcon from "@rsuite/icons/Trash";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import {
  ButtonToolbar,
  Container,
  IconButton,
  Message,
  Modal,
  useToaster,
} from "rsuite";
import DeleteForm from "../../../components/Form/Pages/Applications/palavras-estrategicas/delete";
import ExportForm from "../../../components/Form/Pages/Applications/palavras-estrategicas/export";
import ImportForm from "../../../components/Form/Pages/Applications/palavras-estrategicas/import";
import TableWords from "../../../components/Tables/applications/palavras-estrategicas";
import FullWidthLayout from "../../../Layouts/fullwidth";

function Demo(args) {
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");
  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);
  const [filterData, setFilterData] = useState();

  const [rowData, setRowData] = useState();
  const toast = useToaster();
  const route = useRouter()

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
    let getWords = () => {
      axios.get("/api/get/words?page=" + (++page))
        .then(({ data }) => {
          if (data.length > 0) {
            tableD = tableD.concat(data)
            setTableData(tableD);
            getWords()
          } else {
            axios.get('/api/get/select/customersId').then(({ data }) => {
              setTableData(tableD.map((row,index) => {
                const { idcustomer } = row
                row.nmcustomer = data.filter(customer => customer.value == idcustomer)[0]?.label || ''
                return row
              }))
            })
          }
        });
    }
    getWords()
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

  const getHeaderTable = () => {
    return (
      <ButtonToolbar
        style={{
          paddingBottom: "18px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        {checkedKeys.length != 0 ? (
          <IconButton
            icon={
              <TrashIcon
                style={{
                  backgroundColor: "transparent",
                  color: "var(--color-conversion-4)",
                }}
              />
            }
            onClick={() => setOpenDeleteForm(true)}
            appearance={"ghost"}
            style={{
              color: "var(--color-conversion-4)",
              borderColor: "var(--color-conversion-4)",
            }}
          >
            {`Deletar (${checkedKeys.length})`}
          </IconButton>
        ) : (
          ""
        )}
        <IconButton
          icon={
            <ImportIcon
              style={{
                backgroundColor: "transparent",
                color: "var(--color-conversion-1)",
              }}
            />
          }
          onClick={() => setOpenImportForm(true)}
          appearance={"ghost"}
          style={{
            color: "var(--color-conversion-1)",
            borderColor: "var(--color-conversion-1)",
          }}
        >
          Importar
        </IconButton>
        <IconButton
          icon={
            <ExportIcon
              style={{
                backgroundColor: "transparent",
                color: "var(--color-conversion-1)",
              }}
            />
          }
          onClick={() => setOpenExportForm(true)}
          appearance={"ghost"}
          style={{
            color: "var(--color-conversion-1)",
            borderColor: "var(--color-conversion-1)",
          }}
        >
          {"Exportar " +
            (checkedKeys.length != 0 ? `(${checkedKeys.length})` : "")}
        </IconButton>
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
          appearance={"ghost"}
          style={{
            color: "var(--color-conversion-1)",
            borderColor: "var(--color-conversion-1)",
          }}
        >
          Atualizar
        </IconButton>
      </ButtonToolbar>
    );
  };

  function filter(search, data) {
    if (filterData?.filter) {
      if (typeof data === "object") {
        return data.filter((row) => {
          return (row[Object.keys(filterData?.["filter"])[0]] ==
            filterData?.["filter"][Object.keys(filterData?.["filter"])[0]]
            ? true
            : false) || [{
              "idword": 0,
              "idcustomer": 0,
              "dsurldomain": "sem dados",
              "dskeyword": "sem dados",
              "dscategoryword": "sem dados",
              "dslocation": "sem dados",
              "dscity": "sem dados",
              "dtlastexecution": "sem dados",
              "dtregister": "sem dados",
              "dstaskid": "sem dados",
              "dtlasttask": "sem dados",
              "dtworked": "sem dados",
              "dsparameter": "sem dados",
              "dspriority": "sem dados",
              "nmcustomer": "sem dados"
            }]
        });
      }
    }
    if (search.length && typeof data === "object") {
      return data.filter((row) => {
                const flatRow = JSON.stringify(row).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "");
        return flatRow.includes(search.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
      });
    }
    return data;
  }

  return (
    <FullWidthLayout
      toggleTheme={args.toggleTheme}
      title="Palavras Estratégicas | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="Palavras Estratégicas"
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
                (word) => checkedKeys.indexOf(word.idword) > -1
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
            <Modal.Title>Importar palavras</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ImportForm closeModal={handleClose} />
          </Modal.Body>
        </Modal>
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
                (word) => checkedKeys.indexOf(word.idword) > -1
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
          setFilterData={setFilterData}
        />
      </Container>
    </FullWidthLayout>
  );
}
Demo.auth = {};
export default Demo;
