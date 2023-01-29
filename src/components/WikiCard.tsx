import type { PropsWithChildren, MouseEvent } from 'react'
import { useCallback } from 'react'
import { AnimatePresence } from 'framer-motion'
import type { ThemeTypings } from '@chakra-ui/react'
import { Heading, Text, Box } from '@chakra-ui/react'
import { ArrowRight1Bold } from 'react-iconsax-icons'
import type { MotionFlexProps } from '~components/motion'
import { MotionBox, MotionFlex } from '~components/motion'
import { useGeneralSfx } from '~src/context/sfx'
import type { ChakraColorHues } from '~types/theme'

interface WikiCardProps extends MotionFlexProps {
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
  onClick,
  children,
  ...rest
}: PropsWithChildren<WikiCardProps>) => {
  const { playClick } = useGeneralSfx()

  const handleClick = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      playClick?.()
      onClick?.(e)
    },
    [onClick, playClick]
  )

  return (
    <MotionFlex
      layout
      pos="relative"
      flex="0 0 auto"
      alignItems={expand ? 'center' : 'flex-end'}
      justifyContent="center"
      py={4}
      px={3}
      borderWidth="5px"
      borderColor="white"
      bg={bg ?? `${colorScheme}.200`}
      color={color ?? `${colorScheme}.900`}
      cursor="pointer"
      onClick={handleClick}
      {...rest}
      _hover={{ boxShadow: '2xl', '.ic-ex': { color: `${colorScheme}.500` } }}
      transition="box-shadow 0.25s ease-in-out"
      initial={{ borderRadius: 150 }}
      animate={{ borderRadius: expand ? 40 : 150, transition: { duration: 0.8, type: 'spring' } }}
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
      <MotionBox
        className="ic-ex"
        layout="position"
        pos="absolute"
        top="-5"
        w={10}
        h={10}
        p={1}
        rounded="circle"
        bg="whiteAlpha.500"
        borderWidth="0.25em"
        borderColor="white"
      >
        <Box transform={expand ? 'rotate(-180deg)' : 'none'} transition="0.4s ease">
          <ArrowRight1Bold color="currentColor" size="100%" />
        </Box>
      </MotionBox>
    </MotionFlex>
  )
}
