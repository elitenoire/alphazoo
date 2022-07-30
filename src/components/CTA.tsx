import { Link as ChakraLink, Button } from '@chakra-ui/react'

import { Container } from '~components/Container'

export const CTA = () => (
  <Container flexDirection="row" position="fixed" bottom={0} width="full" maxWidth="3xl" py={3}>
    <Button
      as={ChakraLink}
      flexGrow={1}
      w="full"
      mx={2}
      colorScheme="green"
      href="https://chakra-ui.com"
      isExternal
      rounded="button"
      variant="outline"
    >
      chakra-ui
    </Button>
    <Button
      as={ChakraLink}
      flexGrow={3}
      w="full"
      mx={2}
      colorScheme="green"
      href="https://github.com/vercel/next.js/blob/canary/examples/with-chakra-ui-typescript"
      isExternal
      rounded="button"
      variant="solid"
    >
      View Repo
    </Button>
  </Container>
)
