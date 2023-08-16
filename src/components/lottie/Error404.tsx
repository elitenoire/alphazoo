import NextImage from 'next/image'
import { useRef, useState, useCallback, useEffect } from 'react'
import type { AnimationItem } from 'lottie-web'
import { Player, PlayerEvent } from '@lottiefiles/react-lottie-player'
import { AspectRatio } from '@chakra-ui/react'

import Img404 from '~public/img/404.svg'
import Lottie404 from '~public/lottie/404.json'

export const Error404 = () => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const [lottie, setLottie] = useState<AnimationItem | null>(null)
  const [error, setError] = useState(false)

  const playLottie = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    timerRef.current = setTimeout(() => {
      lottie?.playSegments([0, 69], true)
    }, 3000)
  }, [lottie])

  const handleEvent = useCallback(
    (event: PlayerEvent) => {
      if (event === PlayerEvent.Load) {
        playLottie()
      }
      if (event === PlayerEvent.Error) {
        setError(true)
      }
    },
    [playLottie]
  )

  useEffect(() => {
    return () => {
      lottie?.destroy()
      if (timerRef.current) {
        clearTimeout(timerRef.current)
      }
    }
  }, [lottie])

  return (
    <AspectRatio ratio={error ? 91 / 75 : 473 / 404}>
      {error ? (
        <NextImage src={Img404} alt="" fill />
      ) : (
        <Player
          lottieRef={(instance) => {
            setLottie(instance)
          }}
          src={Lottie404}
          onEvent={handleEvent}
          keepLastFrame
        />
      )}
    </AspectRatio>
  )
}
