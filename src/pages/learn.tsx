import { useState, useCallback } from 'react'
import Background from '~components/learn/Background'
import StartWelcome from '~components/learn/StartWelcome'
import AlphabetGrid from '~components/learn/AlphabetGrid'

import { getLearnLayout } from '~components/layout/DefaultLayouts'

export default function Learn() {
  const [gridReady, setGridReady] = useState(false)

  const handleExit = useCallback(() => {
    setGridReady(true)
  }, [])

  return (
    <Background expand={gridReady}>
      <StartWelcome onExit={handleExit} />
      <AlphabetGrid show={gridReady} />
    </Background>
  )
}

Learn.getLayout = getLearnLayout
