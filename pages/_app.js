import { SessionProvider, useSession } from "next-auth/react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite.min.css";
import ptbr from "rsuite/locales/pt_BR";
import * as gtag from "../components/Gtag";
import "../styles/globals.css";
import Login from "./login";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [theme, setTheme] = useState("light");
  const router = useRouter();
  useEffect(() => {
    typeof window !== "undefined"
      ? setTheme(localStorage.getItem("theme") || "light")
      : false;
    const handleRouteChange = (url) => {
      gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);
  let toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      localStorage.setItem("theme", "dark");
    } else {
      setTheme("light");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}
    >
      {Component.auth ? 
       (Component.auth == 'open') ? 
       
            <Component
              toggleTheme={toggleTheme}
              {...pageProps}
            />
         
       : (
        <Auth>
          <CustomProvider theme={theme} locale={ptbr}>
            <Component
              toggleTheme={toggleTheme}
              {...pageProps}
              session={session}
            />
          </CustomProvider>
        </Auth>
      ) : (
        <>
          <gtag.Scripts />
          <Login {...pageProps} />
        </>
      )}
    </SessionProvider>
  );
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true });

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>Search Hub | Conversion</title>
          <meta name="description" content="Search Hub" />
          <meta key="robots" name="robots" content="noindex,nofollow" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <gtag.Scripts />
        <div>Loading..</div>
      </>
    );
  }

  return (
    <>
      <gtag.Scripts />
      {children}
    </>
  );
}
