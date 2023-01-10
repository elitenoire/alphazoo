import { NextPage } from 'next'
import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ReactElement, ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'

import SEO from '~/next-seo.config'

import theme from '~/src/theme'

// Custom fonts
import '@fontsource/mitr/latin-700.css'
import '~src/styles/fonts.css'

export type NextPageWithLayout<P = Record<string, unknown>, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page)
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}

export default MyApp
