import { useRef } from 'react'
import NextImage from 'next/future/image'
import { useTransform, useScroll, useSpring } from 'framer-motion'
import { Box, Flex, Heading, Text, Button, useToken } from '@chakra-ui/react'
import { MotionFlex, MagneticBox } from '~components/motion'
import { HOMEPAGE_IDS } from '~src/constants'

import { ReactComponent as SquircleBgSvg } from '~public/img/bg-squircle.svg'
import ImgLearn from '~public/img/learn.svg'
import ImgPlay from '~public/img/play.svg'
import ImgPanda from '~public/img/panda.svg'

const item = {
  hidden: (i: number) => ({ opacity: 0, x: i * 20 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Mode() {
  const modeRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: modeRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.875, 1]), { stiffness: 60 })

  const [squircleBg] = useToken('colors', ['accent.200'])

  return (
    <section aria-labelledby={HOMEPAGE_IDS.mode}>
      <MotionFlex
        ref={modeRef}
        pos="relative"
        justifyContent="center"
        mx={[null, 1, null, 7]}
        pt={[12, 24]}
        pb={16}
        bg="accent.400"
        rounded={['2em', '4em']}
        overflow="hidden"
        style={{ scale }}
      >
        <Box pos="relative" zIndex={1} w="full">
          <Box px={6} textAlign={[null, 'center']}>
            <Heading color="accent.900" fontSize={['f4xl', 'f5xl']} id={HOMEPAGE_IDS.mode}>
              Learn + Play
            </Heading>
            <Text maxW="2xs" mx="auto" color="accent.50" fontSize={['fxl', null, 'f2xl']}>
              Two fun and easy educational modes for kids to enjoy.
            </Text>
          </Box>
          <Flex justify="space-around" wrap="wrap" rowGap={6} columnGap={4} mt={10} mb={14}>
            <MagneticBox flex={['1 1 100%', '1 1 45%']} mx={[2, 0]}>
              <MotionFlex
                variants={item}
                custom={-1}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.3 }}
                flexDir="column"
                pos="relative"
                alignItems="center"
                justifyContent="center"
                w="full"
                h="full"
                maxW={['xs', null, null, null, null, 'md']}
                maxH={['xs', null, null, null, null, 'md']}
                m="auto"
                _hover={{
                  '& > div:first-of-type': { opacity: 0.85 },
                }}
              >
                <Box w="full" opacity={0.5} transition="opacity 0.2s">
                  <SquircleBgSvg fill={squircleBg} />
                </Box>
                <Box pos="absolute" w="80%" textAlign="center">
                  <NextImage
                    src={ImgLearn}
                    alt="Happy girl kneeling infront of a big ABC toy block"
                  />
                  <Button
                    w="55%"
                    mt={2}
                    color="accent.500"
                    shadow="2xl"
                    _hover={{
                      boxShadow: 'lg',
                      transform: 'translateY(-2px)',
                    }}
                    _active={{
                      bgColor: 'accent.200',
                    }}
                    bgColor="accent.50"
                    colorScheme="accent"
                  >
                    Learn
                  </Button>
                </Box>
              </MotionFlex>
            </MagneticBox>
            <MagneticBox flex={['1 1 100%', '1 1 45%']} mx={[2, 0]}>
              <MotionFlex
                variants={item}
                custom={1}
                initial="hidden"
                whileInView="show"
                viewport={{ amount: 0.35 }}
                flexDir="column"
                pos="relative"
                alignItems="center"
                justifyContent="center"
                w="full"
                h="full"
                maxW={['xs', null, null, null, null, 'md']}
                maxH={['xs', null, null, null, null, 'md']}
                m="auto"
                _hover={{
                  '& > div:first-of-type': { opacity: 0.85 },
                }}
              >
                <Box w="full" opacity={0.5} transition="opacity 0.2s">
                  <SquircleBgSvg fill={squircleBg} />
                </Box>
                <Box pos="absolute" w="80%" textAlign="center">
                  <NextImage
                    src={ImgPlay}
                    alt="Happy boy sitting infront of a big jigsaw puzzle and holding a red toy car"
                  />
                  <Button
                    w="55%"
                    mt={2}
                    shadow="2xl"
                    _hover={{
                      bgColor: 'brand.600',
                      boxShadow: 'lg',
                      transform: 'translateY(-2px)',
                    }}
                    bgColor="brand.500"
                  >
                    Play
                  </Button>
                </Box>
              </MotionFlex>
            </MagneticBox>
          </Flex>
        </Box>
        <Box pos="absolute" bottom={0} w={['45%', null, '30%']}>
          <NextImage src={ImgPanda} alt="Cute panda torso" />
        </Box>
      </MotionFlex>
    </section>
  )
}
