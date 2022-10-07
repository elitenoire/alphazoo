import { extendTheme, theme as baseTheme, withDefaultColorScheme } from '@chakra-ui/react'
import { components } from './variants'

type TChakraSpace = Record<string | number, string>
type TChakraSize = Record<string | number, string | TChakraSpace>
type TChakraToken<T> = Record<string | number, string | T[keyof T]>

const remToEm = (value: string) => value.replace('rem', 'em')

const tokenTransform = <T extends object>(token: T) =>
  Object.keys(token).reduce<TChakraToken<T>>((acc, key) => {
    const value = token[key as keyof T]
    acc[key] = typeof value === 'string' ? remToEm(value) : value
    return acc
  }, {})

const space = tokenTransform<TChakraSpace>(baseTheme.space)
const sizes = tokenTransform<TChakraSize>(baseTheme.sizes)

const fonts = {
  body: '"Owen Pro", system-ui, sans-serif',
  heading: '"Grandstander", system-ui, sans-serif',
  title: '"Mitr", system-ui, sans-serif',
}

const breakpoints = {
  sm: '32em', // 512px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
}

const fontSizes = {
  xs: '0.75em',
  sm: '0.875em',
  md: '1em',
  lg: '1.125em',
  xl: '1.25em',
  '2xl': '1.5em',
  '3xl': '1.875em',
  '4xl': '2.25em',
  '5xl': '3em',
  '6xl': '3.75em',
  '7xl': '4.5em',
  '8xl': '6em',
  '9xl': '8em',
  fxs: 'clamp(0.64rem, 0.06vw + 0.62rem, 0.67rem)',
  fsm: 'clamp(0.8rem, 0.19vw + 0.74rem, 0.89rem)',
  fmd: 'clamp(1rem, 0.39vw + 0.88rem, 1.19rem)',
  flg: 'clamp(1.25rem, 0.69vw + 1.03rem, 1.58rem)',
  fxl: 'clamp(1.56rem, 1.14vw + 1.2rem, 2.11rem)',
  f2xl: 'clamp(1.95rem, 1.79vw + 1.38rem, 2.81rem)',
  f3xl: 'clamp(2.44rem, 2.72vw + 1.57rem, 3.75rem)',
  f4xl: 'clamp(3.05rem, 4.05vw + 1.75rem, 5rem)',
  f5xl: 'clamp(3.81rem, 5.93vw + 1.92rem, 6.66rem)',
  f6xl: 'clamp(4.77rem, 8.57vw + 2.03rem, 8.88rem)',
}

const theme = extendTheme(
  {
    styles: {
      global: {
        body: {
          fontSize: 'fmd',
          lineHeight: 'short',
          bg: 'background',
        },
        '::-webkit-scrollbar': {
          width: '10px',
          height: '10px',
        },
        '::-webkit-scrollbar-thumb': {
          background: 'brand.300',
          borderRadius: '10px',
          border: '1.5px solid transparent',
          backgroundClip: 'content-box',
        },
        '::-webkit-scrollbar-thumb:hover': {
          background: 'brand.500',
          backgroundClip: 'content-box',
        },
        '::-webkit-scrollbar-track': {
          background: 'black',
        },
        '::selection': {
          bg: 'brand.300',
        },
        '::-moz-selection': {
          bg: 'brand.300',
        },
      },
    },
    textStyles: {
      alt: {
        fontFeatureSettings: '"ss01"',
      },
      liga: {
        fontVariant: 'discretionary-ligatures',
      },
      highlight: {
        bg: 'brandAlt.200',
        borderRadius: '8px',
        px: '8px',
      },
    },
    colors: {
      brandAlt: {
        50: '#e8f9f1',
        100: '#CFFBD5',
        200: '#A0F8B5',
        300: '#6EEC99',
        400: '#49D988',
        500: '#16C172',
        600: '#10A56F',
        700: '#0B8A69',
        800: '#076F5E',
        900: '#045C57',
      },
      brand: {
        50: '#effef7',
        100: '#dafeec',
        200: '#b7fbdb',
        300: '#7ff6be',
        400: '#41e799',
        500: '#16c172',
        600: '#0dac63',
        700: '#0e8750',
        800: '#116a42',
        900: '#105738',
      },
      secondary: {
        50: '#fffaeb',
        100: '#fff1c6',
        200: '#ffe188',
        300: '#ffcb47',
        400: '#ffb620',
        500: '#f99307',
        600: '#dd6c02',
        700: '#b74a06',
        800: '#94380c',
        900: '#7a300d',
      },
      accent: {
        50: '#fef5ee',
        100: '#fde7d7',
        200: '#f9ccaf',
        300: '#f5a87c',
        400: '#f07642',
        500: '#ec5723',
        600: '#de3e18',
        700: '#b82c16',
        800: '#92261a',
        900: '#762218',
      },
      background: '#fff1c6', // secondary.100
      text: baseTheme.colors.gray[800],
      black: '#121113',
    },
    sizes: {
      ...sizes,
      container: {
        max: '1680px',
      },
    },
    components,
    fonts,
    fontSizes,
    breakpoints,
    space,
  },
  withDefaultColorScheme({ colorScheme: 'brand' })
)

export default theme
