import Head from "next/head";
import Container from "rsuite/Container";
import getBackground from "../components/Backgrounds";
import Header from "../components/Header";
import Sidenav from "../components/Navs/Sidenav";

function FullWidthLayout(args) {
  return (
    <Container>
      <Head>
        <title>{args.title || "Search Hub | Conversion"}</title>
        <meta name="description" content={args.description || ""} />
        {args.indexable == false ? (
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
          minHeight: "100vh",
        }}
      >
        <Sidenav style={{
          zIndex: 2
        }} />
        <Container style={{
          zIndex: 1
        }}>
          <Header toggleTheme={args.toggleTheme} pageName={args.pageName} />
          {args.children}
        </Container>
      </Container>
    </Container>
  );
}

export default FullWidthLayout;
