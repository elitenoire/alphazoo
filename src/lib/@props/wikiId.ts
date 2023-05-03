import type { GetStaticPaths, GetStaticPropsContext, InferGetStaticPropsType } from 'next'

import { wikis } from '~src/data/wiki'

export type WikiIdStaticProps = InferGetStaticPropsType<typeof getStaticProps>

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
