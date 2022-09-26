import { AppProps } from 'next/app'
import { DefaultSeo } from 'next-seo'
import { ChakraProvider } from '@chakra-ui/react'

import SEO from '~/next-seo.config'

import theme from '~/src/theme'

// Custom fonts
import '@fontsource/mitr/latin-700.css'
import '@fontsource/wendy-one/latin.css'
// Use local github copy because dlig and ss01
// not working with google version
// import '~src/assets/fonts/grandstander/index.css'
import '@fontsource/grandstander/latin-800.css'

import '~src/assets/fonts/owen-pro/index.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <DefaultSeo {...SEO} />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
