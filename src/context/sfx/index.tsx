import { PropsWithChildren } from 'react'
import useSound from 'use-sound'
import type { ReturnedValue } from 'use-sound/dist/types'
import { useBackgroundMusic } from '~/src/hooks/useBackgroundMusic'
import { createSfxProvider } from './factory'

interface GeneralSFX {
  click: ReturnedValue
  hover: ReturnedValue
  open: ReturnedValue
  ascend: ReturnedValue
}

interface HomeSFX {
  descend: ReturnedValue
}

const [GeneralSfxProvider, useGeneralSfx] = createSfxProvider<GeneralSFX>()
const [HomeSfxProvider, useHomeSfx] = createSfxProvider<HomeSFX>()
const [LearnSfxProvider, useLearnSfx] = createSfxProvider()
const [PlaySfxProvider, usePlaySfx] = createSfxProvider()
const [WikiSfxProvider, useWikiSfx] = createSfxProvider()
const [ProfileSfxProvider, useProfileSfx] = createSfxProvider()

const BackgroundMusic = ({ src }: { src: string }) => {
  useBackgroundMusic(src)

  return null
}

export { useGeneralSfx, useHomeSfx, useLearnSfx, usePlaySfx, useProfileSfx, useWikiSfx }

export const GeneralSoundProvider = ({ children }: PropsWithChildren) => {
  const hover = useSound('./sounds/hover.mp3')
  const click = useSound('./sounds/click.mp3')
  const open = useSound('./sounds/open.mp3')
  const ascend = useSound('./sounds/ascend.mp3')

  const sfx = { hover, click, open, ascend }

  return <GeneralSfxProvider sfx={sfx}>{children}</GeneralSfxProvider>
}

export const HomeSoundProvider = ({ children }: PropsWithChildren) => {
  const descend = useSound('./sounds/descend.mp3')
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music.mp3" />
      <HomeSfxProvider sfx={{ descend }}>{children}</HomeSfxProvider>
    </>
  )
}

export const LearnSoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-learn.mp3" />
      <LearnSfxProvider>{children}</LearnSfxProvider>
    </>
  )
}
export const PlaySoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-play.mp3" />
      <PlaySfxProvider>{children}</PlaySfxProvider>
    </>
  )
}
export const WikiSoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-wiki.mp3" />
      <WikiSfxProvider>{children}</WikiSfxProvider>
    </>
  )
}
export const ProfileSoundProvider = ({ children }: PropsWithChildren) => {
  return (
    <>
      <BackgroundMusic src="./sounds/bg-music-profile.mp3" />
      <ProfileSfxProvider>{children}</ProfileSfxProvider>
    </>
  )
}
