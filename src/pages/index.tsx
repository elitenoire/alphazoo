import { Box, Container } from '@chakra-ui/react'
import { AnimatableBackground } from '~components/AnimatableBackground'
import Hero from '~components/home/Hero'
import Intro from '~components/home/Intro'
import Features from '~components/home/Features'
import Learn from '~components/home/Learn'
import Mode from '~components/home/Mode'

export default function Home() {
  return (
    <AnimatableBackground>
      <Hero />
      <Container maxW="container.lg">
        <Intro />
        <Features />
      </Container>
      <Learn />
      <Mode />
      <Box h="500vh" />
    </AnimatableBackground>
  )
}
