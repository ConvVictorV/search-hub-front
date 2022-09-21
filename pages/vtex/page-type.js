import axios from "axios";
import { useState } from "react";
import {
  Button,
  Container,
  FlexboxGrid,
  Form,
  Input,
  Message,
  Panel,
  Row,
  useToaster,
} from "rsuite";
import DefaultLayout from "../../Layouts/default";

function WorkedPages(args) {
  const [urls, setUrls] = useState([]);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const toast = useToaster();
  return (
    <DefaultLayout
      toggleTheme={args.toggleTheme}
      title="Páginas trabalhadas | SearchHub"
      description="SearchHub Conversion"
      background={2}
      pageName="[BETA] Páginas Trabalhadas"
    >
      <Container style={{ height: "80vh" }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: "100%" }}>
          <FlexboxGrid.Item colspan={24}>
            <Panel
              header={"Verificar tipos de páginas vtex"}
              style={{
                width: "50%",
                backgroundColor: "var(--rs-body)",
                margin: "auto",
              }}
              shaded
              bordered
            >
              <Row>
                <Form>
                  <Input
                    as="textarea"
                    rows={3}
                    placeholder={`Insira as urls separadas por enter\nhttps://exemplo/infantil/jordan\nhttps://exemplo/tenis/infantil`}
                    onChange={(value) => {
                      setUrls(value.split("\n"));
                    }}
                  ></Input>
                  <Input
                    as="textarea"
                    style={{ marginTop: "20px" }}
                    readOnly
                    rows={3}
                    placeholder={`Resultado`}
                    value={result}
                  ></Input>
                  <Button
                    appearance="primary"
                    type="submit"
                    onClick={() => {
                      setResult("");
                      setLoading(true);
                      axios
                        .post("/api/post/vtexType", { urls })
                        .then((result) => {
                          setResult(result.data.toString().replace(/,/g, "\n"));
                          toast.push(
                            <Message showIcon type={"success"} duration={5000}>
                              Sucesso
                            </Message>,
                            { placement: "topCenter" }
                          );
                        })
                        .catch((err) => {
                          console.log(err);
                          toast.push(
                            <Message showIcon type={"error"} duration={5000}>
                              {"Ocorreu um erro :("}
                            </Message>,
                            { placement: "topCenter" }
                          );
                        })
                        .finally(() => {
                          setLoading(false);
                        });
                    }}
                    style={{
                      background: "var(--color-conversion-1)",
                      marginTop: "20px",
                      float: "right",
                    }}
                    loading={loading}
                  >
                    Enviar
                  </Button>
                </Form>
              </Row>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </DefaultLayout>
  );
}

WorkedPages.auth = {};
export default WorkedPages;
