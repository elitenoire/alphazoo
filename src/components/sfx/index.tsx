import type { ComponentType, MouseEventHandler } from 'react'
import { forwardRef, useCallback } from 'react'
import type { ButtonProps, IconButtonProps, LinkProps } from '@chakra-ui/react'
import { Button, IconButton, Link } from '@chakra-ui/react'
import { useGeneralSfx } from '~src/context/sfx'
import { getDisplayName } from '~src/utils'
import type { Merge } from '~/types/utility'

type SfxEvents = 'onClick' | 'onMouseEnter'

type WithSfxProps<T extends HTMLElement> = {
  [K in SfxEvents]: MouseEventHandler<T>
}

export const withSfx = <P, T extends HTMLElement = HTMLElement>(
  Component: ComponentType<P>
) => {
  const HOC = forwardRef<T, Merge<P, Partial<WithSfxProps<T>>>>(
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

  HOC.displayName = `withSfx(${getDisplayName(Component)})`

  return HOC
}

export const SfxButton = withSfx<ButtonProps, HTMLButtonElement>(Button)

export const SfxIconButton = withSfx<IconButtonProps, HTMLButtonElement>(IconButton)

export const SfxLink = withSfx<LinkProps, HTMLAnchorElement>(Link)
