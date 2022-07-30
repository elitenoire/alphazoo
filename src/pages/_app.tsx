import { ChakraProvider } from '@chakra-ui/react'

import { AppProps } from 'next/app'
import theme from '../theme'

// Custom fonts
import '@fontsource/mitr/latin.css'
import '@fontsource/mali/latin-400.css'
import '@fontsource/wendy-one/latin.css'
import '@fontsource/mochiy-pop-one/latin.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
