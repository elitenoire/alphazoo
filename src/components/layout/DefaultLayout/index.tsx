import type { ComponentType, PropsWithChildren, ReactNode, ReactElement } from 'react'
import { useRouter } from 'next/router'
import { Fragment, useEffect } from 'react'
import type { ThemeTypings } from '@chakra-ui/react'
import { Grid } from '@chakra-ui/react'
import {
  GeneralSoundProvider,
  HomeSoundProvider,
  LearnSoundProvider,
  WikiSoundProvider,
  PlaySoundProvider,
} from '~src/context/sfx'
import { LayoutProvider } from '~src/context/layout'
import { useGeneralStore } from '~src/store'
import { AnimatableBackground } from '~components/AnimatableBackground'
import type { FooterProps } from './Footer'
import { Footer } from './Footer'
import { Header } from './Header'
import { BackToTop } from './BackToTop'
import type { RoutePath } from '~src/constants'
import { ROUTES } from '~src/constants'

interface DefaultLayoutProps extends FooterProps {
  provider: ComponentType<PropsWithChildren>
  children: ReactNode
  headerContent?: ReactNode
  bg?: ThemeTypings['colors']
  hideFooter?: boolean
  hideBackToTop?: boolean
  threshold?: number
  back?: RoutePath
}

export type LayoutProps = Omit<DefaultLayoutProps, 'children' | 'provider'>

const LearnMotionControl = ({ children }: PropsWithChildren) => {
  const router = useRouter()

  const setInitialMotion = useGeneralStore.use.setAllowLearnAlphabetInitialMotion()

  useEffect(() => {
    // Disable initial bounce motion only when routing
    // from /learn -> /learn/[id] .
    // This a small hack to smoothly transition between
    // the pages as layoutID motion doesn't work in portals
    const handlerStart = (url: string) => {
      if (
        router.pathname === ROUTES.learn &&
        url.startsWith(ROUTES.learn) &&
        !!url
          .split('/')
          .pop()
          ?.match(/^[a-z]$/i)
      ) {
        setInitialMotion(false)
      } else {
        setInitialMotion(true)
      }
    }

    // on Error, reset back to initial store value
    const handlerError = () => {
      setInitialMotion(true)
    }

    router.events.on('routeChangeStart', handlerStart)
    router.events.on('routeChangeError', handlerError)

    return () => {
      router.events.off('routeChangeStart', handlerStart)
      router.events.off('routeChangeError', handlerError)
    }
  }, [router, setInitialMotion])

  return <>{children}</>
}

const DefaultLayout = ({
  provider: Provider,
  headerContent,
  hideFooter,
  hideBackToTop,
  bg,
  full,
  children,
  ...rest
}: DefaultLayoutProps) => {
  return (
    <LayoutProvider {...rest}>
      <GeneralSoundProvider>
        <AnimatableBackground bg={bg}>
          <Grid templateRows="auto 1fr auto" templateColumns="minmax(0,1fr)" minH="$100vh">
            <Header>{headerContent}</Header>
            <main>
              <Provider>
                {children}
                {!hideBackToTop && <BackToTop />}
              </Provider>
            </main>
            {!hideFooter && <Footer full={full} />}
          </Grid>
        </AnimatableBackground>
      </GeneralSoundProvider>
    </LayoutProvider>
  )
}

export const getDefaultLayout = (page: ReactElement) => {
  return <DefaultLayout provider={Fragment}>{page}</DefaultLayout>
}

export const getHomeLayout = (page: ReactElement) => {
  return (
    <DefaultLayout provider={HomeSoundProvider} bg="brand.700" full>
      {page}
    </DefaultLayout>
  )
}

export const getLearnLayout = (page: ReactElement, props?: LayoutProps) => {
  return (
    <DefaultLayout bg="brand.700" provider={LearnSoundProvider} {...props}>
      <LearnMotionControl>{page}</LearnMotionControl>
    </DefaultLayout>
  )
}

export const getWikiLayout = (page: ReactElement, props?: LayoutProps) => {
  return (
    <DefaultLayout provider={WikiSoundProvider} bg="brand.800" {...props}>
      {page}
    </DefaultLayout>
  )
}

export const getPlayLayout = (page: ReactElement, props?: LayoutProps) => {
  return (
    <DefaultLayout provider={PlaySoundProvider} bg="brand.800" {...props}>
      {page}
    </DefaultLayout>
  )
}
