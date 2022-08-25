import axios from "axios";
import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Form,
  Message,
  Radio,
  RadioGroup,
  Toggle,
  useToaster,
} from "rsuite";
import Select from "../../../Components/Select";

function FormComponent({ closeModal, footer, sendText, ...rest }) {
  const [projectCustomer, setProjectCustomer] = useState(0);
  const [projectUrl, setProjectUrl] = useState("");
  const [projectSitename, setProjectSitename] = useState("");
  const [projectNrGa, setProjectNrGa] = useState(0);
  const [projectType, setProjectType] = useState("institucional e blog");
  const [projectAccount, setProjectAccount] = useState("");
  const [projectReport, setProjectReport] = useState(false);
  const toast = useToaster();

  const messageLoading = (
    <Message showIcon type={"info"} duration={0}>
      Processando dados!
    </Message>
  );
  const messageSucess = (
    <Message showIcon type={"success"} duration={5000}>
      Projeto criado!
    </Message>
  );
  const messageError = (
    <Message showIcon type={"error"} duration={5000}>
      Ocorreu um erro!
    </Message>
  );

  const sendData = async () => {
    toast.push(messageLoading, { placement: "topCenter" });

    axios
      .post("/api/post/project", {
        idcustomer: projectCustomer,
        dsurlsite: projectUrl,
        dstype: projectType,
        dsaccountgsc: projectAccount,
        dssitenamegsc: projectSitename,
        nrviewIdga: projectNrGa,
        dsreport: projectReport,
      })
      .then((s) => {
        sucessHandle();
      })
      .catch((e) => {
        errorHandle();
      })
      .finally(() => {
        closeModal();
      });
  };

  const clearToast = async () =>
    new Promise((res, rej) => {
      toast.clear();
      setTimeout(() => {
        res();
      }, 1000);
    });

  const sucessHandle = async () => {
    await clearToast().then(() => {
      toast.push(messageSucess, { placement: "topCenter" });
    });
  };

  const errorHandle = async () => {
    await clearToast().finally(() => {
      toast.push(messageError, { placement: "topCenter" });
    });
  };

  return (
    <Form fluid>
      <Select
        fetch={"/api/get/select/customersId"}
        placeholder={"Selecione o cliente"}
        onSelect={setProjectCustomer}
      />

      <Form.Group
        controlId="name-9"
        style={{
          marginTop: "20px",
        }}
      >
        <Form.ControlLabel>Digite a url do projeto</Form.ControlLabel>
        <Form.Control name="project-url" onChange={setProjectUrl} />
      </Form.Group>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Digite o sitename do projeto</Form.ControlLabel>
        <Form.Control name="project-sitename" onChange={setProjectSitename} />
      </Form.Group>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>
          Digite o número de visualização no GA
        </Form.ControlLabel>
        <Form.Control name="project-nr-ga" onChange={setProjectNrGa} />
      </Form.Group>
      <Select
        fetch={"/api/get/select/projectsAccounts"}
        placeholder={"Selecione a conta do GSC"}
        onSelect={setProjectAccount}
      />
      <Form.ControlLabel
        style={{
          display: "block",
          padding: "20px 0px 5px",
        }}
      >
        Receber relátorio semanal:
      </Form.ControlLabel>
      <Toggle
        size="lg"
        checkedChildren="Sim"
        unCheckedChildren="Não"
        onChange={setProjectReport}
        defaultChecked={projectReport}
      />
      <RadioGroup
        name="radioList"
        inline
        appearance="picker"
        onChange={setProjectType}
        defaultValue="institucional e blog"
        style={{
          width: "94%",
          padding: "0px 10px",
          border: "none",
          marginTop: "20px",
        }}
      >
        <span
          style={{
            lineHeight: "33px",
          }}
        >
          Tipo:{" "}
        </span>
        <Radio value="institucional e blog">Institucional e Blog</Radio>
        <Radio value="institucional">Institucional</Radio>
        <Radio value="blog">Blog</Radio>
      </RadioGroup>
      <hr />
      <Form.Group>
        <ButtonToolbar>
          <Button
            onClick={sendData}
            style={{
              backgroundColor: "var(--color-conversion-1)",
              color: "var(--color-darkness-background)",
              float: "right",
            }}
            type="submit"
          >
            {"Enviar"}
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
}

export default FormComponent;
