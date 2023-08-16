import type { MouseEvent } from 'react'
import type { ImageProps } from 'next/image'
import NextImage from 'next/image'
import { useCallback } from 'react'
import type { ThemeTypings } from '@chakra-ui/react'
import { Box, Heading, Tooltip } from '@chakra-ui/react'
import { PetBold } from 'react-iconsax-icons'
import { SfxIconButton } from '~components/sfx'
import { usePhonics } from '~src/hooks/usePhonics'
import { useGeneralSfx } from '~src/context/sfx'

interface AnimalCardProps {
  title?: string
  soundUrl?: string
  imgSrc?: ImageProps['src']
  iconBg?: ThemeTypings['colors']
  onIconClick?: () => void
}

export const AnimalCard = ({
  title = '',
  soundUrl = '',
  imgSrc = '/img/animals/ant.svg',
  iconBg,
  onIconClick,
}: AnimalCardProps) => {
  const [playSound] = usePhonics(soundUrl)
  const { playHover } = useGeneralSfx()

  const allowHover = !!soundUrl
  const showIcon = !!onIconClick

  const handleMouseEnter = useCallback(() => {
    if (allowHover) {
      playHover?.()
    }
  }, [allowHover, playHover])

  const handleClick = useCallback(() => {
    playSound()
  }, [playSound])

  const handleIconClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      e.stopPropagation()
      onIconClick?.()
    },
    [onIconClick]
  )

  return (
    <Box
      pos="relative"
      textAlign="center"
      bg="white"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      rounded={{ base: '5em', xl: '5vw' }}
      {...(allowHover && { layerStyle: 'interactive' })}
    >
      <Box pos="relative" w="60%" minH="max(17em, 25vmax)" mx="auto">
        {imgSrc && <NextImage className="object-contain" src={imgSrc} alt={title} fill priority />}
      </Box>
      {title && (
        <Heading as="p" fontSize={{ base: 'f2xl', '2xl': '3.5vw' }} variant="title">
          {title}
        </Heading>
      )}
      {showIcon && (
        <Box pos="absolute" top={6} right={6}>
          <Tooltip hasArrow label="Open wiki">
            <SfxIconButton
              isRound
              shadow="inner"
              fontSize="lg"
              aria-label="Open wiki"
              bg="blackAlpha.100"
              color="inherit"
              layerStyle="pushy"
              _hover={{
                bg: iconBg ?? 'gray.800',
                shadow: 'none',
                backgroundClip: 'content-box',
                padding: '4px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: iconBg ?? 'gray.800',
                ...(!iconBg && { color: 'white' }),
              }}
              icon={<PetBold color="currentColor" size="40%" />}
              onClick={handleIconClick}
            />
          </Tooltip>
        </Box>
      )}
    </Box>
  )
}
