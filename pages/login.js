import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { signIn, useSession } from "next-auth/react"
import Home from './index'
import { useRouter } from 'next/router'
import { useEffect } from 'react'



export default function Login() {
  const { status } = useSession()
  const router = useRouter()
  useEffect(()=>{
    if (status === "authenticated") router.push('/')
  })
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Hub | Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>
          SearchHUB <a href="http://conversion.com.br/">| Conversion</a>
        </h1>
        <h2 className={styles.subtitle}>Faça <a href="#" onClick={(e) => {e.preventDefault();signIn("google",{redirect:"http://localhost:3000/"})}}>login</a> para continuar, ou se preferir, <a href="/">volte ao inicio</a></h2>
      </main>
    </div>
  )
}
