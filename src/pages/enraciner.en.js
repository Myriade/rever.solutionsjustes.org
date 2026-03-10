import React from 'react'
import PageLayout from '../layouts/pageLayout'
import PEnraciner from '../components/pEnraciner'

const Page = () => {
  
  return (
    <PageLayout 
      lang='en' 
      i18nLink='/enraciner'
    >
      <PEnraciner lang='en' />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <html lang='fr' />
    <title>Enraciner : Trapped in Migratory Vines | Solutions justes</title>
    <meta name='description' content='When a person’s immigration status depends on a violent partner, neither staying nor leaving can guarantee their safety. Discover Hana’s story and why urgent action is needed.' />
    
    <meta property='og:title' content='Enraciner : Trapped in Migratory Vines | Solutions justes' />
    <meta property='og:description' content='When a person’s immigration status depends on a violent partner, neither staying nor leaving can guarantee their safety. Discover Hana’s story and why urgent action is needed.' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/images/enraciner/enraciner-solutions-justes-og-2?v=3.png' />
    <meta property='og:image:alt' content='Enraciner' />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://rever.solutionsjustes.org/images/enraciner/enraciner-solutions-justes-og-2.png?v=3" />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en/enraciner/' />
    <meta property='og:type' content='website' />
  </>
);
