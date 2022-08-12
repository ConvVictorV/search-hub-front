import Head from 'next/head'
import Container from 'rsuite/Container';
import Sidenav from '../components/Navs/Sidenav'
import Grid from 'rsuite/Grid';
import Row from 'rsuite/Row';
import Col from 'rsuite/Col';
import Header from '../components/Header';
import getBackground from '../components/Backgrounds'
import Script from 'next/script'

function FullWidthLayout(args) {
    return (
        <Container>
            <Head>
                <title>{args.title || 'Search Hub | Conversion'}</title>
                <meta name="description" content={args.description || ''} />
                {args.indexable == false ? <meta key="robots" name="robots" content="noindex,nofollow" /> : <meta key="robots" name="robots" content="index,follow" />}
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Container style={{
                background: `no-repeat center/cover url('${args.background ? getBackground(args.background) : false}')`,
                minHeight: "100vh"
            }}>
                <Sidenav />
                <Container>
                    <Script id="google-analytics" strategy="afterInteractive">
                        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id=%27+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NMH86KG');
        `}
                    </Script>
                    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-NMH86KG"
                        height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
                    <Header toggleTheme={args.toggleTheme} pageName={args.pageName} />
                    {args.children}
                </Container>
            </Container>
        </Container>
    )
}

export default FullWidthLayout;