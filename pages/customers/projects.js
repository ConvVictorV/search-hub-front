import PlusIcon from "@rsuite/icons/Plus";
import ReloadIcon from "@rsuite/icons/Reload";
import { useEffect, useState } from "react";
import {
  ButtonToolbar,
  Container,
  IconButton,
  Message,
  Modal,
  useToaster,
} from "rsuite";
import CreateForm from "../../components/Form/Pages/Customers/Projects/createProject";
import EditForm from "../../components/Form/Pages/Customers/Projects/updateProject";
import TableProjects from "../../components/Tables/customers/projects";
import FullWidthLayout from "../../Layouts/fullwidth";

function Demo(args) {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const filteredCustomers = searchCustomer(search, tableData);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [rowData, setRowData] = useState();
  const [filterData, setFilterData] = useState();

  const toast = useToaster();
  const handleClose = () => {
    setOpenEditForm(false);
    setOpenCreateForm(false);
    updateData();
  };

  const getData = () => {
    const axios = require("axios");
    axios.get("/api/get/projects").then(({ data }) => setTableData(data));
  };
  const updateData = () => {
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
  }, []);
  function filter(search, data) {
    if (filterData?.filter) {
      if (typeof data === "object") {
        return data.filter((row) => {
          return row[Object.keys(filterData?.["filter"])[0]] ==
            filterData?.["filter"][Object.keys(filterData?.["filter"])[0]]
            ? true
            : false;
        });
      }
    }
    if (search.length && typeof data === "object") {
      return data.filter((row) => {
        const flatRow = JSON.stringify(row).toLowerCase();
        return flatRow.includes(search.toLowerCase());
      });
    }
    return data;
  }
  const getHeaderTable = () => {
    return (
      <ButtonToolbar
        style={{
          paddingBottom: "18px",
          display: "flex",
          justifyContent: "end",
        }}
      >
        <IconButton
          icon={
            <PlusIcon
              style={{
                backgroundColor: "transparent",
                color: "var(--color-conversion-1)",
              }}
            />
          }
          onClick={() => setOpenCreateForm(true)}
          appearance={"ghost"}
          style={{
            color: "var(--color-conversion-1)",
            borderColor: "var(--color-conversion-1)",
          }}
        >
          Adicionar projeto
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

  function searchCustomer(search, customers) {
    if (search.length && typeof customers === "object") {
      return customers.filter((customer) => {
        const flatCustomer = JSON.stringify(customer).toLowerCase();
        return flatCustomer.includes(search.toLowerCase());
      });
    }
    return customers;
  }

  return (
    <FullWidthLayout
      toggleTheme={args.toggleTheme}
      title="Projetos | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="Projetos"
    >
      <Container
        style={{
          padding: "0px 20px 0px 50px",
        }}
      >
        <Modal
          open={openEditForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Atualizar projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm closeModal={handleClose} rowData={rowData} />
          </Modal.Body>
        </Modal>

        <Modal
          open={openCreateForm}
          onClose={handleClose}
          size="xs"
          keyboard={false}
          backdrop={"static"}
        >
          <Modal.Header>
            <Modal.Title>Criar projeto</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateForm closeModal={handleClose} />
          </Modal.Body>
        </Modal>
        <TableProjects
          tableData={filter(search, tableData)}
          setSearch={setSearch}
          headerMenu={getHeaderTable()}
          setRowData={setRowData}
          setDrawerOpenEdit={setOpenEditForm}
          setFilterData={setFilterData}
        />
      </Container>
    </FullWidthLayout>
  );
}
Demo.auth = {};
export default Demo;
