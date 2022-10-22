import { useState } from 'react'
import NextImage from 'next/future/image'
import { AspectRatio, Box, Flex, Text, Heading, chakra } from '@chakra-ui/react'
import { WikiCard } from '~components/WikiCard'
import { HOMEPAGE_IDS } from '~src/constants'
import { homeWikis } from '~/src/data/homeWiki'

import { ReactComponent as QuestionSvg } from '~public/img/question.svg'
import { ReactComponent as QaAnimalsSvg } from '~public/img/qa-animals.svg'

const QaQuestion = chakra(QuestionSvg)
const QaAnimals = chakra(QaAnimalsSvg)

export default function FunWiki() {
  const [expanded, setExpanded] = useState<false | number>(0)

  const handleExpanded = (i: false | number) => () => {
    setExpanded((state) => (i === state ? false : i))
  }

  return (
    <Box as="section" pos="relative" pt={16} pb={40} aria-labelledby={HOMEPAGE_IDS.wiki}>
      <Box pos="relative" zIndex={1} px={4} textAlign="right">
        <Heading color="colorScheme.500" fontSize="f5xl" id={HOMEPAGE_IDS.wiki}>
          Wiki Fun!
        </Heading>
        <Text fontSize="f2xl">Did you know that?</Text>
      </Box>
      <QaAnimals
        pos="absolute"
        width={['60%', '40%', null, '30%']}
        top={[0, null, '-4', null, '-7']}
        right={4}
      />
      <QaQuestion
        display={['none', null, 'block']}
        pos="absolute"
        width="30%"
        top="-20%"
        left="5%"
        opacity={0.15}
      />
      <Flex
        layerStyle={['hideScroll', null, null, 'showScroll']}
        pos="relative"
        zIndex={1}
        gap={4}
        overflowX="auto"
        overflowY="hidden"
        my={4}
        p={4}
        // display="grid"
        // gridAutoFlow="column"
        // gridTemplateRows="auto"
        // gridGap={4}
        // webkitOverflowScrolling="touch"
        // pt={8}
        // pb={6}
      >
        {homeWikis.map(({ animal, wiki, colorScheme, tintBg, img, imgRatio }, i) => (
          <WikiCard
            key={animal}
            expand={expanded === i}
            onClick={handleExpanded(i)}
            animal={animal}
            wiki={wiki}
            colorScheme={colorScheme}
            {...(tintBg && { bg: `${colorScheme}.100` })}
          >
            <AspectRatio w="100%" ratio={imgRatio}>
              <NextImage src={img} alt={`${animal} illustration`} fill />
            </AspectRatio>
          </WikiCard>
        ))}
      </Flex>
    </Box>
  )
}
