import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import SEO from '~/next-seo.config'

import theme from '~/src/theme'

// Custom fonts
import '@fontsource/mitr/latin-700.css'
import '~src/styles/fonts.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
