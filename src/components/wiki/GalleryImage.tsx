import NextImage from 'next/image'
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
import type { TGalleryWiki } from '~@props/wiki'

interface GalleryImageProps {
  wiki?: TGalleryWiki
  rounded?: boolean
}

export const GalleryImage = ({ rounded, wiki = {} }: GalleryImageProps) => {
  const { sceneUrl, alias, info, name, textColor, bgColor } = wiki
  return (
    <Box
      pos="relative"
      flex={1}
      w="full"
      minH={400}
      bg={bgColor ?? 'gray.200'}
      {...(rounded && { rounded: { md: 'card' } })}
    >
      {sceneUrl && (
        <Box pos="absolute" overflow="hidden" w="full" minH="full" inset={0} rounded="inherit">
          <NextImage className="object-cover" fill src={sceneUrl} alt="" unoptimized />
        </Box>
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
          rounded={[null, 'lg', rounded ? '1.75em' : null]}
          roundedTopRight="xl"
        >
          <AccordionItem w={[null, 'min-content']} border="none">
            <AccordionButton
              flexWrap="wrap"
              columnGap={[2, 3]}
              w={['full', 'max-content']}
              _expanded={{ bg: 'whiteAlpha.400' }}
              rounded={rounded ? ['base', null, '1em'] : 'base'}
            >
              <Text
                as="span"
                flex={1}
                fontFamily="heading"
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
            </AccordionButton>
            <AccordionPanel fontSize={[null, 'flg']}>{info}</AccordionPanel>
          </AccordionItem>
        </Accordion>
      )}
    </Box>
  )
}
