import NextDocument, { Html, Head, Main, NextScript } from 'next/document'
import { ColorModeScript } from '@chakra-ui/react'

export default class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon.ico" />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bc175" />
          <meta name="msapplication-TileColor" content="#94eaaa" />
          <meta name="msapplication-square150x150logo" content="/mstile-150x150.png" />
          <meta name="theme-color" content="#94eaaa" />
          <meta name="apple-mobile-web-app-title" content="Alphazoo" />
          <meta name="application-name" content="Alphazoo" />
          <link rel="manifest" href="/manifest.json" />
        </Head>
        <body>
          {/* Make Color mode to persists when you refresh the page. */}
          <ColorModeScript />
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
