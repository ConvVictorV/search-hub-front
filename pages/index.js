import DefaultLayout from '../Layouts/default'
import styles from '../styles/Home.module.css'
function Home() {
  return (
    <DefaultLayout toggleTheme={args.toggleTheme} background={1} pageName="Inicio" >
    </DefaultLayout>
  )
}
Home.auth = {}
export default Home