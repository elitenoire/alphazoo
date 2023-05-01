import { useRouter } from 'next/router'
import { useEffect, useCallback } from 'react'
import useKeypress from 'react-use-keypress'
import { useSwipeable } from 'react-swipeable'

interface GestureNavigationOptions {
  prev: () => void
  next: () => void
  prevUrl?: string
  nextUrl?: string
  allowPrefetch?: boolean
}

export function useGestureNavigation({
  prevUrl,
  nextUrl,
  next,
  prev,
  allowPrefetch,
}: GestureNavigationOptions) {
  const { prefetch } = useRouter()

  const handlers = useSwipeable({
    onSwipedLeft: next,
    onSwipedRight: prev,
    trackMouse: true,
  })

  const navigate = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        next()
      } else if (event.key === 'ArrowLeft') {
        prev()
      }
    },
    [next, prev]
  )

  useKeypress(['ArrowRight', 'ArrowLeft'], navigate)

  // prefetch routes
  useEffect(() => {
    if (allowPrefetch) {
      if (prevUrl) {
        void prefetch(prevUrl)
      }
      if (nextUrl) {
        void prefetch(nextUrl)
      }
    }
  }, [allowPrefetch, prefetch, prevUrl, nextUrl])

  return handlers
}
