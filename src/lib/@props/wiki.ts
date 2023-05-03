import type { InferGetStaticPropsType } from 'next'

import { wikis } from '~src/data/wiki'

export type WikiStaticProps = InferGetStaticPropsType<typeof getStaticProps>

// eslint-disable-next-line @typescript-eslint/require-await
export const getStaticProps = async () => {
  const gallery = Array.from({ length: 80 }, (x, i) => wikis[i % wikis.length])

  return { props: { gallery } }
}
