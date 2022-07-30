import { Flex, FlexProps } from '@chakra-ui/react'

export const Container = (props: FlexProps) => (
  <Flex
    align="center"
    justify="flex-start"
    direction="column"
    color="black"
    bg="gray.50"
    _dark={{
      bg: 'gray.900',
      color: 'white',
    }}
    transition="all 0.15s ease-out"
    {...props}
  />
)
