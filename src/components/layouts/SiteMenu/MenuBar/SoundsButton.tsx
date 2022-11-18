import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useToken } from '@chakra-ui/react'
import { VolumeHighBold, VolumeSlashBold } from 'react-iconsax-icons'
import { MenuIconButton } from './MenuIconButton'

export const SoundsButton = ({ whenFixed }: { whenFixed: boolean }) => {
  const [enable, setEnable] = useState(true)
  const disabledColor = useToken('colors', 'blackAlpha.700', 'rgba(0,0,0,0.65)')

  const toggleSounds = useCallback(() => {
    setEnable((_enable) => !_enable)
  }, [])

  const ariaLabel = `Sounds ${enable ? 'Off' : 'On'}`

  return (
    <motion.div key={Number(enable)} animate={{ rotate: 360, transition: { duration: 0.3 } }}>
      <MenuIconButton
        whenFixed={whenFixed}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={toggleSounds}
      >
        {enable ? (
          <VolumeHighBold color="currentColor" size="65%" />
        ) : (
          <VolumeSlashBold color={disabledColor} size="65%" />
        )}
      </MenuIconButton>
    </motion.div>
  )
}
