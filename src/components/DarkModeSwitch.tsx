import { useColorMode, IconButton } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const isDark = colorMode === 'dark'
  return (
    <IconButton
      pos="fixed"
      top={4}
      right={4}
      aria-label="Toggle Theme"
      colorScheme="green"
      icon={isDark ? <SunIcon /> : <MoonIcon />}
      onClick={toggleColorMode}
    />
  )
}
