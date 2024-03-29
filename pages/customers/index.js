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
import CreateForm from "../../components/Form/Pages/Customers/createCustomer";
import EditForm from "../../components/Form/Pages/Customers/updateCustomer";
import TableCustomers from "../../components/Tables/customers";
import FullWidthLayout from "../../Layouts/fullwidth";

function Demo(args) {
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const filteredCustomers = filter(search, tableData);
  const [openEditForm, setOpenEditForm] = useState(false);
  const [openCreateForm, setOpenCreateForm] = useState(false);
  const [rowData, setRowData] = useState();
  const toast = useToaster();
  const [filterData, setFilterData] = useState();

  const handleClose = () => {
    setOpenEditForm(false);
    setOpenCreateForm(false);
    updateData();
  };
  const getData = () => {
    const axios = require("axios");
    axios.get("/api/get/customers")
    .then(({ data }) => data)
    .then((tableData)=>{
      axios.get('/api/get/select/squadsId').then(({ data }) => {
        setTableData(tableData.map((row, index) => {
          const { idsquad } = row
          row.dsname = data.filter(squad => squad.value == idsquad)[0]?.label || ''
          return row
        }))
      })
    })
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
          Adicionar cliente
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
          return row[Object.keys(filterData?.["filter"])[0]] ==
            filterData?.["filter"][Object.keys(filterData?.["filter"])[0]]
            ? true
            : false;
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
      title="Clientes | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="Clientes"
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
            <Modal.Title>Atualizar cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <EditForm closeModal={handleClose} data={rowData} />
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
            <Modal.Title>Criar cliente</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <CreateForm closeModal={handleClose} />
          </Modal.Body>
        </Modal>
        <TableCustomers
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
