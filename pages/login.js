import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Login.module.css'
import { signIn, useSession } from "next-auth/react"
import Home from './index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'
import { Form, ButtonToolbar, Button, FlexboxGrid, Container, Checkbox, Schema, Panel, IconButton } from 'rsuite'
import EmailFillIcon from '@rsuite/icons/EmailFill';
export default function Login(props) {
  const { status } = useSession()
  const router = useRouter()
  useEffect(() => {
    if (status === "authenticated") router.push('/')
  })
  return (
    <div className={styles.backgroundAnimated}>
      <Head>
        <title>Search Hub | Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container style={{ height: '100vh' }} backgroundColor={"var(--rs-body)"}>
        <FlexboxGrid justify="center" align="middle" style={{ height: '100%' }}>
          <FlexboxGrid.Item colspan={12} justify="center" align="middle">
            <Image src={'/searchhub-white.png'} width={389} height={78} />
            <div style={{marginTop:'50px'}}>
              <IconButton icon={<EmailFillIcon  />} onClick={() => { signIn("google") }}  appearance="default">
                Entrar com Google
              </IconButton>
            </div>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Container>
    </div>
  )
}
