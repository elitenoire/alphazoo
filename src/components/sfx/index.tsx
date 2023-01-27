import type { ComponentType, MouseEventHandler } from 'react'
import { forwardRef, useCallback } from 'react'
import { Button, IconButton, Link } from '@chakra-ui/react'
import { useGeneralSfx } from '~/src/context/sfx'
import { getDisplayName } from '~src/utils'

type SfxEvents = 'onClick' | 'onMouseEnter'

type WithSfxProps<T = HTMLElement> = {
  [K in SfxEvents]: MouseEventHandler<T>
}

const withSfx = <T extends HTMLElement, P>(Component: ComponentType<P & WithSfxProps<T>>) => {
  const WithSfxComponent = forwardRef<T, P & Partial<WithSfxProps<T>>>(
    ({ onClick, onMouseEnter, ...rest }, ref) => {
      const { playClick, playHover } = useGeneralSfx()

      const handleClick = useCallback(
        (e: React.MouseEvent<T>) => {
          playClick?.()
          onClick?.(e)
        },
        [onClick, playClick]
      )

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<T>) => {
          playHover?.()
          onMouseEnter?.(e)
        },
        [onMouseEnter, playHover]
      )

      return (
        <Component
          ref={ref}
          {...(rest as P)}
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
        />
      )
    }
  )

  WithSfxComponent.displayName = `withSfx(${getDisplayName(Component)})`

  return WithSfxComponent
}

export const SfxButton = withSfx(Button)

export const SfxIconButton = withSfx(IconButton)

export const SfxLink = withSfx(Link)
