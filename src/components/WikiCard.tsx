import { ComponentProps } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Heading, Text, ThemeTypings } from '@chakra-ui/react'
import { MotionBox, MotionFlex } from '~components/motion'
import { ChakraColorHues } from '~types/theme'

interface WikiCardProps extends ComponentProps<typeof MotionFlex> {
  animal: string
  wiki: string
  expand?: boolean
  colorScheme?: ChakraColorHues
  titleColor?: ThemeTypings['colors']
}

export const WikiCard = ({
  animal,
  wiki,
  colorScheme = 'orange',
  bg,
  color,
  expand,
  titleColor,
  children,
  ...rest
}: WikiCardProps) => {
  return (
    <MotionFlex
      flex="0 0 auto"
      alignItems={expand ? 'center' : 'flex-end'}
      py={4}
      px={3}
      borderWidth="0.2875em"
      borderColor="whiteAlpha.800"
      boxShadow="sm"
      bg={bg ?? `${colorScheme}.200`}
      color={color ?? `${colorScheme}.900`}
      cursor="pointer"
      {...rest}
      layout
      initial={{ borderRadius: 150 }}
      animate={{ borderRadius: expand ? 40 : 150 }}
      // @ts-expect-error from chakra-ui official docs
      transition={{ duration: 0.8, type: 'spring' }}
    >
      <MotionFlex
        pos="relative"
        flexDir="column"
        alignItems="center"
        w="7.25em"
        layout="position"
        initial={{ left: '0%' }}
        animate={{ left: expand ? '-10%' : '0%' }}
        // @ts-expect-error from chakra-ui official docs
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {children}
        <AnimatePresence mode="popLayout">
          {!expand && (
            <MotionFlex
              key={animal}
              layout
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{
                opacity: 1,
                scale: 1,
                transition: { delay: 0.3, duration: 0.6, type: 'spring' },
              }}
              exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2, type: 'spring' } }}
            >
              <Heading as="h3" color={titleColor ?? `${colorScheme}.700`} fontSize="fxl">
                {animal}
              </Heading>
            </MotionFlex>
          )}
        </AnimatePresence>
      </MotionFlex>
      {expand && (
        <MotionBox
          layout
          w="11em"
          pr={2}
          initial={{ opacity: 0, x: '-25%' }}
          animate={{
            opacity: 1,
            x: '0%',
            transition: { delay: 0.1, duration: 0.6, type: 'spring' },
          }}
        >
          <Heading as="h3" color={titleColor ?? `${colorScheme}.700`} fontSize="fxl">
            {animal}
          </Heading>
          <Text fontSize="flg">{wiki}</Text>
        </MotionBox>
      )}
    </MotionFlex>
  )
}
