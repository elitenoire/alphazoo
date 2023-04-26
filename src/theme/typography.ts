import localFont from 'next/font/local'
import { Mitr, Grandstander } from 'next/font/google'

const grandstander = Grandstander({
  subsets: ['latin'],
  fallback: ['system-ui', 'sans-serif'],
})

const mitr = Mitr({
  weight: '700',
  subsets: ['latin'],
  fallback: ['system-ui', 'sans-serif'],
})

const owenPro = localFont({
  src: [
    { path: '../../public/fonts/OwenPro-Regular.woff2', weight: '400' },
    { path: '../../public/fonts/OwenPro-Medium.woff2', weight: '500' },
    { path: '../../public/fonts/OwenPro-Bold.woff2', weight: '700' },
  ],
  fallback: ['system-ui', 'sans-serif'],
})

export const fonts = {
  body: owenPro.style.fontFamily,
  heading: grandstander.style.fontFamily,
  title: mitr.style.fontFamily,
}

export const fontSizes = {
  '3xs': '0.45em',
  '2xs': '0.625em',
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
  f7xl: 'clamp(5.96rem, 12.24vw + 2.04rem, 11.84rem)',
  f8xl: 'clamp(7.45rem, 17.35vw + 1.9rem, 15.78rem)',
  f9xl: 'clamp(9.31rem, 24.42vw + 1.5rem, 21.03rem)',
}
