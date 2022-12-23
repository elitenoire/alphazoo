import { useRef } from 'react'
import NextImage from 'next/future/image'
import NextLink from 'next/link'
import {
  Heading,
  Box,
  Container,
  Flex,
  Link,
  LinkBox,
  LinkOverlay,
  Icon,
  IconButton,
  Text,
  chakra,
} from '@chakra-ui/react'
import { useScroll, useSpring, useTransform } from 'framer-motion'
import { MotionBox } from '~components/motion'
import { SITE_CONFIG } from '~src/constants'

import ImgClique, { ReactComponent as CliqueSvg } from '~public/img/clique.svg'
import { ReactComponent as LogoSvg } from '~public/brand/logo.svg'
import { ReactComponent as LogonameSvg } from '~public/brand/logoname.svg'
import { ReactComponent as PawSvg } from '~public/img/paw.svg'
import { ReactComponent as ArrowSvg } from '~public/img/arrow.svg'
import { ReactComponent as GithubSvg } from '~public/icons/github.svg'
import { ReactComponent as MailSvg } from '~public/icons/mail.svg'
import { ReactComponent as BuyCoffeeSvg } from '~public/icons/buymeacoffee.svg'
import ImgTwostar from '~public/img/twostar.svg'

const BrandLogo = chakra(LogoSvg)
const BrandLogoName = chakra(LogonameSvg)
const ChakraClique = chakra(CliqueSvg)
const ChakraPaw = chakra(PawSvg)
const ChakraArrow = chakra(ArrowSvg)

