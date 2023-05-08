import type { ComponentType, MouseEventHandler } from 'react'
import { useCallback } from 'react'
import type { As, ButtonProps, IconButtonProps, LinkProps } from '@chakra-ui/react'
import { Button, IconButton, Link, forwardRef } from '@chakra-ui/react'
import { useGeneralSfx } from '~src/context/sfx'
import { getDisplayName } from '~src/utils'
import type { Merge } from '~/types/utility'

type SfxEvents = 'onClick' | 'onMouseEnter'

type WithSfxProps<T extends HTMLElement = HTMLElement> = {
  [K in SfxEvents]: MouseEventHandler<T>
}

export const withSfx = <P, T extends As>(Component: ComponentType<P>) => {
  const HOC = forwardRef<Merge<P, Partial<WithSfxProps>>, T>(
    ({ onClick, onMouseEnter, ...rest }, ref) => {
      const { playClick, playHover } = useGeneralSfx()

      const handleClick = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
          playClick?.()
          onClick?.(e)
        },
        [onClick, playClick]
      )

      const handleMouseEnter = useCallback(
        (e: React.MouseEvent<HTMLElement>) => {
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

export const SfxButton = withSfx<ButtonProps, 'button'>(Button)

export const SfxIconButton = withSfx<IconButtonProps, 'button'>(IconButton)

export const SfxLink = withSfx<LinkProps, 'a'>(Link)
