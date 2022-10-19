import ExportIcon from "@rsuite/icons/Export";
import ImportIcon from "@rsuite/icons/Import";
import ReloadIcon from "@rsuite/icons/Reload";
import TrashIcon from "@rsuite/icons/Trash";
import React, { useEffect, useState } from "react";
import {
  ButtonToolbar,
  Container,
  IconButton,
  Message,
  Modal,
  useToaster,
} from "rsuite";
import DeleteForm from "../../../../../components/Form/Pages/Applications/palavras-estrategicas/delete";
import ExportForm from "../../../../../components/Form/Pages/Applications/palavras-estrategicas/export";
import ImportForm from "../../../../../components/Form/Pages/Applications/palavras-estrategicas/import";
import TableWords from "../../../../../components/Tables/applications/palavras-estrategicas";
import FullWidthLayout from "../../../../../Layouts/fullwidth";
import { useRouter } from 'next/router'
import axios from "axios";

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// revalidation is enabled and a new request comes in
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

function Demo({ customers, ...args }) {
  const router = useRouter()
  const namecustomer = router.query.namecustomer?.toLowerCase().replace(/ /g,'').replace(/-/g,'').normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/\(/g,'').replace(/\)/g,'');
  const [tableData, setTableData] = useState([]);
  const [checkedKeys, setCheckedKeys] = React.useState([]);
  const [search, setSearch] = useState("");

  const [openExportForm, setOpenExportForm] = useState(false);
  const [openImportForm, setOpenImportForm] = useState(false);
  const [openDeleteForm, setOpenDeleteForm] = useState(false);

  const [filterData, setFilterData] = useState();

  const toast = useToaster();

  const handleClose = () => {
    setOpenExportForm(false);
    setOpenImportForm(false);
    setOpenDeleteForm(false);
    updateData();
  };
  const getData = () => {
    axios.get(`/api/get/words/${localStorage.getItem('customerId') && localStorage.getItem('customerId') != 'undefined' && '?idcustomer='+localStorage.getItem('customerId')}`).then(({data})=>{
      setTableData(data)
    })
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
          return row[Object.keys(filterData?.["filter"])[0]] ==
            filterData?.["filter"][Object.keys(filterData?.["filter"])[0]]
            ? true
            : false;
        });
      }
    }
    if (search.length && typeof data === "object") {
      return data.filter((row) => {
                const flatRow = JSON.stringify(row).toLowerCase().normalize('NFD');
        return flatRow.includes(search.toLowerCase().normalize('NFD'));
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
              data={tableData?.filter(
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
              data={tableData?.filter(
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
          setFilterData={setFilterData}
          noData
        />
      </Container>
    </FullWidthLayout>
  );
}
Demo.auth = {};
export default Demo;
