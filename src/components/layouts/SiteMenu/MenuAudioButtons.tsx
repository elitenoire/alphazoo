import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { IconButton, IconButtonProps, useToken } from '@chakra-ui/react'
import { MusicBold, VolumeHighBold, VolumeSlashBold } from 'react-iconsax-icons'
import { ReactComponent as MusicSlashBold } from '~public/icons/musicslash.svg'

type MenuIconButtonProps = Omit<IconButtonProps, 'aria-label'> & {
  whenFixed?: boolean
  label?: string
}

interface MenuAudioButtonProps extends MenuIconButtonProps {
  iconOn: IconButtonProps['icon']
  iconOff: IconButtonProps['icon']
}

export interface AudioButtonProps extends MenuIconButtonProps {
  iconSize?: string
}

const MenuAudioButton = ({
  label = '',
  whenFixed,
  iconOn,
  iconOff,
  ...rest
}: MenuAudioButtonProps) => {
  const disabledColor = useToken('colors', 'blackAlpha.700', 'rgba(0,0,0,0.65)')
  const [enable, setEnable] = useState(true)

  const toggleAudio = useCallback(() => {
    setEnable((_enable) => !_enable)
  }, [])

  const ariaLabel = `Turn ${label} ${enable ? 'Off' : 'On'}`.toLowerCase()

  return (
    <motion.div
      initial={false}
      animate={{ rotate: enable ? 360 : 0, transition: { duration: 0.3 } }}
    >
      <IconButton
        color={enable ? 'inherit' : disabledColor}
        bg="transparent"
        _hover={{
          shadow: '0 0 0 5px rgba(255,255,255,0.15)',
          bg: whenFixed ? 'secondary.200' : 'brand.100',
        }}
        _active={{
          bg: whenFixed ? 'secondary.300' : 'brand.200',
          transform: 'scale(0.95)',
        }}
        size="md"
        transitionDuration="0.2s"
        transitionProperty="transform,box-shadow"
        {...rest}
        aria-label={ariaLabel}
        onClick={toggleAudio}
        title={ariaLabel}
      >
        {enable ? iconOn : iconOff}
      </IconButton>
    </motion.div>
  )
}

export const MusicButton = ({ iconSize = '65%', label = 'Music', ...rest }: AudioButtonProps) => {
  return (
    <MenuAudioButton
      label={label}
      iconOn={<MusicBold color="currentColor" size={iconSize} />}
      iconOff={<MusicSlashBold fill="currentColor" width={iconSize} height={iconSize} />}
      {...rest}
    />
  )
}

export const SoundsButton = ({ iconSize = '65%', label = 'Sounds', ...rest }: AudioButtonProps) => {
  return (
    <MenuAudioButton
      label={label}
      iconOn={<VolumeHighBold color="currentColor" size={iconSize} />}
      iconOff={<VolumeSlashBold color="currentColor" size={iconSize} />}
      {...rest}
    />
  )
}
