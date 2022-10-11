import type { ComponentSingleStyleConfig } from '@chakra-ui/theme'

export const Link: ComponentSingleStyleConfig = {
  //   baseStyle: {},
  variants: {
    footer: {
      fontWeight: 'bold',
      _hover: { color: 'brand.400', textDecor: 'underline' },
    },
  },
  //   defaultProps: {},
}
