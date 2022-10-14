import { useSession } from "next-auth/react";
import Image from "next/image";
import DefaultLayout from "../Layouts/default"; import {
  Breadcrumb,
  Dropdown,
  FlexboxGrid,
  Navbar,
  Tag,
  Tooltip,
  Whisper,
} from "rsuite";
import Select from '../components/Form/Components/Select'
import { useRouter } from "next/router";

function Home(args) {
  const route = useRouter();
  const session = useSession();
  return (
    <DefaultLayout
      toggleTheme={args.toggleTheme}
      background={10}
      pageName="Inicio"
      breadcrumb={false}
    >
      <div
        style={{
          margin: "auto",
          display: "block",
          width: "fit-content",
          paddingTop: "20vh",
        }}
      >
        <Image
          src={"/searchhub-white.png"}
          width={389}
          height={78}
          alt="Logo branca SearchHUB"
        />
      </div>
      <h1
        style={{
          textAlign: "center",
          color: "white",
          fontSize: "24px",
          fontWeight: "normal",
          fontStyle: "italic",
        }}
      >
        Crie e gerencie <b>estratégias de SEO</b> que funcionam e dão resultados!
      </h1>
      
      <span style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        fontSize: '11px',
        color: 'var(--color-conversion-1)'
      }}><Select
          fetch="/api/get/select/customersId"
          placeholder="Filtre por cliente"
          size="lg"
          style={{
            width: "100%",
            maxWidth: "500px",
            margin:"50px auto"
          }}
        />
      </span>
      
    </DefaultLayout>
  );
}
Home.auth = {};
export default Home;
