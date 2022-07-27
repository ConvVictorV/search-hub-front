import { ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, PanelGroup, Panel, Placeholder, Row, Nav } from 'rsuite'
import DefaultLayout from '../../../Layouts/default'
import styles from '../../../styles/register/Customer.module.css'
import Select from '../../../components/Form/Select'
import TextField from '../../../components/Form/Textfield'
import Form from '../../../components/Form/ContentGap'
import { useState } from 'react'


function ContentGap(args) {
  const [active, setActive] = useState('portal');
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} title="ContentGap | SearchHub" description="SearchHub Conversion" background={2} pageName="[BETA] GAP Analysis" >
      <Container style={{ height: '80vh' }}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={24}>
            <Panel header={"Content Gap"} style={{
              width: '100%',
              backgroundColor: "var(--rs-body)",
            }} shaded bordered>
              <Row style={{
                display: "flex"
              }}>
                <Form style={{
                  minWidth:"50%"
                }} />

                <PanelGroup accordion defaultActiveKey={1} bordered style={{
                  width:"100%"
                }}>
                  <Panel header="PORTAL" eventKey={1} id="panel1">
                    <Placeholder.Paragraph rows={6} />
                  </Panel>
                  <Panel header="SEMRUSH" eventKey={2} id="panel2">
                    <Placeholder.Paragraph rows={6} />
                  </Panel>
                </PanelGroup>


              </Row>
            </Panel>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>


    </DefaultLayout >
  )
}

ContentGap.auth = {}
export default ContentGap