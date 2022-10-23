import { useState, useRef } from 'react'
import NextImage from 'next/future/image'
import { useTransform, useScroll, useSpring, LayoutGroup } from 'framer-motion'
import { AspectRatio, Box, Flex, Text, Heading, Button, chakra } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MagneticBox, MotionPop } from '~components/motion'
import { WikiCard } from '~components/WikiCard'
import { HOMEPAGE_IDS } from '~src/constants'
import { homeWikis } from '~/src/data/homeWiki'

import { ReactComponent as QuestionSvg } from '~public/img/question.svg'
import { ReactComponent as QaAnimalsSvg } from '~public/img/qa-animals.svg'
// import qaAnimalsUrl from '~public/img/qa-animals.svg'
const QaQuestion = chakra(QuestionSvg)
const QaAnimals = chakra(QaAnimalsSvg)

export default function FunWiki() {
  const wikiRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wikiRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const scale = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.875, 1]), { stiffness: 60 })

  const [expanded, setExpanded] = useState<false | number>(0)

  const handleExpanded = (i: false | number) => () => {
    setExpanded((state) => (i === state ? false : i))
  }

  return (
    <Box as="section" my={56} aria-labelledby={HOMEPAGE_IDS.wiki}>
      <MotionBox
        ref={wikiRef}
        pos="relative"
        mx={[1, 7]}
        pt={[12, 24]}
        bg="secondary.100"
        rounded={['2em', '4em']}
        style={{ scale }}
      >
        <Flex align={['flex-start', 'center', 'flex-end']} direction="column" px={8}>
          <QaAnimals width={['60%', '45%', null, '35%']} />
          {/* <Box
            w={['60%', '45%', null, '35%']}
            p={4}
            bg="blackAlpha.100"
            borderWidth="0.25em"
            borderColor="white"
            shadow="inner"
            rounded="full"
          >
            <NextImage src={qaAnimalsUrl} alt="Cute animal faces" />
          </Box> */}
          <Heading
            pt={1}
            color="secondary.500"
            fontSize={['f4xl', 'f5xl']}
            lineHeight="none"
            id={HOMEPAGE_IDS.wiki}
          >
            Wiki Fun!
          </Heading>
          <Text fontSize={['fxl', null, 'f2xl']} opacity={0.9}>
            Did you know that?
          </Text>
        </Flex>
        <QaQuestion
          display={['none', null, 'block']}
          pos="absolute"
          width="30%"
          top="-10%"
          left="5%"
          fill="currentcolor"
          opacity={0.25}
        />
        <MotionFlex
          layoutScroll
          pos="relative"
          zIndex={1}
          minH="21em"
          gap={[4, 8]}
          mt={12}
          px={[4, 6]}
          py={20}
          bg="blackAlpha.50"
          borderBottomRadius="inherit"
          shadow="inner"
          overflowX="auto"
          overflowY="hidden"
          layerStyle="hideScroll"
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
        </MotionFlex>
      </MotionBox>
      <Box mt={20} textAlign="center">
        <Text fontSize={['fxl', null, 'f2xl']}>...and more</Text>
        <MotionPop delay={0.2} display="inline-block" mt={8}>
          <MagneticBox>
            <Button colorScheme="secondary">Explore Wikis</Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </Box>
  )
}
