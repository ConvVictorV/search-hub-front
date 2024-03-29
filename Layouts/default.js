import Head from "next/head";
import Col from "rsuite/Col";
import Container from "rsuite/Container";
import Grid from "rsuite/Grid";
import Row from "rsuite/Row";
import getBackground from "../components/Backgrounds";
import Header from "../components/Header";
import Sidenav from "../components/Navs/Sidenav";

function DefaultLayout(args) {
  return (
    <Container>
      <Head>
        <title>{args.title || "Search Hub | Conversion"}</title>
        <meta name="description" content={args.description || ""} />
        {args.indexable == true ? (
          <meta key="robots" name="robots" content="noindex,nofollow" />
        ) : (
          <meta key="robots" name="robots" content="index,follow" />
        )}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container
        style={{
          background: `no-repeat center/cover url('${
            args.background ? getBackground(args.background) : false
          }')`,
        }}
      >
        <Sidenav />
        <Container>
          <Header toggleTheme={args.toggleTheme} breadcrumb={args.breadcrumb} />
          <Grid>
            <Row>
              <Col style={{ width: "100%", minHeight: "100vh" }}>
                {args.children}
              </Col>
            </Row>
          </Grid>
        </Container>
      </Container>
    </Container>
  );
}

export default DefaultLayout;
