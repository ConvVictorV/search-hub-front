import DefaultLayout from '../Layouts/default'
import styles from '../styles/Home.module.css'
function Home() {
  return (
    <DefaultLayout title="Home | SearchHub" description="SearchHub Conversion">
    <h1 className={styles.title}>
      SearchHUB <a href="http://conversion.com.br/" target={'_blank'} rel={"noreferrer"}>| Conversion</a>
    </h1>
    </DefaultLayout>
  )
}
Home.auth = {}
export default Home