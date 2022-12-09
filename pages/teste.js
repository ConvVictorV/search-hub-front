import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Button, Container, FlexboxGrid } from "rsuite";
import getBackground from "../components/Backgrounds";

function Teste(props) {
  return (
    <div
      style={{
        background: `no-repeat center/cover url('${getBackground(1)}')`,
      }}
    >
      <Head>
        <title>Search Hub | Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta key="robots" name="robots" content="noindex,nofollow" />
      </Head>
      <Container style={{ height: "100vh" }} backgroundColor={"var(--rs-body)"}>
       teste
      </Container>
    </div>
  );
}

Teste.auth = 'open'
export default Teste;

