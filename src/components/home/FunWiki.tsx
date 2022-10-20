import { LayoutGroup } from 'framer-motion'
import { Box, Flex, Text, Heading, chakra } from '@chakra-ui/react'
import { WikiCard } from '~components/WikiCard'
import { HOMEPAGE_IDS } from '~src/constants'

import { ReactComponent as QuestionSvg } from '~public/img/question.svg'
import { ReactComponent as QaAnimalsSvg } from '~public/img/qa-animals.svg'
import { ReactComponent as QaGiraffe } from '~public/img/qa-giraffe.svg'
import { ReactComponent as QaChameleon } from '~public/img/qa-chameleon.svg'
import { ReactComponent as QaWhale } from '~public/img/qa-whale.svg'
import { ReactComponent as QaTiger } from '~public/img/qa-tiger.svg'
import { ReactComponent as QaFlamingo } from '~public/img/qa-flamingo.svg'
import { ReactComponent as QaPanda } from '~public/img/qa-panda.svg'

const ChakraQa = chakra(QuestionSvg)
const QaAnimals = chakra(QaAnimalsSvg)

export default function FunWiki() {
  return (
    <Box as="section" pos="relative" pt={16} pb={40} aria-labelledby={HOMEPAGE_IDS.wiki}>
      <Box pos="relative" zIndex={1} px={4} textAlign="right">
        <Heading color="brand.500" fontSize="f5xl" id={HOMEPAGE_IDS.wiki}>
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
      <ChakraQa
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
        <LayoutGroup>
          <WikiCard animal="tiger" wiki="No two tigers have the same stripes">
            <QaTiger />
          </WikiCard>
          <WikiCard brand="yellow" animal="giraffe" wiki="Babies stand ~30 minutes after birth">
            <QaGiraffe />
          </WikiCard>
          <WikiCard
            brand="green"
            bg="green.100"
            animal="chameleon"
            wiki="Chameleons can move their eyes separately"
          >
            <QaChameleon />
          </WikiCard>
          <WikiCard
            brand="blue"
            bg="blue.100"
            animal="whale"
            wiki="Blue whales are the largest on Earth"
          >
            <QaWhale />
          </WikiCard>
          <WikiCard
            brand="pink"
            bg="pink.100"
            animal="flamingo"
            wiki="They get their pink color from their food"
          >
            <QaFlamingo />
          </WikiCard>
          <WikiCard brand="blackAlpha" animal="Panda" wiki="Pandas eat a lot of bamboo per day">
            <QaPanda />
          </WikiCard>
        </LayoutGroup>
      </Flex>
    </Box>
  )
}
