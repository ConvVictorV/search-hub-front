import axios from "axios";
import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Form,
  Message,
  Toggle,
  useToaster,
} from "rsuite";
import Select from "../../Components/Select";

function FormComponent({ closeModal, footer, sendText, ...rest }) {
  const [customerName, setCustomerName] = useState("");
  const [customerDomain, setCustomerDomain] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerIdSquad, setCustomerIdSquad] = useState("");
  const [customerJiraKey, setCustomerJiraKey] = useState("");
  const [customerActive, setCustomerActive] = useState(true);

  const toast = useToaster();

  const messageLoading = (
    <Message showIcon type={"info"} duration={0}>
      Processando dados!
    </Message>
  );
  const messageSucess = (
    <Message showIcon type={"success"} duration={5000}>
      Cliente criado!
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
      .post("/api/post/customer", {
        nmcustomer: customerName,
        dsdomain: customerDomain,
        blstatus: customerActive,
        idsquad: customerIdSquad,
        dsclientemail: customerEmail,
        jirakey: customerJiraKey,
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
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Nome</Form.ControlLabel>
        <Form.Control name="customer-name" onChange={setCustomerName} />
      </Form.Group>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Domínio</Form.ControlLabel>
        <Form.Control
          name="customer-domain"
          onChange={setCustomerDomain}
          onBlur={() => {
            const formatedDomain = (
              customerDomain.indexOf("://") > -1
                ? customerDomain.split("/")[2]
                : customerDomain.split("/")[0]
            ).replace("www.", "");
            setCustomerDomain(formatedDomain);
            document.getElementsByName("customer-domain")[0].value =
              formatedDomain;
          }}
        />
      </Form.Group>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Projeto Jira</Form.ControlLabel>
        <Form.Control name="customer-jirakey" onChange={setCustomerJiraKey} />
      </Form.Group>
      <Select
        fetch={"/api/get/select/squadsId"}
        placeholder={"Selecione o squad"}
        onSelect={setCustomerIdSquad}
      />
      <Form.Group
        controlId="email-9"
        style={{
          marginTop: "20px",
        }}
      >
        <Form.ControlLabel>Email</Form.ControlLabel>
        <Form.Control
          name="customer-email"
          type="email"
          onChange={setCustomerEmail}
        />
      </Form.Group>

      <Toggle
        size="lg"
        checkedChildren="Ativo"
        unCheckedChildren="Inativo"
        onChange={setCustomerActive}
        defaultChecked={true}
      />
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
