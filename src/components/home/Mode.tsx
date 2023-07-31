import NextLink from 'next/link'
import NextImage from 'next/image'
import type { Variants } from 'framer-motion'
import { Box, Flex, Heading, Text, Link, useToken } from '@chakra-ui/react'
import { MotionFlex, MagneticBox } from '~components/motion'
import { SfxButton } from '~components/sfx'
import { useScrollReveal } from '~/src/hooks/useScrollReveal'
import { HOMEPAGE_IDS, ROUTES } from '~src/constants'

import { ReactComponent as SquircleBgSvg } from '~public/img/bg-squircle.svg'
import ImgLearn from '~public/img/learn.svg'
import ImgPlay from '~public/img/play.svg'

const item: Variants = {
  hidden: (i: number) => ({ opacity: 0, x: i * 20 }),
  show: { opacity: 1, x: 0, transition: { duration: 0.5 } },
}

export default function Mode() {
  const { scrollReveal } = useScrollReveal()

  const [squircleBg] = useToken('colors', ['secondary.300'])

  return (
    <section aria-labelledby={HOMEPAGE_IDS.mode}>
      <MotionFlex
        justifyContent="center"
        mx={[null, 1, null, 5]}
        pt={[12, 24]}
        pb={[16, 24]}
        bg="secondary.100"
        rounded={['card', 'bigCard']}
        overflow="hidden"
        {...scrollReveal}
      >
        <Box w="full">
          <Box px={6} textAlign={[null, 'center']}>
            <Heading color="brand.600" fontSize="f4xl" id={HOMEPAGE_IDS.mode}>
              Learn + Play
            </Heading>
            <Text maxW="2xs" mx={[null, 'auto']} fontSize={['fxl', null, 'f2xl']} opacity={0.95}>
              Two fun and easy educational modes for kids to enjoy.
            </Text>
          </Box>
          <Flex justify="space-around" wrap="wrap" rowGap={6} columnGap={4} pt={10}>
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
                boxSize="full"
                maxW={['xs', null, null, null, null, 'md']}
                maxH={['xs', null, null, null, null, 'md']}
                m="auto"
                _hover={{
                  '& > div:first-of-type': { opacity: 0.35 },
                }}
              >
                <Box w="full" opacity={0.55} transition="opacity 0.2s">
                  <SquircleBgSvg fill={squircleBg} />
                </Box>
                <Box pos="absolute" w="80%" textAlign="center">
                  <NextImage
                    src={ImgLearn}
                    alt="Happy girl kneeling in front of a big ABC toy block"
                    unoptimized
                  />
                  <SfxButton
                    as={NextLink}
                    href={ROUTES.learn}
                    w="55%"
                    mt={2}
                    shadow="2xl"
                    _hover={{
                      boxShadow: 'lg',
                      transform: 'translateY(-2px)',
                    }}
                    bgColor="white"
                    colorScheme="gray"
                    variant="ghost"
                  >
                    Learn
                  </SfxButton>
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
                boxSize="full"
                maxW={['xs', null, null, null, null, 'md']}
                maxH={['xs', null, null, null, null, 'md']}
                m="auto"
                _hover={{
                  '& > div:first-of-type': { opacity: 0.35 },
                }}
              >
                <Box w="full" opacity={0.55} transition="opacity 0.2s">
                  <SquircleBgSvg fill={squircleBg} />
                </Box>
                <Box pos="absolute" w="80%" textAlign="center">
                  <NextImage
                    src={ImgPlay}
                    alt="Happy boy sitting infront of a big jigsaw puzzle and holding a red toy car"
                    unoptimized
                  />
                  <SfxButton
                    as={NextLink}
                    href={ROUTES.play}
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
                  </SfxButton>
                </Box>
              </MotionFlex>
            </MagneticBox>
          </Flex>
        </Box>
      </MotionFlex>
      <Text as="small" align="center" display="block" opacity={0.15} _hover={{ opacity: 0.4 }}>
        Artworks by{' '}
        <Link fontWeight="bold" href="https://www.vecteezy.com/members/studiogstock" isExternal>
          @studiogstock
        </Link>
        ,{' '}
        <Link fontWeight="bold" href="https://www.freepik.com/author/freepik" isExternal>
          @freepik
        </Link>
        .
      </Text>
    </section>
  )
}
