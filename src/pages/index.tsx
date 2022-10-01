import { Box } from '@chakra-ui/react'
import { AnimatableBackground } from '~components/AnimatableBackground'
import Hero from '~components/home/Hero'
import Intro from '~components/home/Intro'
import Learn from '~components/home/Learn'
import Mode from '~components/home/Mode'

export default function Home() {
  return (
    <AnimatableBackground>
      <Hero />
      <Intro />
      <Learn />
      <Mode />
      <Box h="500vh" />
    </AnimatableBackground>
  )
}
