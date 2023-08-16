import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Button: ComponentSingleStyleConfig = {
  baseStyle: {
    borderRadius: 'full',
    whiteSpace: 'normal',
  },
  variants: {
    secondary: {
      bg: 'secondary.200',
      color: 'text.base',
      _hover: { bg: 'secondary.300' },
      _active: { bg: 'secondary.400' },
    },
  },
  defaultProps: {
    size: 'lg',
  },
}
