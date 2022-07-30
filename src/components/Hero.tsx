import { Flex, Heading } from '@chakra-ui/react'

export const Hero = ({ title }: { title: string }) => (
  <>
    <Flex
      align="center"
      justify="center"
      h="100vh"
      bgGradient="linear(to-l, heroGradientStart, heroGradientEnd)"
      bgClip="text"
    >
      <Heading fontSize="6vw">{title}</Heading>
    </Flex>
  </>
)

Hero.defaultProps = {
  title: 'with-chakra-ui-typescript',
}
