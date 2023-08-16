import NextImage from 'next/image'
import { useCallback, useState } from 'react'
import type { AccordionButtonProps } from '@chakra-ui/react'
import {
  Box,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Badge,
  Text,
} from '@chakra-ui/react'
import type { Variants } from 'framer-motion'
import { MotionBox } from '~components/motion'
import { withSfx } from '~components/sfx'
import { usePhonics } from '~src/hooks/usePhonics'

import type { TGalleryWiki } from '~@props/wiki'

const SfxAccordionButton = withSfx<AccordionButtonProps, 'button'>(AccordionButton)

const blurIn: Variants = {
  loading: {
    scale: 1.2,
    filter: 'blur(20px)',
  },
  loaded: {
    scale: 1,
    filter: 'blur(0px)',
  },
}

interface GalleryImageProps {
  wiki?: TGalleryWiki
  rounded?: boolean
  open?: boolean
}

export const GalleryImage = ({ rounded, open, wiki = {} }: GalleryImageProps) => {
  const { sceneUrl, alias, info, name, textColor, bgColor } = wiki

  const [playSound] = usePhonics(`/sounds/intro.mp3`)
  const [loaded, setLoaded] = useState('')

  const handleLoaded = useCallback(() => {
    if (sceneUrl) {
      setLoaded(sceneUrl)
      playSound()
    }
  }, [sceneUrl, playSound])

  return (
    <Box
      pos="relative"
      flex={1}
      overflow="hidden"
      w="full"
      minH={400}
      bg={bgColor ?? 'gray.200'}
      {...(rounded && { rounded: { md: 'card' } })}
    >
      {sceneUrl && (
        <MotionBox
          key={sceneUrl}
          pos="absolute"
          overflow="hidden"
          w="full"
          minH="full"
          inset={0}
          rounded="inherit"
          variants={blurIn}
          initial="loading"
          animate={loaded ? 'loaded' : 'loading'}
        >
          <NextImage
            className="object-cover"
            fill
            src={sceneUrl}
            alt=""
            onLoadingComplete={handleLoaded}
          />
        </MotionBox>
      )}
      {alias && name && info && (
        <Accordion
          pos="absolute"
          bottom={0}
          m={[null, 1]}
          p={3}
          bg="whiteAlpha.700"
          allowToggle
          backdropFilter="blur(20px)"
          // defaultIndex={0}
          rounded={[null, 'lg', rounded ? '1.75em' : null]}
          roundedTopRight="xl"
          {...(open && { defaultIndex: 0 })}
        >
          <AccordionItem w={[null, 'min-content']} border="none">
            <SfxAccordionButton
              flexWrap="wrap"
              columnGap={[2, 3]}
              w={['full', 'max-content']}
              _expanded={{ bg: 'whiteAlpha.400' }}
              rounded={rounded ? ['base', null, '1em'] : 'base'}
            >
              <Text
                as="span"
                flex={1}
                fontFamily="title"
                fontSize={['flg', 'fxl']}
                fontWeight="bold"
                textAlign="left"
                textTransform="capitalize"
                noOfLines={1}
              >
                {alias} the{' '}
                <Box as="span" {...(textColor && { color: textColor })}>
                  {name}
                </Box>
              </Text>
              <Badge>info</Badge>
              <AccordionIcon ml="auto" />
            </SfxAccordionButton>
            <AccordionPanel fontSize={[null, 'flg']}>{info}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  )
}
