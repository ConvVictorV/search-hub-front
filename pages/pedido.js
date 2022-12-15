import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Badge, Button, Container, FlexboxGrid, Table, Panel, Placeholder } from "rsuite";
import getBackground from "../components/Backgrounds";
import Quickwins from "../components/Tables/applications/pedidos-de-producao/readonly";

const { HeaderCell, Cell, Column } = Table;


function Teste(props) {
  const router = useRouter()
  const [requestData, setRequestData] = useState([])
  const [quickwins, setQuickwins] = useState([])
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
      axios.get('/api/get/textTopic/textTopic?idquickwin=' + rowData.id).then(({ data }) => {
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
    const { redator, id } = router.query

    if (id) {
      axios.get('/api/get/textsrequests?page=1&idcustomer=' + id)
      .then(({ data: textrequest }) => {
        if (textrequest.fkwriter == redator) {
          setRequestData(textrequest);
          return textrequest
        }
      }).then((textrequest)=>{
        if(textrequest.fkidquickwin){
          let quickwinsList = []
          textrequest.fkidquickwin.map(idqw=>{
            axios.get('/api/get/quickwinsById?page=1&idcustomer='+idqw).then(({data})=>{
              quickwinsList.push(data[0])
            })
          })
          setQuickwins(quickwinsList)
        }
      })
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
      <Container style={{ height: "100vh", margin: 'auto', overflowY: 'scroll!important' }} >
        <Panel style={{
        overflowY: 'scroll!important'
      }}>
          {requestData.nbtotalqws ?
            <Panel>
              <h5>Quantidade total de textos: <br></br><i>{requestData.nbtotalqws}</i></h5><br></br>
              <h5>Quantidade total de palavras: <br></br><i>{requestData.nbtotalkeywords}</i></h5><br></br>
              <h5>Prazo final de entrega do pedido: <br></br><i>{new Date((requestData.dtdeadline)).toLocaleDateString()}</i></h5><br></br>
              <h5>Orientações: <br></br><i>{requestData.dsorientation}</i></h5><br></br>
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

