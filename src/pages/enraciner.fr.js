import React from 'react'
import PageLayout from '../layouts/pageLayout'
import PEnraciner from '../components/pEnraciner'

const Page = () => {
  
  return (
    <PageLayout 
      lang='fr' 
      i18nLink='/en/enraciner'
    >
      <PEnraciner 
        lang='fr'
      />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <html lang='fr' />
    <title>Enraciner | Solutions justes</title>
    <meta name='description' content='' />
    
    <meta property='og:title' content='Enraciner | Solutions justes' />
    <meta property='og:description' content='' />
    <meta property='og:image' content='' />
    <meta property='og:image:alt' content='' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/enraciner/' />
    <meta property='og:type' content='website' />
  </>
);
