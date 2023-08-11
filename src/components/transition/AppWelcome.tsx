import NextImage from 'next/image'
import { useEffect } from 'react'
import { useAnimate, stagger } from 'framer-motion'
import { Box, Flex, Text, AspectRatio } from '@chakra-ui/react'

import ImgPaw from '~public/img/wlc-paw.svg'
import ImgPlantOne from '~public/img/wlc-plant-1.svg'
import ImgPlantTwo from '~public/img/wlc-plant-2.svg'

export const AppWelcome = () => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const firstAnimation = async () => {
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
        ['[data-text-box]', { y: '-30vh', scale: 0.5 }, { duration: 0.6 }],
      ])
    }
    void firstAnimation()
  }, [animate])

  return (
    <Flex
      ref={scope}
      pos="fixed"
      zIndex="zen"
      align="center"
      justify="center"
      bg="brand.700"
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
            <NextImage fill src={ImgPlantOne} alt="" unoptimized priority />
          </AspectRatio>
        </Box>
        <Box pos="absolute" right="-50%" bottom={0} w="50%" transform="rotate(45deg)">
          <AspectRatio data-wlc-plant ratio={1}>
            <NextImage fill src={ImgPlantTwo} alt="" unoptimized priority />
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
          <NextImage fill src={ImgPaw} alt="" unoptimized priority />
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
          <NextImage fill src={ImgPaw} alt="" unoptimized priority />
        </AspectRatio>
      </Box>

      {/* <Box overflow="auto" h="100%" py={2} bg="background">
        <Box h="120vh" mx={2} bg="white" />
      </Box> */}
    </Flex>
  )
}
