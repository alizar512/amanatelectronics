import { Helmet } from 'react-helmet-async'

export const Seo = ({
  title,
  description,
  image = 'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1200&h=630&q=80',
  type = 'website',
  structuredData,
}) => {
  const pageTitle = title ? `${title} | Amanat Electronics` : 'Amanat Electronics'

  return (
    <Helmet prioritizeSeoTags>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      {structuredData ? (
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      ) : null}
    </Helmet>
  )
}
