import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'

import { getWikiLayout } from '~components/layout/DefaultLayout'

import { wikis } from '~src/data/wiki'

export default function AnimalWiki({
  dynamicWiki,
  prevId,
  nextId,
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
      <Gallery
        id={validId}
        dynamicWiki={dynamicWiki}
        total={total}
        prevId={prevId}
        nextId={nextId}
      />
    </Flex>
  )
}

AnimalWiki.getLayout = (page: ReactElement) => getWikiLayout(page, { back: ROUTES.wiki })

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticPaths: GetStaticPaths = async () => {
  const paths = wikis.map((wiki) => ({
    params: {
      id: wiki.name.toLowerCase(),
    },
  }))

  return { paths, fallback: false }
}

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async ({ params }: GetStaticPropsContext<{ id: string }>) => {
  const index = wikis.findIndex((wiki) => wiki.name.toLowerCase() === params?.id)
  const dynamicWiki = wikis[index]
  const prevId = wikis[index - 1]?.name.toLowerCase() || ''
  const nextId = wikis[index + 1]?.name.toLowerCase() || ''

  return { props: { dynamicWiki, prevId, nextId, total: wikis.length } }
}
