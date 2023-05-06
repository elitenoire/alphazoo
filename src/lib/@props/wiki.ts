import type { InferGetStaticPropsType } from 'next'
import type { DeepPartial } from '~/types/utility'

import { wikis } from '~src/data/wiki'

export type WikiStaticProps = DeepPartial<InferGetStaticPropsType<typeof getStaticProps>>
export type TGalleryWiki = NonNullable<WikiStaticProps['gallery']>[number]

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const gallery = Array.from({ length: 80 }, (x, i) => wikis[i % wikis.length])

  return { props: { gallery } }
}
