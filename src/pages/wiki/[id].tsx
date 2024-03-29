import { useRouter } from 'next/router'
import type { ReactElement } from 'react'
import { useEffect } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { Gallery } from '~components/wiki/Gallery'
import { useGeneralStore } from '~src/store'
import { ROUTES } from '~src/constants'

import type { WikiIdStaticProps } from '~@props/wikiId'
import { getStaticPaths, getStaticProps } from '~@props/wikiId'

import { getWikiLayout } from '~components/layout/DefaultLayout'

export default function AnimalWiki({ wiki, prevId, nextId }: WikiIdStaticProps) {
  const setLastViewedWiki = useGeneralStore.use.setLastViewedWiki()

  const router = useRouter()
  const { id } = router.query
  const _id = typeof id === 'string' ? id.toLowerCase() : null
  const validPathId = wiki?.name?.toLowerCase() === _id ? _id : null

  useEffect(() => {
    setLastViewedWiki(validPathId)
  }, [setLastViewedWiki, validPathId])

  return (
    <Flex justify={{ md: 'center' }} minH="$100vh">
      {wiki ? (
        <Gallery index={0} gallery={[wiki]} prevId={prevId} nextId={nextId} />
      ) : (
        <Flex align="center" justify="center" w="full" p={2}>
          <Text align="center" fontSize="flg">
            Something went wrong!
          </Text>
        </Flex>
      )}
    </Flex>
  )
}

AnimalWiki.getLayout = (page: ReactElement) => getWikiLayout(page, { back: ROUTES.wiki })

export { getStaticPaths, getStaticProps }
