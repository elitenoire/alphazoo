import { useState, useRef, useEffect } from 'react'
import NextImage from 'next/future/image'
import { useTransform, useScroll, useSpring, MotionValue } from 'framer-motion'
import { Box, AspectRatio, Flex, Heading } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MotionBoyDoodle, MotionGirlDoodle } from '~components/motion'

import { LearnLettersBoard } from './LearnLettersBoard'

import { ReactComponent as HandSvg } from '~public/img/dd-hand.svg'
import { ReactComponent as HeartTrioSvg } from '~public/img/dd-heart-1.svg'
import { ReactComponent as HeartDuoSvg } from '~public/img/dd-heart-2.svg'

export default function Learn() {
  const [play, setPlay] = useState(false)
  const learnRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: learnRef,
    offset: ['start 0.5', 'end start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>

  // Girl Doodle
  const girlScale = useTransform(yScroll, [0.1, 0.35], [2, 1])
  const girlX = useTransform(yScroll, [0.15, 0.375], ['-50%', '-170%'])
  const girlY = useTransform(yScroll, [0.15, 0.45, 0.5, 0.7], ['120%', '400%', '400%', '380%'])

  // Hand
  const handY = useTransform(yScroll, [0.15, 0.45, 0.75], ['30%', '0%', '-5%'])

  useEffect(() => {
    const unsubscribe = yScroll.onChange((val) => {
      setPlay(val > 0)
      // console.log(val)
    })

    return () => {
      unsubscribe()
    }
  }, [yScroll])

  return (
    <>
      <Box ref={learnRef} pos="relative" py={40}>
        <Flex pos="absolute" top={0} left={0} align="flex-start" w="100%" h="100%">
          <MotionBox
            w="95%"
            maxW={['30em', null, null, null, '35em']}
            m="auto"
            style={{ y: handY }}
          >
            <HandSvg />
          </MotionBox>
          <MotionFlex
            alignItems="flex-end"
            pos="absolute"
            top={0}
            left="50%"
            zIndex={2}
            borderRadius="50%"
            bg="yellow.200"
            p={6}
            style={{ scale: girlScale, x: girlX, y: girlY }}
          >
            <Box w={['10em', null, null, '12.5em']}>
              <MotionGirlDoodle play={play} />
            </Box>
            <Box w={['3.75em', null, null, '5em']}>
              <HeartTrioSvg />
            </Box>
          </MotionFlex>
          <MotionBox
            pos="absolute"
            bottom="25%"
            right="10%"
            w="100%"
            maxW={['10em', null, '12em', null, '14em']}
            transition={{ type: 'spring', duration: 1 }}
            initial={{ opacity: 0, scale: 0.4 }}
            viewport={{ margin: '0px 0px -10% 0px' }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <AspectRatio w="100%" ratio={1}>
              <NextImage src="/img/flower-1.svg" alt="" sizes="100vw" fill />
            </AspectRatio>
          </MotionBox>
          <MotionBox
            pos="absolute"
            left="10%"
            bottom="18%"
            w="100%"
            // alignSelf="center"
            maxW={['8em', null, '10em', null, '12em']}
            zIndex={1}
            transition={{ type: 'spring', duration: 1 }}
            initial={{ opacity: 0, scale: 0.45 }}
            viewport={{ margin: '0px 0px -10% 0px' }}
            whileInView={{ opacity: 1, scale: 1 }}
          >
            <AspectRatio w="100%" ratio={1}>
              <NextImage src="/img/flower-2.svg" alt="" sizes="100vw" fill />
            </AspectRatio>
          </MotionBox>
          <Box pos="absolute" right={5} bottom={0} w={['10em', null, null, '12.5em']}>
            <MotionBoyDoodle />
          </Box>
          <Box pos="absolute" right="22.5%" bottom="12.5%" w={['3.75em', null, null, '5em']}>
            <HeartDuoSvg />
          </Box>
        </Flex>
        <Heading
          textStyle="liga"
          pos="relative"
          zIndex={1}
          maxW="600px"
          mr={4}
          ml="auto"
          // my={4}
          py={32}
          fontSize="f5xl"
          textAlign="right"
        >
          Let&apos;s{' '}
          <Box as="span" sx={{ color: 'inherit' }}>
            Learn
          </Box>{' '}
          Together
          {/* The flavor Lettucce farm waffles */}
        </Heading>
      </Box>
      <LearnLettersBoard />
    </>
  )
}
