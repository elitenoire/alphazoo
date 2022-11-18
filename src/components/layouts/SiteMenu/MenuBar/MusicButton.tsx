import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { useToken } from '@chakra-ui/react'
import { MusicBold } from 'react-iconsax-icons'
import { MenuIconButton } from './MenuIconButton'

import { ReactComponent as MusicSlashBold } from '~public/icons/musicslash.svg'

export const MusicButton = ({ whenFixed }: { whenFixed: boolean }) => {
  const [enable, setEnable] = useState(true)
  const disabledColor = useToken('colors', 'blackAlpha.700', 'rgba(0,0,0,0.65)')

  const toggleMusic = useCallback(() => {
    setEnable((_enable) => !_enable)
  }, [])

  const ariaLabel = `Music ${enable ? 'Off' : 'On'}`

  return (
    <motion.div key={Number(enable)} animate={{ rotate: 360, transition: { duration: 0.3 } }}>
      <MenuIconButton
        whenFixed={whenFixed}
        aria-label={ariaLabel}
        title={ariaLabel}
        onClick={toggleMusic}
      >
        {enable ? (
          <MusicBold color="currentColor" size="65%" />
        ) : (
          <MusicSlashBold fill={disabledColor} width="65%" height="65%" />
        )}
      </MenuIconButton>
    </motion.div>
  )
}
