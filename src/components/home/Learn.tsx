import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useTransform, useScroll, useSpring } from 'framer-motion'
import { Box, AspectRatio, Flex, Heading, Container } from '@chakra-ui/react'
import { MotionBox, MotionFlex } from '~components/motion'
import { HOMEPAGE_IDS } from '~src/constants'
import { LearnLettersBoard } from './LearnLettersBoard'

import { ReactComponent as BeeSvg } from '~public/img/bee.svg'

export default function Learn() {
  const learnRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: learnRef,
    offset: ['start end', 'end start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const girlScale = useTransform(yScroll, [0, 0.35], [0.4, 0.85])
  const radius = useTransform(yScroll, [0.35, 0.75], ['0vmin', '85vmin'])

  return (
    <section aria-labelledby={HOMEPAGE_IDS.learn}>
      <Container as="header" maxW="container.max" p={0}>
        <Heading
          maxW="container.lg"
          mb={28}
          mx="auto"
          px={2}
          color="background"
          fontSize={['f2xl', 'f3xl']}
          fontWeight={500}
          textAlign="center"
          variant="body"
        >
          Did you know kids learn best through{' '}
          <Box as="strong" color="brand.dark">
            play
          </Box>
          ?
        </Heading>
        <MotionBox
          ref={learnRef}
          pos="relative"
          mb={[null, null, null, 20]}
          bg="brand.700"
          roundedTop="85vmin"
          style={{
            borderBottomLeftRadius: radius,
            borderBottomRightRadius: radius,
          }}
        >
          <Flex pos="absolute" top={0} left={0} align="flex-start" w="full" h="full">
            <AspectRatio pos="sticky" top={0} w="full" ratio={1}>
              <MotionFlex rounded="circle" bg="secondary.200" style={{ scale: girlScale }}>
                <MotionBox
                  w="50%"
                  whileInView={{
                    // Toggle transforms for a different circular motion
                    x: [0, -80, 80, 0, -80, 0, 0, 80, 0, 0],
                    y: [0, 80, -80, 0, 0, 80, 0, 0, -80, 0],
                    rotate: [0, 15, -15, 0, 15, -15, 0],
                    // rotate: [0, 360],
                    transition: { repeat: Infinity, repeatType: 'reverse', duration: 10 },
                  }}
                  // transformTemplate={({ rotate }) =>
                  //   `rotate(${rotate}) translateX(80px) rotate(-${rotate})`
                  // }
                >
                  <BeeSvg />
                </MotionBox>
              </MotionFlex>
            </AspectRatio>
          </Flex>
          <Heading
            as="h3"
            pos="relative"
            zIndex={1}
            maxW="600px"
            mr={['auto', null, 4]}
            ml="auto"
            pt={24}
            pb={32}
            color="brand.dark"
            fontSize="f4xl"
            textAlign={['center', null, 'right']}
            id={HOMEPAGE_IDS.learn}
          >
            Let&apos;s Learn Together
          </Heading>
        </MotionBox>
      </Container>
      <LearnLettersBoard />
    </section>
  )
}
