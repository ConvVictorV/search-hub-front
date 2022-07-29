import 'rsuite/dist/rsuite.min.css';
import '../styles/globals.css';
import { SessionProvider, useSession } from "next-auth/react"
import Login from './login'
import { CustomProvider } from 'rsuite';
import { createContext, useEffect, useState } from 'react';
import ptbr from 'rsuite/locales/pt_BR';
import { useRouter } from 'next/router';


export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}) {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setTheme(localStorage.getItem('theme') || "light") 
      localStorage.setItem("host",window.location.origin)
    }
  }, [])
  let toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light')
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
    return <div>Loading...</div>
  }

  return children
}
