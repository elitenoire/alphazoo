import type { PropsWithChildren, ReactNode, ReactElement } from 'react'
import { AnimatableBackground } from '~components/AnimatableBackground'
import { HomeSoundProvider } from './SoundProviders'
import { BackToTop } from './BackToTop'
import { Footer, FooterProps } from './Footer'
import { Header } from './Header'

interface DefaultLayoutProps extends FooterProps {
  provider: (prop: PropsWithChildren) => JSX.Element
  children: ReactNode
  headerContent?: ReactNode
  bg?: string
  hideFooter?: boolean
  hideBackToTop?: boolean
}

const DefaultLayout = ({
  provider: Provider,
  headerContent,
  hideFooter,
  hideBackToTop,
  bg,
  full,
  children,
}: DefaultLayoutProps) => {
  return (
    <Provider>
      <AnimatableBackground bg={bg}>
        <Header>{headerContent}</Header>
        <main>
          {children}
          {!hideBackToTop && <BackToTop />}
        </main>
        {!hideFooter && <Footer full={full} />}
      </AnimatableBackground>
    </Provider>
  )
}

export const getHomeLayout = (page: ReactElement) => {
  return (
    <DefaultLayout provider={HomeSoundProvider} bg="brand.700" full>
      {page}
    </DefaultLayout>
  )
}
