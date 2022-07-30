import { extendTheme } from '@chakra-ui/react'

const fonts = {
  heading: 'inherit',
  body: '"Mitr", system-ui, sans-serif',
  title: '"Wendy One", system-ui, sans-serif',
  cursive: '"Mali", system-ui, serif',
  mono: `'Menlo', monospace`,
}

const breakpoints = {
  sm: '32em',
  md: '48em',
  lg: '62em',
  xl: '80em',
  '2xl': '96em',
}

const theme = extendTheme({
  styles: {
    global: {
      body: {
        lineHeight: 'short',
      },
    },
  },
  semanticTokens: {
    colors: {
      text: {
        default: '#16161D',
        _dark: '#ade3b8',
      },
      heroGradientStart: {
        default: '#7928CA',
        _dark: '#e3a7f9',
      },
      heroGradientEnd: {
        default: '#FF0080',
        _dark: '#fbec8f',
      },
    },
    radii: {
      button: '12px',
    },
  },
  colors: {
    black: '#16161D',
  },
  fonts,
  breakpoints,
})

export default theme
