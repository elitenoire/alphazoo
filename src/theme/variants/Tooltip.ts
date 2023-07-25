import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Tooltip: ComponentSingleStyleConfig = {
  baseStyle: {
    px: 4,
    py: 2,
    borderRadius: 'tiny',
    bg: 'black',
    '--popper-arrow-bg': 'colors.black',
  },
}
