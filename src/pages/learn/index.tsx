import { useState, useCallback, useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { IntroScreen } from '~components/learn/IntroScreen'
import { AlphabetGrid } from '~components/learn/AlphabetGrid'
import { FixedBackground } from '~components/FixedBackground'
import { useGeneralStore, useGeneralHydration } from '~src/store'

import { getLearnLayout } from '~components/layout/DefaultLayout'

import ImgLearn from '~public/img/bg-learn.svg'

export default function Learn() {
  const showIntro = useGeneralStore.use.showLearnIntro()
  const setShowIntro = useGeneralStore.use.setShowLearnIntro()
  const hydrated = useGeneralHydration()

  const [gridReady, setGridReady] = useState(false)

  const revealGrid = useCallback(() => {
    setGridReady(true)
  }, [])

  const handleExit = useCallback(() => {
    revealGrid()
    setShowIntro(false)
  }, [revealGrid, setShowIntro])

  useEffect(() => {
    if (hydrated && !showIntro) {
      revealGrid()
    }
  }, [hydrated, showIntro, revealGrid])

  return (
    <FixedBackground src={ImgLearn} alt="">
      <Flex
        pos="relative"
        align="center"
        overflow="hidden"
        {...(gridReady ? { minH: 'full' } : { h: '100vh', minH: '31.25em' })}
      >
        {hydrated && showIntro && <IntroScreen onExit={handleExit} />}
        <AlphabetGrid show={gridReady} />
      </Flex>
    </FixedBackground>
  )
}

Learn.getLayout = getLearnLayout
