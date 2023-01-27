import type { PropsWithChildren, ReactNode, ReactElement } from 'react'
import { GeneralSoundProvider, HomeSoundProvider } from '~/src/context/sfx'
import { AnimatableBackground } from '~components/AnimatableBackground'
import { BackToTop } from './BackToTop'
import { Footer, FooterProps } from './Footer'
import { Header } from './Header'

interface DefaultLayoutProps extends FooterProps {
  provider: (props: PropsWithChildren) => JSX.Element
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
    <GeneralSoundProvider>
      <AnimatableBackground bg={bg}>
        <Header>{headerContent}</Header>
        <main>
          <Provider>
            {children}
            {!hideBackToTop && <BackToTop />}
          </Provider>
        </main>
        {!hideFooter && <Footer full={full} />}
      </AnimatableBackground>
    </GeneralSoundProvider>
  )
}

export const getHomeLayout = (page: ReactElement) => {
  return (
    <DefaultLayout provider={HomeSoundProvider} bg="brand.700" full>
      {page}
    </DefaultLayout>
  )
}