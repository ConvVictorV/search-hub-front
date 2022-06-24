import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Login() {
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
        <h2 className={styles.subtitle}>Faça <a href="#">login</a> para continuar, ou se preferir, <a href="/">volte ao inicio</a></h2>
      </main>
    </div>
  )
}
