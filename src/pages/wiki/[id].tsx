import type { InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { Flex } from '@chakra-ui/react'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'
import { getStaticPaths, getStaticProps } from '~@props/wikiId'

import { getWikiLayout } from '~components/layout/DefaultLayout'

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

export { getStaticPaths, getStaticProps }
