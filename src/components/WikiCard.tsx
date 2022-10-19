import { useState, ComponentProps } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Heading, Text, ThemeTypings } from '@chakra-ui/react'
import { MotionBox, MotionFlex } from '~components/motion'
import { ChakraColorHues } from '~types/theme'

interface WikiCardProps extends ComponentProps<typeof MotionFlex> {
  animal: string
  wiki: string
  brand?: ChakraColorHues
  titleColor?: ThemeTypings['colors']
}

export const WikiCard = ({
  animal,
  wiki,
  brand = 'orange',
  bg,
  color,
  titleColor,
  children,
  ...rest
}: WikiCardProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleOpen = () => setIsOpen(!isOpen)

  return (
    <MotionFlex
      alignItems="center"
      py={4}
      px={2}
      borderWidth="0.2875em"
      borderColor="whiteAlpha.800"
      bg={bg ?? `${brand}.200`}
      color={color ?? `${brand}.900`}
      {...rest}
      layout
      initial={{ borderRadius: 100 }}
      animate={{ borderRadius: isOpen ? 30 : 100 }}
      // @ts-expect-error from chakra-ui official docs
      transition={{ duration: 0.8, type: 'spring' }}
      onClick={toggleOpen}
    >
      <MotionBox
        layout="position"
        pos="relative"
        textAlign="center"
        w="7.25em"
        initial={{ left: '0%' }}
        animate={{ left: isOpen ? '-10%' : '0%' }}
        // @ts-expect-error from chakra-ui official docs
        transition={{ duration: 0.8, type: 'spring' }}
      >
        {children}
        <AnimatePresence mode="popLayout">
          {!isOpen && (
            <MotionBox
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
              <Heading as="h3" color={titleColor ?? `${brand}.700`} fontSize="fxl">
                {animal}
              </Heading>
            </MotionBox>
          )}
        </AnimatePresence>
      </MotionBox>
      {isOpen && (
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
          <Heading as="h3" color={titleColor ?? `${brand}.700`} fontSize="fxl">
            {animal}
          </Heading>
          <Text fontSize="flg">{wiki}</Text>
        </MotionBox>
      )}
    </MotionFlex>
  )
}
