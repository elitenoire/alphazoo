import { useState, useRef, useEffect } from 'react'
import { useTransform, useScroll, useSpring, MotionValue } from 'framer-motion'
import { Box, AspectRatio, Flex, Heading } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MotionBoyDoodle, MotionGirlDoodle } from '~components/motion'

import { LearnLettersBoard } from './LearnLettersBoard'

// import { ReactComponent as HandSvg } from '~public/img/dd-hand.svg'
import { ReactComponent as HeartTrioSvg } from '~public/img/dd-heart-1.svg'
import { ReactComponent as HeartDuoSvg } from '~public/img/dd-heart-2.svg'

export default function Learn() {
  const [play, setPlay] = useState(false)
  const learnRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: learnRef,
    offset: ['start start', 'end end'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const girlScale = useTransform(yScroll, [0, 0.35], [0.4, 0.85])
  const radius = useTransform(yScroll, [0.35, 1], ['0vmin', '85vmin'])

  // Hand
  // const handY = useTransform(yScroll, [0.15, 0.45, 0.75], ['30%', '0%', '-5%'])

  useEffect(() => {
    const unsubscribe = yScroll.onChange((val) => {
      setPlay(val > 0.5)
    })

    return () => {
      unsubscribe()
    }
  }, [yScroll])

  return (
    <>
      <MotionBox
        ref={learnRef}
        pos="relative"
        mt={-300}
        mb={[null, null, null, 20]}
        bg="brand.400"
        borderTopLeftRadius="85vmin"
        borderTopRightRadius="85vmin"
        style={{
          borderBottomLeftRadius: radius,
          borderBottomRightRadius: radius,
        }}
      >
        <Flex pos="absolute" top={0} left={0} align="flex-start" w="100%" h="100%">
          <AspectRatio pos="sticky" top={0} w="full" ratio={1}>
            <MotionFlex borderRadius="50%" bg="yellow.200" style={{ scale: girlScale }}>
              <Box w="40%">
                <MotionGirlDoodle play={play} />
              </Box>
              <Box w="16%" pt="30%">
                <HeartTrioSvg />
              </Box>
            </MotionFlex>
          </AspectRatio>
          {/* <MotionBox
            w="95%"
            maxW={['30em', null, null, null, '35em']}
            m="auto"
            style={{ y: handY }}
          >
            <HandSvg />
          </MotionBox> */}
          <Flex pos="absolute" bottom={0} align="center" justify="flex-end" w="full">
            <Box w="12%" maxW="5.5em">
              <HeartDuoSvg />
            </Box>
            <Box w="30%" maxW="14em">
              <MotionBoyDoodle />
            </Box>
          </Flex>
        </Flex>
        <Heading
          textStyle="liga"
          pos="relative"
          zIndex={1}
          maxW="600px"
          mr={[null, null, 4]}
          ml={[null, null, 'auto']}
          pt={24}
          pb={28}
          fontSize="f5xl"
          textAlign={['center', null, 'right']}
        >
          Let&apos;s Learn Together
        </Heading>
      </MotionBox>
      <LearnLettersBoard />
    </>
  )
}
