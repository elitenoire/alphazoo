/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  title: 'Alphazoo',
  titleTemplate: '%s | Alphazoo - ABC English App',
  defaultTitle: 'Alphazoo',
  description: 'Practise your English ABCs with a variety of animals.',
  canonical: 'https://alphazoo.vercel.app',
  openGraph: {
    url: 'https://alphazoo.vercel.app',
    title: 'Alphazoo',
    description: 'Practise your English ABCs with a variety of animals.',
    images: [
      {
        url: 'https://alphazoo.vercel.app/static/og-image.png',
        alt: 'Alphazoo ABC App',
      },
    ],
    site_name: 'Alphazoo',
  },
}

export default defaultSEOConfig
