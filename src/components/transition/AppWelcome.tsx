import NextImage from 'next/image'
import { useEffect, useCallback } from 'react'
import { useAnimate, stagger } from 'framer-motion'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'
import { SfxButton } from '~components/sfx'

import ImgPanda from '~public/img/wlc-panda.svg'
import ImgPaw from '~public/img/wlc-paw.svg'
import ImgPlantOne from '~public/img/wlc-plant-1.svg'
import ImgPlantTwo from '~public/img/wlc-plant-2.svg'
import ImgVineOne from '~public/img/wlc-vine-1.svg'
import ImgVineTwo from '~public/img/wlc-vine-2.svg'
import ImgBg from '~public/img/bg-pattern-1.svg'

export const AppWelcome = () => {
  const [scope, animate] = useAnimate()

  const welcomeAnimation = useCallback(async () => {
    try {
      await animate([
        ['[data-wlc-paw]', { y: ['100%', '0%'] }, { duration: 2, delay: stagger(2 - 0.5 + 1) }],
        ['[data-wlc-textup]', { opacity: [0, 1], x: ['20%', '0%'] }, { duration: 1, at: 2 - 0.5 }],
        [
          '[data-wlc-textdown]',
          { opacity: [0, 1], x: ['-20%', '0%'] },
          { duration: 1, at: 2 + 2 - 0.5 + 1 },
        ],
        [
          '[data-wlc-plant]',
          { scale: [0, 1.2, 1] },
          { duration: 1, delay: stagger(0.5), at: '+0.5' },
        ],
        ['[data-wlc-paw]', { y: '100%' }, { duration: 1.75 }],
        ['[data-wlc-textdown]', { opacity: 0, scale: 0 }, { duration: 0.4, at: '-1' }],
        [
          '[data-wlc-plant]',
          { opacity: 0, scale: 0 },
          { duration: 0.4, delay: stagger(0.15), at: '-0.15' },
        ],
        ['[data-text-box]', { y: '-30vh', scale: 0.625 }, { duration: 0.6 }],
        ['[data-wlc-vine]', { y: ['-100%', '0%'] }, { duration: 0.8, at: '-0.3' }],
        ['[data-wlc-banner]', { y: ['100%', '0%'] }, { duration: 0.4, at: '<' }],
        ['[data-wlc-left-paw]', { x: ['-100%', '0%'] }, { duration: 0.6 }],
        ['[data-wlc-right-paw]', { x: ['100%', '0%'] }, { duration: 0.6, at: '<' }],
        ['[data-wlc-panda]', { y: ['70%', '30%', '35%', '0%'] }, { duration: 2.5 }],
        ['[data-wlc-contentbox]', { y: '-60%' }, { duration: 0.6 }],
        // ['[data-wlc-content]', { y: '-5%' }, { duration: 0.2, at: '<' }],
        ['[data-wlc-panda]', { y: '20%' }, { duration: 1 }],
        [
          '[data-wlc-fadeup]',
          { opacity: [0, 1], y: ['80%', '0%'] },
          { duration: 0.8, delay: stagger(0.4), at: '-0.6' },
        ],
      ])
      await animate([['[data-wlc-wrapper]', { overflow: 'auto' }, { duration: 0.0000000001 }]])
    } catch (err) {
      console.warn(err)
    }
  }, [animate])

  useEffect(() => {
    void welcomeAnimation()
  }, [welcomeAnimation])

  return (
    <Flex
      ref={scope}
      pos="fixed"
      zIndex="zen"
      align="center"
      justify="center"
      bg="bg.brand.warm"
      inset={0}
    >
      <Box pos="relative" zIndex={1} textAlign="center" textTransform="uppercase" data-text-box>
        <Box pos="relative" zIndex={1}>
          <Text
            color="text.inverse"
            fontSize="max(3.5rem, 10vw)"
            fontWeight="bold"
            lineHeight="none"
            data-wlc-textup
          >
            Grrr!
          </Text>
          <Text
            color="text.highlight"
            fontSize="max(3.5rem, 10vw)"
            fontWeight="bold"
            lineHeight="none"
            data-wlc-textdown
          >
            Hello!
          </Text>
        </Box>
        <Box pos="absolute" top={0} left="-50%" w="50%" transform="rotate(-45deg)">
          <AspectRatio data-wlc-plant ratio={1}>
            <NextImage fill src={ImgPlantOne} alt="" priority />
          </AspectRatio>
        </Box>
        <Box pos="absolute" right="-50%" bottom={0} w="50%" transform="rotate(45deg)">
          <AspectRatio data-wlc-plant ratio={1}>
            <NextImage fill src={ImgPlantTwo} alt="" priority />
          </AspectRatio>
        </Box>
      </Box>
      <Box
        pos="absolute"
        right={0}
        bottom="70%"
        w={['40%', null, '30%']}
        transform="auto"
        rotate="235deg"
        translateX={['25%', null, '50%']}
        translateY={['5%', null, '25%']}
      >
        <AspectRatio w="full" data-wlc-paw ratio={14 / 25}>
          <NextImage fill src={ImgPaw} alt="" priority />
        </AspectRatio>
      </Box>
      <Box
        pos="absolute"
        top="70%"
        left={0}
        w={['40%', null, '30%']}
        transform="auto"
        rotate="45deg"
        translateX={['-25%', null, '-50%']}
        translateY={['0%', null, '-20%']}
      >
        <AspectRatio w="full" data-wlc-paw ratio={14 / 25}>
          <NextImage fill src={ImgPaw} alt="" priority />
        </AspectRatio>
      </Box>
      <Box pos="absolute" top={0} left={0} w={[null, null, '30%', '20%']}>
        <AspectRatio w="full" data-wlc-vine ratio={3 / 2}>
          <NextImage fill src={ImgVineOne} alt="" />
        </AspectRatio>
      </Box>
      <Box pos="absolute" top={0} right={0} w={['80%', null, '50%', '35%']}>
        <AspectRatio w="full" data-wlc-vine ratio={5 / 2}>
          <NextImage fill src={ImgVineTwo} alt="" />
        </AspectRatio>
      </Box>

      <Box pos="absolute" zIndex={1} overflow="hidden" h="100%" data-wlc-wrapper inset={0}>
        <Flex
          pos="relative"
          align="center"
          justify="flex-end"
          direction="column"
          h="inherit"
          data-wlc-contentbox
        >
          <Box overflow="hidden" w="50%">
            <AspectRatio top="30%" w="full" data-wlc-panda ratio={7 / 6}>
              <NextImage fill src={ImgPanda} alt="" />
            </AspectRatio>
          </Box>
          <Box
            pos="relative"
            w="full"
            h="10%"
            bg="bg.brand.bright"
            _after={{
              content: '""',
              pos: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              h: '40%',
              bg: 'bg.brand.highlight',
            }}
            data-wlc-banner
          >
            <Box
              pos="absolute"
              zIndex={1}
              top={0}
              left="15%"
              w={16}
              h={8}
              bg="black"
              data-wlc-left-paw
            />
            <Box
              pos="absolute"
              zIndex={1}
              top={0}
              right="15%"
              w={16}
              h={8}
              bg="black"
              data-wlc-right-paw
            />
          </Box>
          <Flex
            pos="absolute"
            top="100%"
            right={0}
            left={0}
            minH="60%"
            p={2}
            bgGradient="linear(bg.brand.bright, bg.brand.warm)"
            data-wlc-content
          >
            <Box pos="absolute" opacity={0.25} inset={0}>
              <NextImage className="object-cover object-top" fill src={ImgBg} alt="" />
            </Box>
            <Flex
              sx={{
                '--fs-factor': { base: '8.5vw', md: '4.25vw' },
              }}
              align="center"
              justify="center"
              direction="column"
              gap={[4, null, null, 3]}
              w="full"
              maxW="7em"
              m="auto"
              fontSize="max(2.35rem, var(--fs-factor))"
            >
              <Text px={2} fontSize="1em" fontWeight="bold" data-wlc-fadeup>
                Welcome to{' '}
                <Box
                  as="span"
                  color="text.inverse"
                  fontFamily="title"
                  fontSize="xl"
                  fontWeight={900}
                  textTransform="uppercase"
                  textShadow="0px 2px 2px rgba(0,0,0,0.1)"
                >
                  Alphazoo
                </Box>
              </Text>
              <Box w="full" data-wlc-fadeup>
                <SfxButton variant="secondary" w="full" fontSize={['0.5em', null, null, '0.425em']}>
                  Enter
                </SfxButton>
              </Box>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  )
}
