import type { Variants } from 'framer-motion'
import { Heading, Box, Flex, List, ListItem, Text } from '@chakra-ui/react'
import { MotionBox, MotionText, MotionSpan } from '~components/motion'
import { AlphabetBubble } from './AlphabetBubble'
import { ActivityBoard } from './ActivityBoard'
import { HOMEPAGE_IDS } from '~src/constants'

const slideList: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: (d: number) => ({
    opacity: 1,
    transition: {
      when: 'beforeChildren',
      staggerChildren: 0.2,
      delayChildren: d || 0,
    },
  }),
}

const slideInItem: Variants = {
  hidden: { opacity: 0, x: '-10%' },
  visible: { opacity: 1, x: '0%', transition: { type: 'spring', duration: 0.8 } },
}

const slideUpItem: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring', duration: 0.8 } },
}

export default function Activity() {
  return (
    <Box as="section" mt={-28} aria-labelledby={HOMEPAGE_IDS.activity}>
      <Box p={4}>
        <Box pos="relative" maxW="md" mb={28} mx={['auto', null, 0]}>
          <Heading
            overflow="hidden"
            color="secondary.500"
            fontSize="f5xl"
            lineHeight={0.85}
            letterSpacing="-0.035em"
            wordBreak="break-word"
            id={HOMEPAGE_IDS.activity}
          >
            <MotionSpan display="block" initial="hidden" whileInView="visible" variants={slideList}>
              <MotionSpan display="flex" flexWrap="wrap" alignItems="center" variants={slideInItem}>
                Pure{' '}
                <Box as="span" ml={1} p={1} fontSize="xs" bg="red.400" rounded="50%">
                  😋
                </Box>{' '}
              </MotionSpan>
              <MotionSpan display="flex" flexWrap="wrap" alignItems="center" variants={slideInItem}>
                Animal{' '}
                <Box as="span" ml={1} p={1} fontSize="xs" bg="orange.400" rounded="50%">
                  😸
                </Box>{' '}
              </MotionSpan>
              <MotionSpan display="block" variants={slideInItem}>
                Fun .
              </MotionSpan>
            </MotionSpan>
          </Heading>
          <MotionBox
            pos={{ md: 'absolute' }}
            top={{ md: '70%' }}
            left={{ md: '50%' }}
            custom={0.45}
            initial="hidden"
            whileInView="visible"
            variants={slideList}
          >
            <MotionText
              sx={{
                ':before': {
                  content: '""',
                  pos: 'absolute',
                  bg: 'secondary.400',
                  bottom: 0,
                  width: '100%',
                  height: '110%',
                  borderRadius: '2.5px',
                  transform: 'rotate(-2.5deg) translateX(-5%)',
                  zIndex: -1,
                },
              }}
              pos="relative"
              zIndex={1}
              w={{ md: '3xs' }}
              mt={[4, null, 3]}
              fontSize="fxl"
              lineHeight={{ md: 1.1 }}
              variants={slideUpItem}
            >
              Go on a fun adventure and experience the alphabet like never before.
            </MotionText>
            <MotionText textAlign="right" fontSize="fxl" fontWeight={700} variants={slideUpItem}>
              <Box as="span" p={1} color="background" bg="brand.500" rounded="2.5px">
                awesome really!
              </Box>
            </MotionText>
            <MotionText
              textAlign="center"
              fontSize="fxl"
              fontWeight={700}
              lineHeight={2.5}
              variants={slideUpItem}
            >
              <Box as="span" px={3} py={1} color="background" bg="accent.300" rounded="2.5px">
                asdfjkl;
              </Box>
            </MotionText>
          </MotionBox>
        </Box>
      </Box>

      {/* make container or give bounding padding */}
      <List mb={8} fontFamily="title" spacing={16}>
        <ListItem pos="sticky" zIndex={1} top={4} overflow="hidden">
          <AlphabetBubble bg="orange.200">AaBbCcDdEeFf</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={2} top={12} overflow="hidden">
          <AlphabetBubble bg="pink.200">GgHhIiJjKkLlMm</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={3} top={20} overflow="hidden">
          <AlphabetBubble bg="green.200">NnOoPpQqRrSsTt</AlphabetBubble>
        </ListItem>
        <ListItem pos="sticky" zIndex={4} top={28} overflow="hidden">
          <AlphabetBubble bg="purple.200">UuVvWwXxYyZz</AlphabetBubble>
        </ListItem>
        <ListItem h={32} aria-hidden="true" />
      </List>
      <ActivityBoard />
    </Box>
  )
}
