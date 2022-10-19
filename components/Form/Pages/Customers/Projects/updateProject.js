import axios from "axios";
import { useState } from "react";
import {
  Button,
  ButtonToolbar,
  Form,
  Message,
  Radio,
  RadioGroup,
  Steps,
  Toggle,
  useToaster,
  Panel,
  TagInput
} from "rsuite";
import Select from "../../../Components/Select";

function FormComponent({ rowData, closeModal, footer, sendText, ...rest }) {
  const {
    idproject,
    dsurlsite,
    dstype,
    dsaccountgsc,
    dssitenamegsc,
    nrviewIdga,
    dsreport,
    dsmensalreport,
    dsemailopw,
    dsemailph,
    dsemailwr,
    dsprojectemail,
  } = rowData

  const [projectUrl, setProjectUrl] = useState(dsurlsite || "");
  const [projectSitename, setProjectSitename] = useState(dssitenamegsc || "");
  const [projectNrGa, setProjectNrGa] = useState(nrviewIdga || 0);
  const [projectType, setProjectType] = useState(dstype || "institucional e blog");
  const [projectAccount, setProjectAccount] = useState(dsaccountgsc || "");
  const [projectReport, setProjectReport] = useState(dsreport || false);
  const [projectMensalReport, setProjectMensalReport] = useState(dsmensalreport || false);

  const [projetOnPageWatcher, setProjetOnPageWatcher] = useState(dsemailopw || false);
  const [projectPingHome, setProjectPingHome] = useState(dsemailph || false);
  const [projectWeeklyReport, setProjectWeeklyReport] = useState(dsemailwr || false);
  const [projectEmails, setProjectEmails] = useState(dsprojectemail || '');

  const [step, setStep] = useState(0);
  const onChange = nextStep => {
    setStep(nextStep < 0 ? 0 : nextStep > 1 ? 1 : nextStep);
  };

  const onNext = () => onChange(step + 1);
  const onPrevious = () => onChange(step - 1);

  const toast = useToaster();

  const messageLoading = (
    <Message showIcon type={"info"} duration={0}>
      Processando dados!
    </Message>
  );
  const messageSucess = (
    <Message showIcon type={"success"} duration={5000}>
      Projeto Atualizado!
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
      .post("/api/put/project", {
        idproject: idproject,
        data: {
          dsurlsite: projectUrl,
          dstype: projectType,
          dsaccountgsc: projectAccount,
          dssitenamegsc: projectSitename,
          nrviewIdga: parseInt(projectNrGa),
          dsreport: projectReport,
          dsmensalreport: projectMensalReport,
          dsemailopw: projetOnPageWatcher,
          dsemailph: projectPingHome,
          dsemailwr: projectWeeklyReport,
          dsprojectemail: projectEmails.toString()
        }
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
      <hr />
      <Steps current={step} style={{
        padding: "0px 50px"
      }}>
        <Steps.Item title="Projeto" description="Dados do projeto" />
        <Steps.Item title="Relatórios" description="Ativação de relatórios" />
      </Steps>
      <hr />
      <Panel style={{
        display: step == 0 ? "block" : "none"
      }}>

        <Form.Group
          controlId="name-9"
          style={{
            marginTop: "20px",
          }}
        >
          <Form.ControlLabel>Digite a url do projeto</Form.ControlLabel>
          <Form.Control name="project-url" defaultValue={projectUrl} onChange={setProjectUrl} />
        </Form.Group>
        <Form.Group controlId="name-9">
          <Form.ControlLabel>Digite o sitename do projeto</Form.ControlLabel>
          <Form.Control name="project-sitename" defaultValue={projectSitename} onChange={setProjectSitename} />
        </Form.Group>
        <Form.Group controlId="name-9">
          <Form.ControlLabel>
            Digite o número de visualização no GA
          </Form.ControlLabel>
          <Form.Control name="project-nr-ga" defaultValue={projectNrGa} onChange={setProjectNrGa} />
        </Form.Group>

        <Form.Group controlId="name-9">
          <Form.ControlLabel>
            Conta GSC
          </Form.ControlLabel>
          <Form.Control name="project-nr-ga" defaultValue={projectAccount} onChange={setProjectAccount} />
        </Form.Group>

        <RadioGroup
          name="radioList"
          inline
          appearance="picker"
          onChange={setProjectType}
          defaultValue={projectType}
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
      </Panel>
      <Panel style={{
        display: step == 1 ? "block" : "none"
      }}>
        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Emails do projeto:
        </Form.ControlLabel>
        <TagInput
          trigger={['Enter', 'Space', 'Comma']}
          placeholder=""
          style={{ width: "94%" }}
          defaultValue={projectEmails.split(',')[0] == '' ? '': projectEmails.split(',')}
          onChange={(values)=>setProjectEmails(values.toString())}
        />
        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Receber relatório Mensal:
        </Form.ControlLabel>
        <Toggle
          size="lg"
          checkedChildren="Sim"
          unCheckedChildren="Não"
          onChange={setProjectMensalReport}
          defaultChecked={projectMensalReport}
        />
        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Receber relatório Semanal:
        </Form.ControlLabel>
        <Toggle
          size="lg"
          checkedChildren="Sim"
          unCheckedChildren="Não"
          onChange={setProjectReport}
          defaultChecked={projectReport}
        />
        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Cliente receber e-mail do relatório semanal
        </Form.ControlLabel>

        <Toggle
          size="lg"
          checkedChildren="Sim"
          unCheckedChildren="Não"
          onChange={setProjectWeeklyReport}
          defaultChecked={projectWeeklyReport}
        />

        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Cliente receber e-mail de aviso do Onpage Watcher
        </Form.ControlLabel>
        <Toggle
          size="lg"
          checkedChildren="Sim"
          unCheckedChildren="Não"
          onChange={setProjetOnPageWatcher}
          defaultChecked={projetOnPageWatcher}
        />

        <Form.ControlLabel
          style={{
            display: "block",
            padding: "20px 0px 5px",
          }}
        >
          Cliente receber e-mail de aviso do Ping da Home
        </Form.ControlLabel>
        <Toggle
          size="lg"
          checkedChildren="Sim"
          unCheckedChildren="Não"
          onChange={setProjectPingHome}
          defaultChecked={projectPingHome}
        />


      </Panel>
      <hr />
      <Form.Group>
        <ButtonToolbar>
          <Button
            onClick={sendData}
            style={{
              backgroundColor: "var(--color-conversion-1)",
              color: "var(--color-darkness-background)",
              float: "right",
              marginLeft: 10,
              display: step == 1 ? "block" : "none"
            }}
            type="submit"
          >
            {"Enviar"}
          </Button>
          <Button style={{
            backgroundColor: "var(--color-conversion-1)",
            color: "var(--color-darkness-background)",
            float: "right",
            display: step == 0 ? "block" : "none"
          }} onClick={onNext} disabled={step === 3}>
            Próximo
          </Button>
          <Button style={{
            backgroundColor: "var(--color-conversion-1)",
            color: "var(--color-darkness-background)",
            float: "right",
            display: step == 0 ? "none" : "block"
          }} onClick={onPrevious} disabled={step === 0}>
            Voltar
          </Button>
        </ButtonToolbar>
      </Form.Group>
    </Form>
  );
}

export default FormComponent;
