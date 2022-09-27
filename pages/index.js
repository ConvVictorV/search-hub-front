import { useSession } from "next-auth/react";
import Image from "next/image";
import DefaultLayout from "../Layouts/default";
function Home(args) {
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
    </DefaultLayout>
  );
}
Home.auth = {};
export default Home;
