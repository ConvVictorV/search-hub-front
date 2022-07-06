import Head from 'next/head'
import Container from 'rsuite/Container';
import Sidenav from '../components/Navs/Sidenav'
import Grid from 'rsuite/Grid';
import Row from 'rsuite/Row';
import Col from 'rsuite/Col';
import Header from '../components/Header';
import getBackground from '../components/Backgrounds'

function DefaultLayout(args) {
    return (
        <Container>
            <Head>
                <title>{args.title || 'Search Hub | Conversion'}</title>
                <meta name="description" content={args.description || ''} />
                {args.indexable == false ? <meta key="robots" name="robots" content="noindex,nofollow" /> : <meta key="robots" name="robots" content="index,follow" />}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container style={{
                background:`no-repeat center/cover url('${ args.background ? getBackground(args.background) : false}')`,
            }}>
                <Sidenav />
                <Container>
                    <Header toggleTheme={args.toggleTheme} pageName={args.pageName}  />
                    <Grid>
                        <Row>
                            <Col style={{ width: '100%', minHeight: "100vh" }}>
                                {args.children}
                            </Col>
                        </Row>
                    </Grid>
                </Container>
            </Container>
        </Container>
    )
}

export default DefaultLayout;