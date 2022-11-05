import { useState, useRef } from 'react'
import NextImage from 'next/future/image'
import { useTransform, useScroll, useSpring, MotionValue } from 'framer-motion'
import { AspectRatio, Box, Flex, Text, Heading, Button, Link } from '@chakra-ui/react'
import { MotionBox, MotionFlex, MagneticBox, MotionPop } from '~components/motion'
import { WikiCard } from '~components/WikiCard'
import { HOMEPAGE_IDS } from '~src/constants'
import { homeWikis } from '~/src/data/homeWiki'

import ImgQuestion from '~public/img/question.svg'
import ImgQaAnimals from '~public/img/qa-animals.svg'

export default function FunWiki() {
  const wikiRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: wikiRef,
    offset: ['start 0.8', '0.8 start'],
  })

  const yScroll = useSpring(scrollYProgress, { stiffness: 60 }) as MotionValue<number>
  const scale = useTransform(yScroll, [0, 0.2], [0.875, 1])
  const opacity = useTransform(yScroll, [0, 0.05], [0, 1])

  const [expanded, setExpanded] = useState<false | number>(false)

  const handleExpanded = (i: false | number) => () => {
    setExpanded((state) => (i === state ? false : i))
  }

  return (
    <Box as="section" mt={[20, null, 28]} mb={56} aria-labelledby={HOMEPAGE_IDS.wiki}>
      <MotionBox
        ref={wikiRef}
        pos="relative"
        mx={[null, 1, null, 5]}
        pt={[12, 24]}
        bg="brand.500"
        rounded={['2em', '4em']}
        style={{ scale, opacity }}
      >
        <Flex align={['center', null, 'flex-end']} direction="column" px={8}>
          <Text
            as="small"
            align="center"
            display="block"
            mr={[null, null, '10%']}
            opacity={0.15}
            _hover={{ opacity: 0.4 }}
          >
            Artwork by{' '}
            <Link fontWeight="bold" href="https://www.vecteezy.com/members/freeject" isExternal>
              @lincungstudio
            </Link>
            .
          </Text>
          <Box
            w={['90%', '60%', '50%']}
            p={4}
            bg="blackAlpha.200"
            borderWidth="0.25em"
            borderColor="background"
            shadow="inner"
            rounded="full"
          >
            <NextImage src={ImgQaAnimals} alt="Cute animal faces" />
          </Box>
          <Heading
            pt={2}
            color="brand.900"
            fontSize={['f4xl', 'f5xl']}
            lineHeight="none"
            id={HOMEPAGE_IDS.wiki}
          >
            Wiki Fun!
          </Heading>
          <Text color="background" fontSize={['fxl', null, 'f2xl']}>
            Did you know that?
          </Text>
        </Flex>
        <Box
          pos="absolute"
          top="-10%"
          left="5%"
          display={['none', null, 'block']}
          w="30%"
          opacity={0.25}
        >
          <NextImage src={ImgQuestion} alt="Question doodle" />
        </Box>
        <MotionFlex
          layoutScroll
          pos="relative"
          // justifyContent="space-evenly"
          zIndex={1}
          minH="21em"
          gap={[4, 8]}
          mt={12}
          px={[4, 6]}
          py={20}
          bg="blackAlpha.100"
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
            <Button color="background">Explore Wikis</Button>
          </MagneticBox>
        </MotionPop>
      </Box>
    </Box>
  )
}
