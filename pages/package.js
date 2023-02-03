import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { 
  Badge, 
  Button, 
  Container, 
  FlexboxGrid, 
  Table, 
  Panel, 
  Placeholder,
  Tag,
  TagGroup,
  Stack
} from "rsuite";
import getBackground from "../components/Backgrounds";
import Quickwins from "../components/Tables/applications/packages/readonly";

const { HeaderCell, Cell, Column } = Table;


const crypto = require("crypto");
const DADOS_CRIPTOGRAFAR = {
  algoritmo : "aes-128-cbc",
  codificacao : "utf8",
  segredo : "conversionurl",
  tipo : "hex"
};

function criptografar(senha) {
const key = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
const str = key.update(senha, DADOS_CRIPTOGRAFAR.codificacao, DADOS_CRIPTOGRAFAR.tipo);
return  str + key.final(DADOS_CRIPTOGRAFAR.tipo);
};

function descriptografar(senha) {
	const key = crypto.createDecipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo);
	const str = key.update(senha, DADOS_CRIPTOGRAFAR.tipo, DADOS_CRIPTOGRAFAR.codificacao);
	return str + key.final(DADOS_CRIPTOGRAFAR.codificacao);
};

function capitalizeFirstLetter(string) {
  return string ? string.charAt(0).toUpperCase() + string.slice(1) : ''
}

function Teste(props) {
  const router = useRouter()
  const [requestData, setRequestData] = useState([])
  const [quickwins, setQuickwins] = useState([])
  const [packageData, setPackageData] = useState({});
  const [customer, setCustomer] = useState({});
  const handleExpanded = (rowData, dataKey) => {
    let open = false;
    const nextExpandedRowKeys = [];

    expandedRowKeys.forEach((key) => {
      if (key === rowData[rowKey]) {
        open = true;
      } else {
        nextExpandedRowKeys.push(key);
      }
    });

    if (!open) {
      // if (!previousExpandedKeys.includes(rowData.id)) {
      setTimeout(() => {
        setRefresh(refresh + 1)
      }, 2000)
      axios.get('/api/get/select/customersId').then(({ data }) => {
        data.filter((row, index) => {
          const idcustomer = row.value
          rowData.idcustomer == idcustomer && (rowData.customer = data[index].label)
        })
      })
      let data = previousExpandedKeys
      data.push(rowData.id)
      setPreviousExpandedKeys(data)
      axios.get('/api/get/qwPackageByKey?key=' + rowData.id).then(({ data }) => {
        rowData.textTopic = data[0] || 'Sem pautas'
      }).catch(e => {
        console.log(e)
      })
      // }
      nextExpandedRowKeys.push(rowData[rowKey]);
    }
    setExpandedRowKeys(nextExpandedRowKeys);
  };

  useEffect(() => {
    const { codigo } = router.query
    if(codigo){
      const key = descriptografar(codigo)
      const id =  key.match(/\d+/g)[0];
      console.log(criptografar('211DEZEMBRO2022'))
      console.log(`key: ${key} | idcustomer: ${id}`)
    if (key) {
      axios.get('/api/get/qwPackageByKey?key=' + key).then(({data:qwpackage}) => {
        setRequestData(qwpackage[0]);
        return qwpackage
      })
      .then(()=>{
          let quickwinsList = 
            axios.get('/api/get/quickwinsByKey?page=1&fkIdqwpackage='+key).then(({data})=>{
              setQuickwins(data)
              return data
            })
            
      })
      .then(() =>axios.get('/api/get/customersById?idcustomer='+id).then(({ data }) => {
        console.log(`Cliente: ${data[0].nmcustomer}`)
        setCustomer(data[0])
        return data[0]
      }))
    }
  }
  }, [router])
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
      <Container style={{ minHeight: "100vh", margin: 'auto' }} >
      <div
        style={{
          margin: "0 auto",
          paddingTop: "15vh",
        }}
      >
        <Image
            src={"/searchhub-colored.png"}
            width={389}
            height={78}
            alt="Logo branca SearchHUB"
          />
          </div>
        <Panel >
          {requestData.nbtotalqws ?
            <Panel>
              <Stack  direction="column" alignItems={"baseline"} justifyContent={"space-between"} style={{
          width: "100%"
        }}>
              <p><Tag style={{
            background: "var(--color-conversion-1)",
            color: 'white'
          }}>{customer.nmcustomer && customer.nmcustomer}</Tag> {capitalizeFirstLetter((requestData.dsmounthyear)?.toLowerCase()).replace('-', ', ')}</p>

          <Stack alignItems={"center"} justifyContent={"space-between"} style={{
            marginTop: 20
          }}>
            <Stack alignItems={"center"} justifyContent={"space-between"}>
              Status: {<Tag style={{
                margin: '0px 10px'
              }}>{requestData.dsstatus}</Tag>}
            </Stack>
            <Stack alignItems={"center"} justifyContent={"space-between"}>
              Total de quickwins: {<Tag style={{
                margin: '0px 10px'
              }}>{requestData.nbtotalqws}</Tag>}
            </Stack>
            <Stack alignItems={"center"} justifyContent={"space-between"}>
              Total de palavras: {<Tag style={{
                margin: '0px 10px'
              }}>{requestData.nbtotalkeywords}</Tag>}
            </Stack>
          </Stack>
              </Stack>

            </Panel> :
            <Panel>
              <Placeholder />
            </Panel>}
            <Quickwins
            tableData={quickwins}

            />
            
          
        </Panel>
      </Container>
    </div>
  );
}

Teste.auth = 'open'
export default Teste;

