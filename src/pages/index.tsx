import { Box, Container } from '@chakra-ui/react'
import { AnimatableBackground } from '~components/AnimatableBackground'
import { MotionScroll } from '~components/motion'
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
        <MotionScroll distance={800} mb="-600">
          <Intro />
          <Features />
        </MotionScroll>
      </Container>
      <Learn />
      <Container maxW="container.max" px={2}>
        <MotionScroll distance={400} mt="-100">
          <Mode />
        </MotionScroll>
      </Container>
      <Box h="500vh" />
    </AnimatableBackground>
  )
}
