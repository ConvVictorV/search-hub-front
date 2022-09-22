import axios from "axios";
import { useSession } from "next-auth/react";
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

function FormComponent({ closeModal, data, footer, sendText, ...rest }) {
  const session = useSession();
  const idToken = session.data.id_token;
  const toast = useToaster();
  const {
    blstatus,
    dsclientemail,
    idcustomer,
    idsquad,
    nmcustomer,
    dsname,
    dsdomain,
    jirakey
  } = data;
  const [customerId, setCustomerId] = useState(idcustomer || "");
  const [customerName, setCustomerName] = useState(nmcustomer || "");
  const [customerEmail, setCustomerEmail] = useState(dsclientemail || "");
  const [customerIdSquad, setCustomerIdSquad] = useState(idsquad || "");
  const [customerActive, setCustomerActive] = useState(blstatus || false);
  const [customerDomain, setCustomerDomain] = useState(dsdomain || "");
  const [customerJiraKey, setCustomerJiraKey] = useState(jirakey || "");
  const messageLoading = (
    <Message showIcon type={"info"} duration={0}>
      Processando dados!
    </Message>
  );
  const messageSucess = (
    <Message showIcon type={"success"} duration={5000}>
      Cliente Atualizado!
    </Message>
  );

  const sendData = async () => {
    toast.push(messageLoading, { placement: "topCenter" });
    axios
      .post(
        "/api/put/customer",
        {
          idcustomer: customerId,
          nmcustomer: customerName,
          dsdomain: customerDomain,
          blstatus: customerActive,
          idsquad: customerIdSquad,
          dsclientemail: customerEmail,
          jirakey: customerJiraKey
        },
        {
          headers: {
            authorization: idToken,
          },
        }
      )
      .then((s) => {
        sucessHandle();
      })
      .catch((e) => {
        const message = "Ocorreu um erro";
        const error = e.response?.data;
        if (error == "Credenciais inválidas")
          message = "Você não possui permissão";
        errorHandle(message);
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

  const errorHandle = async (message) => {
    await clearToast().finally(() => {
      toast.push(
        <Message showIcon type={"error"} duration={5000}>
          {message || "Ocorreu um erro!"}
        </Message>,
        { placement: "topCenter" }
      );
    });
  };

  return (
    <Form fluid>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Nome</Form.ControlLabel>
        <Form.Control
          name="customer-name"
          onChange={setCustomerName}
          defaultValue={nmcustomer}
        />
      </Form.Group>
      <Form.Group controlId="name-9">
        <Form.ControlLabel>Domínio</Form.ControlLabel>
        <Form.Control
          name="customer-domain"
          defaultValue={customerDomain}
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
        <Form.Control
          name="customer-jirakey"
          onChange={setCustomerJiraKey}
          defaultValue={jirakey}
        />
      </Form.Group>
      <Select
        fetch={"/api/get/select/squadsId"}
        placeholder={dsname}
        onSelect={setCustomerIdSquad}
        defaultValue={idsquad}
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
          defaultValue={dsclientemail}
        />
      </Form.Group>

      <Toggle
        size="lg"
        checkedChildren="Ativo"
        unCheckedChildren="Inativo"
        onChange={setCustomerActive}
        defaultChecked={blstatus}
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
