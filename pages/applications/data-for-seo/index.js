import { FlexboxGrid, Container,  PanelGroup, Panel, Placeholder, Row, } from 'rsuite'
import DefaultLayout from '../../../Layouts/default'
import Form from '../../../components/Form/WorkedPages'
import { useState } from 'react'


function DataForSeo(args) {
  const [active, setActive] = useState('portal');
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} title="Gerenciar Data for Seo | SearchHub" description="SearchHub Conversion" background={2} pageName="[BETA] Gerenciar Data for Seo" >
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={24}>
            <Panel header={"Gerenciar Data for Seo"} style={{
              width: '50%',
              backgroundColor: "var(--rs-body)",
              margin:"auto"
            }} shaded bordered>
              <Row>
                <Form />
              </Row>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>


    </DefaultLayout >
  )
}

DataForSeo.auth = {}
export default DataForSeo