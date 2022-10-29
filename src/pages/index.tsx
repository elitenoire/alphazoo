import { Box, Container } from '@chakra-ui/react'
import { AnimatableBackground } from '~components/AnimatableBackground'
import { MotionScroll } from '~components/motion'
import { Underline } from '~components/Underline'
import Hero from '~components/home/Hero'
import Intro from '~components/home/Intro'
import Features from '~components/home/Features'
import Learn from '~components/home/Learn'
import Mode from '~components/home/Mode'
import Activity from '~components/home/Activity'
import FunWiki from '~components/home/FunWiki'
import Cta from '~components/home/Cta'
import Header from '~components/layouts/Header'
import Footer from '~components/layouts/Footer'

export default function Home() {
  return (
    <AnimatableBackground>
      <Header>
        <Hero />
      </Header>
      <main>
        <Container maxW="container.lg">
          <MotionScroll distance={800} mb="-600">
            <Intro />
            <Features />
          </MotionScroll>
        </Container>
        <Underline />
        <Learn />
        <Container maxW="container.max" px={2}>
          <MotionScroll distance={400} mt="-100">
            <Mode />
          </MotionScroll>
        </Container>
        <Activity />
        <Container maxW="container.max" px={2}>
          <FunWiki />
        </Container>
        <Underline />
        <Cta />
      </main>
      <Footer />
    </AnimatableBackground>
  )
}
