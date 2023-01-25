import { useRef, useEffect, useCallback } from 'react'
import type { ReturnedValue } from 'use-sound/dist/types'
import { useSoundStore } from '~src/store'

export type SFX<T> = Record<keyof T, ReturnedValue>

type PlaySFX<T> = {
  [K in keyof T as `play${Capitalize<string & K>}`]: () => void
}

export type ContextSFX<T> = Partial<PlaySFX<T>>

type PlayFunctionCallback = (sfx: ReturnedValue) => () => void

const SfxPlayMapper = <T extends SFX<T>>(play: PlayFunctionCallback, sfx?: T) => {
  const playSfx = {} as ContextSFX<T>

  if (sfx) {
    Object.keys(sfx).forEach((s) => {
      playSfx[`play${s.charAt(0).toUpperCase() + s.slice(1)}` as keyof ContextSFX<T>] = play(
        sfx[s as keyof SFX<T>]
      ) as ContextSFX<T>[keyof ContextSFX<T>]
    })
  }
  return playSfx
}

export function useCreateSfx() {
  const soundEnabled = useSoundStore.getState().soundEffects
  const volume = useSoundStore.getState().soundEffectsVolume

  const soundEnabledRef = useRef(soundEnabled)
  const volumeRef = useRef(volume)

  const options = { soundEnabled, volume }

  const play = useCallback(
    (sfx: ReturnedValue) => () => {
      if (soundEnabledRef.current) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [playSfx, { sound }] = sfx
        if (sound) {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
          sound.volume(volumeRef.current)
        }
        playSfx()
      }
    },
    []
  )

  const createSfxValue = useCallback(
    <T extends SFX<T>>(sfx?: T) => {
      return SfxPlayMapper(play, sfx)
    },
    [play]
  )

  useEffect(() => {
    const unsubSound = useSoundStore.subscribe(
      (s) => s.soundEffects,
      (soundEnabled) => {
        soundEnabledRef.current = soundEnabled
      }
    )
    const unsubVolume = useSoundStore.subscribe(
      (s) => s.soundEffectsVolume,
      (volume) => {
        volumeRef.current = volume
      }
    )
    return () => {
      unsubSound()
      unsubVolume()
    }
  }, [])

  return { options, createSfxValue }
}
