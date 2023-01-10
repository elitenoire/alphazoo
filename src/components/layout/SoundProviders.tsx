import { PropsWithChildren, ReactNode } from 'react'
import useSound from 'use-sound'
import { useBackgroundMusic } from '~/src/hooks/useBackgroundMusic'
import { SfxProvider } from '~/src/context/sfx'

const BackgroundMusic = ({ src }: { src: string }) => {
  useBackgroundMusic(src)

  return null
}

export const HomeSoundProvider = ({ children }: PropsWithChildren) => {
  const playDescend = useSound('./sounds/descend.mp3')
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music.mp3" />
      <SfxProvider sfx={{ playDescend }}>{children}</SfxProvider>
    </>
  )
}
export const LearnSoundProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-learn.mp3" />
      <SfxProvider>{children}</SfxProvider>
    </>
  )
}
export const PlaySoundProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-play.mp3" />
      <SfxProvider>{children}</SfxProvider>
    </>
  )
}
export const WikiSoundProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-wiki.mp3" />
      <SfxProvider>{children}</SfxProvider>
    </>
  )
}
export const ProfileSoundProvider = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-profile.mp3" />
      <SfxProvider>{children}</SfxProvider>
    </>
  )
}
