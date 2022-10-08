/** @type {import('next-seo').DefaultSeoProps} */
const defaultSEOConfig = {
  titleTemplate: '%s | Alphazoo - ABC English App',
  defaultTitle: 'Alphazoo - ABC English App',
  description: 'The #1 educational app for kids to learn the English Alphabets in a funtastic way.',
  canonical: 'https://alphazoo.vercel.app',
  openGraph: {
    url: 'https://alphazoo.vercel.app',
    title: 'Alphazoo',
    description: '#1 Animal ABCs app for kids to learn the English Alphabets.',
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
