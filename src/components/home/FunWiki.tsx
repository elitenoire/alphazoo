import { Box, Flex, Text, Heading, chakra } from '@chakra-ui/react'
import { HOMEPAGE_IDS } from '~src/constants'

import { ReactComponent as QuestionSvg } from '~public/img/question.svg'
import { ReactComponent as QaAnimalsSvg } from '~public/img/qa-animals.svg'
import { ReactComponent as QaGiraffeSvg } from '~public/img/qa-giraffe.svg'
import { ReactComponent as QaChameleonSvg } from '~public/img/qa-chameleon.svg'
import { ReactComponent as QaWhaleSvg } from '~public/img/qa-whale.svg'
import { ReactComponent as QaTigerSvg } from '~public/img/qa-tiger.svg'
import { ReactComponent as QaFlamingoSvg } from '~public/img/qa-flamingo.svg'
import { ReactComponent as QaPandaSvg } from '~public/img/qa-panda.svg'

const ChakraQa = chakra(QuestionSvg)
const QaAnimals = chakra(QaAnimalsSvg)
const QaGiraffe = chakra(QaGiraffeSvg)
const QaWhale = chakra(QaWhaleSvg)
const QaFlamingo = chakra(QaFlamingoSvg)
const QaChameleon = chakra(QaChameleonSvg)
const QaTiger = chakra(QaTigerSvg)
const QaPanda = chakra(QaPandaSvg)

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
      <Flex pos="relative" zIndex={1} justify="center" wrap="wrap" gap={4} p={4}>
        <Flex align="center" w="18em" py={4} bg="orange.200" rounded="2xl">
          <QaTiger pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="orange.700" fontSize="fxl">
              Tiger
            </Heading>
            <Text color="orange.900" fontSize="flg">
              No two tigers have the same stripes
            </Text>
          </Box>
        </Flex>
        <Flex align="center" w="18em" py={4} bg="yellow.200" rounded="2xl">
          <QaGiraffe pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="yellow.700" fontSize="fxl">
              Giraffe
            </Heading>
            <Text color="yellow.900" fontSize="flg">
              Babies stand ~30 minutes after birth
            </Text>
          </Box>
        </Flex>
        <Flex align="center" w="18em" py={4} bg="green.100" rounded="2xl">
          <QaChameleon pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="green.700" fontSize="fxl">
              Chameleon
            </Heading>
            <Text color="green.900" fontSize="flg">
              Chameleons can move their eyes separately
            </Text>
          </Box>
        </Flex>
        <Flex align="center" w="18em" py={4} bg="blue.100" rounded="2xl">
          <QaWhale pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="blue.700" fontSize="fxl">
              Whale
            </Heading>
            <Text color="blue.900" fontSize="flg">
              Blue whales are the largest on Earth
            </Text>
          </Box>
        </Flex>
        <Flex align="center" w="18em" py={4} bg="pink.100" rounded="2xl">
          <QaFlamingo pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="pink.700" fontSize="fxl">
              Flamingo
            </Heading>
            <Text color="pink.900" fontSize="flg">
              They get their pink color from their food
            </Text>
          </Box>
        </Flex>
        <Flex align="center" w="18em" py={4} bg="blackAlpha.200" rounded="2xl">
          <QaPanda pos="relative" w="40%" left="-10%" />
          <Box flex={1} pr={4}>
            <Heading as="h3" color="blackAlpha.700" fontSize="fxl">
              Panda
            </Heading>
            <Text color="blackAlpha.900" fontSize="flg">
              Pandas eat a lot of bamboo per day
            </Text>
          </Box>
        </Flex>
      </Flex>
      <Flex
        pos="relative"
        zIndex={1}
        align="flex-end"
        justify="center"
        wrap="nowrap"
        gap={4}
        my={4}
        p={4}
        // display="grid"
        // gridAutoFlow="column"
        // gridTemplateRows="auto"
        // gridGap={4}
        // overflowX="auto"
        // overflowY="hidden"
        // webkitOverflowScrolling="touch"
        // pt={8}
        // pb={6}
      >
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="orange.200"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaTiger pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="orange.700" fontSize="fxl">
              Tiger
            </Heading>
            {/* <Text color="orange.900" fontSize="flg">
              No two tigers have the same stripes
            </Text> */}
          </Box>
        </Flex>{' '}
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="blackAlpha.200"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaPanda pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="blackAlpha.700" fontSize="fxl">
              Panda
            </Heading>
            {/* <Text color="blackAlpha.900" fontSize="flg">
              Pandas eat a lot of bamboo per day
            </Text> */}
          </Box>
        </Flex>
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="green.100"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaChameleon pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="green.700" fontSize="fxl">
              Chameleon
            </Heading>
            {/* <Text color="green.900" fontSize="flg">
              Chameleons can move their eyes separately
            </Text> */}
          </Box>
        </Flex>
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="yellow.200"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaGiraffe pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="yellow.700" fontSize="fxl">
              Giraffe
            </Heading>
            {/* <Text color="yellow.900" fontSize="flg">
              Babies stand ~30 minutes after birth
            </Text> */}
          </Box>
        </Flex>
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="blue.100"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaWhale pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="blue.700" fontSize="fxl">
              Whale
            </Heading>
            {/* <Text color="blue.900" fontSize="flg">
              Blue whales are the largest on Earth
            </Text> */}
          </Box>
        </Flex>
        <Flex
          align="center"
          direction="column"
          w="10.25em"
          py={4}
          bg="pink.100"
          borderWidth="0.2875em"
          borderColor="whiteAlpha.800"
          rounded="6em"
        >
          <QaFlamingo pos="relative" w="75%" top={0} />
          <Box flex={1}>
            <Heading as="h3" color="pink.700" fontSize="fxl">
              Flamingo
            </Heading>
            {/* <Text color="pink.900" fontSize="flg">
              They get their pink color from their food
            </Text> */}
          </Box>
        </Flex>
      </Flex>
    </Box>
  )
}
