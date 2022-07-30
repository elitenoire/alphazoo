import { Link as ChakraLink, Text, Code, List, ListIcon, ListItem } from '@chakra-ui/react'
import { CheckCircleIcon, LinkIcon } from '@chakra-ui/icons'

import { Hero } from '../components/Hero'
import { Container } from '../components/Container'
import { Main } from '../components/Main'
import { DarkModeSwitch } from '../components/DarkModeSwitch'
import { CTA } from '../components/CTA'
import { Footer } from '../components/Footer'

const Index = () => (
  <Container height="100vh">
    <Hero />
    <Main>
      <Text color="text">
        Example repository of <Code>Next.js</Code> + <Code>chakra-ui</Code> +{' '}
        <Code>TypeScript</Code>.
      </Text>

      <List my={0} color="text" spacing={3}>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink flexGrow={1} mr={2} href="https://chakra-ui.com" isExternal>
            Chakra UI <LinkIcon />
          </ChakraLink>
        </ListItem>
        <ListItem>
          <ListIcon as={CheckCircleIcon} color="green.500" />
          <ChakraLink flexGrow={1} mr={2} href="https://nextjs.org" isExternal>
            Next.js <LinkIcon />
          </ChakraLink>
        </ListItem>
      </List>
    </Main>

    <DarkModeSwitch />
    <Footer>
      <Text>Next ❤️ Chakra</Text>
    </Footer>
    <CTA />
  </Container>
)

export default Index
