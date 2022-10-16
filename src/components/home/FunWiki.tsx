import { Box, Text, Heading, chakra } from '@chakra-ui/react'
import { HOMEPAGE_IDS } from '~src/constants'

import { ReactComponent as QuestionSvg } from '~public/img/question.svg'
import { ReactComponent as QaAnimalsSvg } from '~public/img/qa-animals.svg'

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
    </Box>
  )
}
