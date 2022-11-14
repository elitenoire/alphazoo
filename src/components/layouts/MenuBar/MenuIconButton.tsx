import type { ComponentProps } from 'react'
import { IconButton } from '@chakra-ui/react'

interface MenuIconButtonProps extends ComponentProps<typeof IconButton> {
  whenFixed: boolean
}

export const MenuIconButton = ({ whenFixed, ...rest }: MenuIconButtonProps) => {
  return (
    <IconButton
      color="inherit"
      bg="transparent"
      _hover={{
        shadow: '0 0 0 5px rgba(255,255,255,0.15)',
        bg: whenFixed ? 'secondary.200' : 'brand.100',
      }}
      _active={{
        bg: whenFixed ? 'secondary.300' : 'brand.200',
        transform: 'scale(0.95)',
      }}
      size="md"
      transitionDuration="0.2s"
      transitionProperty="transform,box-shadow"
      {...rest}
    />
  )
}
