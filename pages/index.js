import { signOut } from 'next-auth/react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Hub | Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SearchHUB <a href="http://conversion.com.br/" target={'_blank'} rel={"noreferrer"}>| Conversion</a>
        </h1>
        <button className={styles.btn_logout} onClick={()=>signOut()}>Logout</button>
      </main>
    </div>
  )
}

Home.auth = {}