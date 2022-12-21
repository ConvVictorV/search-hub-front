import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Container, FlexboxGrid, Table, Panel, Placeholder } from "rsuite";
import getBackground from "../components/Backgrounds";

const { HeaderCell, Cell, Column } = Table;


function Teste(props) {
  const router = useRouter()
  const [requestData, setRequestData] = useState([])
  const [quickwins, setQuickwins] = useState([])

  useEffect(() => {
   
  }, [router])
  return (
    <div
      style={{
        background: `no-repeat center/cover url('${getBackground(1)}')`,
      }}

    >
      <Head>
        <title>Search Hub Obrigado| Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
        <meta key="robots" name="robots" content="noindex,nofollow" />
      </Head>
      <Container style={{ height: "100vh", margin: 'auto', overflowY: 'scroll!important' }} >
        <Panel style={{
        overflowY: 'scroll!important'
      }}>
            <Panel>
            <div
        style={{
          margin: "auto",
          display: "block",
          width: "fit-content",
          paddingTop: "20vh",
        }}
      >
        <Image
          src={"/searchhub-colored.png"}
          width={389}
          height={78}
          alt="Logo branca SearchHUB"
        />
      </div>
              <h1 style={{textAlign: "center", margin:10}}>Obrigado!!!</h1>
            </Panel> :            
          
        </Panel>
      </Container>
    </div>
  );
}

Teste.auth = 'open'
export default Teste;

