import { useState, useEffect } from 'react'
import { Box, Center, Text, useToken } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import { shuffle } from '~/src/utils'
import type { GlyphType } from '~types/data'

const colorList = [
  'purple.100',
  'red.100',
  'cyan.100',
  'orange.100',
  'yellow.100',
  'teal.100',
  'pink.100',
  'green.100',
  'blue.100',
]
interface LearnLettersProps {
  letters: GlyphType[]
}

export function LearnLetters({ letters }: LearnLettersProps) {
  const [colors, setColors] = useState(useToken('colors', colorList))

  useEffect(() => {
    setColors((colors) => shuffle(colors))
  }, [])

  return (
    <Box flex="0 0 100%">
      <Center
        as="ul"
        flexWrap="wrap"
        gap={0.5}
        maxW="9em"
        m="auto"
        px={['10%', null, '15%']}
        fontFamily="title"
        fontSize="min(max(3.5rem, 10vmax), 280px)"
        whiteSpace="nowrap"
        listStyleType="none"
      >
        {letters.map((glyph, i) => {
          const isEmoji = glyph.type === 'emoji'
          const len = colors.length
          const color = colors[((i % len) + len) % len]
          return (
            <Box key={glyph.name} as="li" aria-hidden={isEmoji ? 'true' : undefined}>
              {isEmoji && (
                <motion.div
                  whileInView={{
                    y: [0, 10, -10, 0],
                    rotate: [0, 1 + 0.1 * i, -2, 0],
                  }}
                  transition={{ repeat: Infinity, duration: 3.75 + 0.15 * i, delay: 0.05 * i }}
                >
                  <Text
                    as="span"
                    display="flex"
                    px="0.5em"
                    py="0.125em"
                    fontSize="0.5em"
                    bg={glyph.color}
                    rounded="full"
                  >
                    {glyph.name}
                  </Text>
                </motion.div>
              )}
              {!isEmoji && (
                <Text
                  as="button"
                  sx={{
                    WebkitTextStrokeWidth: '0.1rem',
                    WebkitTextStrokeColor: color,
                  }}
                  pos="relative"
                  zIndex={2}
                  align="center"
                  display="flex"
                  px="0.2em"
                  py="0.1em"
                  color="transparent"
                  lineHeight="none"
                  _hover={{
                    color,
                    transform: 'scale(1.5)',
                  }}
                  _active={{
                    transform: 'scale(1)',
                  }}
                  transition="transform 0.2s, color 0.2s"
                >
                  {glyph.name}
                </Text>
              )}
            </Box>
          )
        })}
      </Center>
    </Box>
  )
}
