import React from 'react'
import PageLayout from '../layouts/pageLayout'
import PEnraciner from '../components/pEnraciner'

const Page = () => {
  
  return (
    <PageLayout 
      lang='fr' 
      i18nLink='/en/enraciner'
    >
      <PEnraciner lang='fr' />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <html lang='fr' />
    <title>Enraciner : Prise entre les lierres migratoires | Solutions justes</title>
    <meta name='description' content='Quand le statut d’immigration d’une personne dépend d’un·e partenaire violent·e, ni rester ni partir ne garantit sa sécurité. Découvrez l’histoire d’Hana et pourquoi il est urgent d’agir' />
    
    <meta property='og:title' content='Enraciner : Prise entre les lierres migratoires | Solutions justes' />
    <meta property='og:description' content='Quand le statut d’immigration d’une personne dépend d’un·e partenaire violent·e, ni rester ni partir ne garantit sa sécurité. Découvrez l’histoire d’Hana et pourquoi il est urgent d’agir' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/images/enraciner/enraciner-solutions-justes-og-1.png?v=2' />
    <meta property='og:image:alt' content='Enraciner' />
    <meta property="og:image:width" content="3750" />
    <meta property="og:image:height" content="1969" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:image" content="https://rever.solutionsjustes.org/images/enraciner/enraciner-solutions-justes-og-2.png?v=3" />
    <meta property='og:url' content='https://rever.solutionsjustes.org/enraciner/' />
    <meta property='og:type' content='website' />
  </>
);
