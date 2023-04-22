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

interface GalleryImageProps {
  rounded?: boolean
}

export const GalleryImage = ({ rounded }: GalleryImageProps) => {
  return (
    <Box
      pos="relative"
      flex={1}
      w="full"
      minH={400}
      bg="gray.200"
      {...(rounded && { rounded: { md: 'card' } })}
    >
      <Box pos="absolute" overflow="hidden" w="full" minH="full" inset={0} rounded="inherit">
        <NextImage
          className="object-cover"
          fill
          src="/img/wiki/alligator-bg.svg"
          alt=""
          unoptimized
        />
      </Box>
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
              Ally The{' '}
              <Box as="span" color="green.600">
                Alligator
              </Box>
            </Text>
            <Badge>info</Badge>
            <AccordionIcon ml="auto" />
          </AccordionButton>
          <AccordionPanel>
            Ally is one of the oldest reptile in the world and loudest. She prefers to live in
            freshwater and her eyes glow in the dark.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Box>
  )
}
