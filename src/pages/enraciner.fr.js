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
    <title>Enraciner | Solutions justes</title>
    <meta name='description' content='Quand le statut d’immigration d’une personne dépend d’un·e partenaire violent·e, ni rester ni partir ne garantit sa sécurité. Découvrez l’histoire d’Hana et pourquoi il est urgent d’agir' />
    
    <meta property='og:title' content='Enraciner | Solutions justes' />
    <meta property='og:description' content='Quand le statut d’immigration d’une personne dépend d’un·e partenaire violent·e, ni rester ni partir ne garantit sa sécurité. Découvrez l’histoire d’Hana et pourquoi il est urgent d’agir' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/images/enraciner/enraciner-solutions-justes-og' />
    <meta property='og:image:alt' content='Enraciner' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/enraciner/' />
    <meta property='og:type' content='website' />
  </>
);