export default function Footer() {
  const containerRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  })

  const y = useSpring(useTransform(scrollYProgress, [0.1, 0.35], [50, -30]), { stiffness: 60 })

  return (
    <Flex as="footer" pos="relative" zIndex={1} direction="column" minH="100vh" mt="-100vh">
      <ChakraClique />
      {/* <Box w="100%">
        <NextImage fill src={ImgClique} alt="Cute animals looking over a green hill" />
      </Box> */}
      <Box
        flex={1}
        overflow="hidden"
        mt="-5px"
        color="brand.600"
        bgGradient="linear(brand.900 5px, black)"
      >
        <Container gridTemplateRows="auto 1fr" display="grid" maxW="container.max" minH="inherit">
          <Text
            as="small"
            align="center"
            display="block"
            py={4}
            opacity={0.4}
            _hover={{ opacity: 1 }}
          >
            Site Illustrations by{' '}
            <Link href="https://www.vecteezy.com" isExternal variant="footer">
              Vecteezy
            </Link>{' '}
            and{' '}
            <Link href="https://www.freepik.com/" isExternal variant="footer">
              Freepik
            </Link>
            .
          </Text>
          <Flex
            ref={containerRef}
            justify="flex-end"
            direction="column"
            rowGap={[32, null, 16]}
            pt={12}
            pb={[8, null, 14]}
            px={[null, 4]}
          >
            <Flex pos="relative" justify={['center', null, 'flex-end']}>
              <Flex
                pos="absolute"
                align={['flex-end', null, 'center']}
                transform={['translateY(50%)', null, 'none']}
                inset={0}
              >
                <Heading
                  as="p"
                  mx="auto"
                  color="brand.900"
                  fontSize={['f7xl', null, 'f8xl']}
                  fontWeight="900"
                  bgGradient={[
                    'linear(to-t,brand.900, blackAlpha.300)',
                    null,
                    'linear(to-b, brand.900, blackAlpha.400)',
                  ]}
                  bgClip="text"
                  userSelect="none"
                  aria-hidden="true"
                >
                  Funtastic
                </Heading>
              </Flex>
              <MotionBox maxW="xs" style={{ y, rotate: 3 }}>
                <LinkBox
                  pos="relative"
                  zIndex={1}
                  px={10}
                  py={12}
                  border="2px solid"
                  borderColor="transparent"
                  _hover={{
                    bgColor: 'blackAlpha.200',
                    borderColor: 'brand.900',
                    '& #paw-skin': {
                      opacity: 1,
                    },
                    '& #paw-skin path:nth-of-type(2)': {
                      opacity: 0,
                    },
                  }}
                  bgColor="brand.dark"
                  rounded="3xl"
                  title="Give a Github Star!"
                  transitionDuration="0.2s"
                  transitionProperty="background-color,border-color"
                  transitionTimingFunction="ease-in-out"
                >
                  <Text fontSize={['2xl', null, '3xl']}>
                    <LinkOverlay href={SITE_CONFIG.githubLink} isExternal>
                      <Box as="span" display="block" color="brand.200">
                        Pssst...
                      </Box>{' '}
                      the animals would love a Github Star!
                    </LinkOverlay>
                  </Text>
                  <Box pos="absolute" top="-10%" right={0} w={['20%', null, '23%']}>
                    <NextImage src={ImgTwostar} alt="" />
                  </Box>
                  <ChakraPaw
                    id="paw-skin"
                    pos="absolute"
                    right="5%"
                    w={['15%', null, '20%']}
                    bottom={0}
                    fill="brand.900"
                    opacity={0.35}
                    sx={{
                      '&,& path:nth-of-type(2)': {
                        transition: 'opacity 0.2s',
                      },
                    }}
                  />
                  <ChakraArrow pos="absolute" left="-2" w={'12%'} bottom="-8%" fill="background" />
                </LinkBox>
              </MotionBox>
            </Flex>
            <Flex
              align="center"
              justify="center"
              wrap={['wrap', null, 'nowrap']}
              direction={['column', 'row']}
              rowGap={4}
              columnGap={8}
              py={4}
              borderStyle="dashed"
              borderColor={['transparent', null, 'brand.900']}
              borderTopWidth="4px"
              borderBottomWidth="4px"
            >
              <NextLink href="/" passHref>
                <Link
                  gap={4}
                  display="flex"
                  w="full"
                  maxW="3xs"
                  _hover={{ color: 'brand.400' }}
                  aria-label={SITE_CONFIG.appName}
                >
                  <BrandLogo flex={1} fill="currentcolor" />
                  <BrandLogoName flex={2.5} fill="currentcolor" />
                </Link>
              </NextLink>
              <Flex justify="center" wrap={['wrap', null, 'nowrap']} gap={[2, null, null, 4]}>
                <IconButton
                  as={Link}
                  color="inherit"
                  _hover={{
                    color: 'brand.300',
                  }}
                  _active={{
                    bgColor: 'whiteAlpha.100',
                  }}
                  aria-label="Github Page"
                  bgColor="whiteAlpha.50"
                  href={SITE_CONFIG.githubLink}
                  icon={<Icon as={GithubSvg} fill="currentcolor" />}
                  isExternal
                  size="md"
                  title="Github Page"
                />
                <IconButton
                  as={Link}
                  color="inherit"
                  _hover={{
                    color: 'brand.300',
                  }}
                  _active={{
                    bgColor: 'whiteAlpha.100',
                  }}
                  aria-label="Contact Me"
                  bgColor="whiteAlpha.50"
                  href={`mailto:evathecoderr@outlook.com?subject=REF From ${SITE_CONFIG.appName.toUpperCase()}`}
                  icon={<Icon as={MailSvg} fill="currentcolor" />}
                  isExternal
                  size="md"
                  title="Contact Me"
                />
                <IconButton
                  as={Link}
                  color="inherit"
                  _hover={{
                    color: 'brand.300',
                  }}
                  _active={{
                    bgColor: 'whiteAlpha.100',
                  }}
                  aria-label="Support Me"
                  bgColor="whiteAlpha.50"
                  href={SITE_CONFIG.supportLink}
                  icon={<Icon as={BuyCoffeeSvg} fill="currentcolor" />}
                  isExternal
                  size="md"
                  title="Support Me"
                />
              </Flex>

              <Text align={['center', null, 'right']} w="full">
                &copy; {new Date().getFullYear()}. Made with love by{' '}
                <Link href={SITE_CONFIG.repoOwnerLink} isExternal variant="footer">
                  elitenoire
                </Link>
              </Text>
            </Flex>
          </Flex>
        </Container>
      </Box>
    </Flex>
  )
}
