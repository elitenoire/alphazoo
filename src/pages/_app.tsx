import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { useRouter } from 'next/router'
import { DefaultSeo } from 'next-seo'
import { AnimatePresence } from 'framer-motion'
import { ChakraProvider } from '@chakra-ui/react'
import { getDefaultLayout } from '~components/layout/DefaultLayout'

import SEO from '~/next-seo.config'

import theme from '~src/theme'

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
  const getLayout = Component.getLayout ?? getDefaultLayout
  const { asPath: key } = useRouter()

  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <AnimatePresence>{getLayout(<Component key={key} {...pageProps} />)}</AnimatePresence>
    </ChakraProvider>
  )
}

export default MyApp
