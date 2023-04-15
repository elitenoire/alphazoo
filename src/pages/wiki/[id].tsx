import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import NextLink from 'next/link'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { CategoryBold } from 'react-iconsax-icons'
import { GalleryButton } from '~components/wiki/GalleryButton'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'

import { getWikiLayout } from '~components/layout/DefaultLayout'

export default function AnimalWiki({
  dynamicWiki,
  total,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const setLastViewedWiki = useGeneralStore.use.setLastViewedWiki()

  const router = useRouter()
  const { id } = router.query
  const validId = typeof id === 'string' ? id : null

  useEffect(() => {
    setLastViewedWiki(validId)
  }, [setLastViewedWiki, validId])

  return (
    <Flex justify={{ md: 'center' }} minH="$100vh">
      <GalleryButton
        as={NextLink}
        position="fixed"
        zIndex="zen"
        top={{ md: 0 }}
        bottom={[0, null, 'auto']}
        borderTopRightRadius={{ md: 0 }}
        borderTopLeftRadius={0}
        borderBottomRadius={[0, null, 'circle']}
        pt={5}
        pb={2}
        pr={4}
        p={[null, null, 3]}
        icon={<CategoryBold color="currentColor" size="100%" />}
        href={`${ROUTES.wiki}`}
        shallow
      />
      <Gallery id={validId} dynamicWiki={dynamicWiki} total={total} />
    </Flex>
  )
}

AnimalWiki.getLayout = getWikiLayout

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: 80 }, (x, i) => ({
    params: {
      id: i.toString(),
    },
  }))

  return { paths, fallback: false }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  const gallery = Array.from({ length: 80 }, (x, i) => i)
  const dynamicWiki = gallery.find((wiki) => wiki === Number(params?.id))

  return { props: { dynamicWiki, total: gallery.length } }
}
