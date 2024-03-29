import { Container, FlexboxGrid, Panel, Row } from "rsuite";
import Form from "../../components/Form/Register/WorkedPages";
import DefaultLayout from "../../Layouts/default";

function WorkedPages(args) {
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
              header={"Registrar novas páginas"}
              style={{
                width: "50%",
                backgroundColor: "var(--rs-body)",
                margin: "auto",
              }}
              shaded
              bordered
            >
              <Row>
                <Form />
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
