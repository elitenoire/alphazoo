import { useState, useCallback } from 'react'
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion'
import { IconButton, Box, BoxProps } from '@chakra-ui/react'
import { ArrowUpBold } from 'react-iconsax-icons'
import { useGeneralSfx } from '~/src/context/sfx'

interface BackToTopProps extends BoxProps {
  threshold?: number
}

export const BackToTop = ({
  threshold = 100,
  bg = 'black',
  color = 'background',
  ...rest
}: BackToTopProps) => {
  const [show, setShow] = useState(false)
  const { scrollY } = useScroll()
  const { playAscend, playHover } = useGeneralSfx()

  const handleClick = useCallback(() => {
    playAscend?.()
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    })
  }, [playAscend])

  const updateShow = useCallback(
    (latest: number) => {
      setShow(latest > threshold)
    },
    [threshold]
  )

  useMotionValueEvent(scrollY, 'change', updateShow)

  return (
    <AnimatePresence>
      {show && (
        <Box
          pos="fixed"
          zIndex="backtotop"
          right={['1em', null, '2em']}
          bottom={['1em', null, '2em']}
          {...rest}
        >
          <motion.div
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -300, rotate: -45, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <IconButton
              color={color}
              bg={bg}
              shadow="2xl"
              _hover={{
                shadow: '0 0 0 5px rgba(255,255,255,0.15)',
                transform: 'scale(1.1) rotate(-45deg)',
              }}
              _active={{
                transform: 'scale(1.2) rotate(-45deg)',
              }}
              aria-label="Back to Top"
              icon={<ArrowUpBold color="currentColor" size="100%" />}
              onClick={handleClick}
              onMouseEnter={playHover}
              size="lg"
              title="Back to Top"
              transitionDuration="0.25s"
              transitionProperty="transform,box-shadow"
            />
          </motion.div>
        </Box>
      )}
    </AnimatePresence>
  )
}
