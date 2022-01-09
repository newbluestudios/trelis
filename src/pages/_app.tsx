import React from "react"

import { SessionProvider } from "next-auth/react"
import { AppProps } from "next/app"
import "../styles/tailwind.scss"

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps): JSX.Element {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  )
}

export default MyApp
