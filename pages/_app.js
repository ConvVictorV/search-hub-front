import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css';
import { SessionProvider, useSession } from "next-auth/react"
import Login from './login'
import { CustomProvider } from 'rsuite';
import { createContext,useEffect,useState } from 'react';
import ptbr from 'rsuite/locales/pt_BR';
import Head from 'next/head'
import { usePagesViews } from "nextjs-google-analytics";
import { GoogleAnalytics } from "nextjs-google-analytics-gtm";
export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  usePagesViews();
  const [theme, setTheme] = useState('light');
  useEffect(()=>{
    typeof window !== 'undefined' ? setTheme(localStorage.getItem('theme') || "light") : false
  },[])
  let toggleTheme = () => {
    if(theme === 'light'){
      setTheme('dark')
      localStorage.setItem('theme','dark')
    }else{
      setTheme('light');
      localStorage.setItem('theme','light')
    }
  }

  return (
    <SessionProvider
      session={session}
      // Re-fetch session every 5 minutes
      refetchInterval={5 * 60}
      // Re-fetches session when window is focused
      refetchOnWindowFocus={true}>
      {Component.auth ? (
        <Auth>
          <CustomProvider theme={theme} locale={ptbr}>
            <Component toggleTheme={toggleTheme} {...pageProps} session={session} />
          </CustomProvider>
        </Auth>
      ) : (
        <Login {...pageProps} />
      )}
    </SessionProvider>
  )
}

function Auth({ children }) {
  // if `{ required: true }` is supplied, `status` can only be "loading" or "authenticated"
  const { status } = useSession({ required: true })

  if (status === "loading") {
    return (
      <>
      <Head>
          <title>Search Hub | Conversion</title>
          <meta name="description" content="Search Hub" />
          <meta key="robots" name="robots" content="noindex,nofollow" />
          <link rel="icon" href="/favicon.ico" />
          <GoogleAnalytics />
      </Head>
      <div>Loading...</div>
      </>
    )
  }

  return children
}
