import Head from 'next/head'
import styles from '../../styles/Home.module.css'
import privateRoute from '../api/privateRoute'

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Search Hub | Conversion</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          SearchHUB <a href="https://conversion.com.br/">| Conversion</a>
        </h1>
      </main>
    </div>
  )
}

export default privateRoute(Home)