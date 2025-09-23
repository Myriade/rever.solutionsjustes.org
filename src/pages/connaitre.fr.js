import React, { useState, useEffect }  from 'react'
import PageLayout from '../layouts/pageLayout'
import Connaitre from '../components/pConnaitre'
import lesTextes from '../data/textes'
const textes = lesTextes();

const Page = () => {
  const [headerBottom, setHeaderBottom] = useState(null);
  
  // pour le navbar pin
  useEffect(() => {
    if (!headerBottom) {
      const headerHtml = document.querySelector('#gatsby-focus-wrapper header')
      if (headerHtml) {
        const result = headerHtml.getBoundingClientRect().bottom;
        setHeaderBottom(result)
      }
    }
  }, [headerBottom])
  
  return (
    <PageLayout lang='fr'>
      <Connaitre 
        lang='fr' 
        textData={textes.connaitre.fr} 
        headerBottomInViewport={headerBottom} 
      />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <html lang='fr' />
    <title>Connaître l’essentiel | Solutions justes</title>
    <meta name='title' content='Connaître l’essentiel | Solutions justes' />
    <meta name='description' content='Connaître l’essentiel de certains statuts d’immigration précaires et de l’absence de statut. Récits, mythes et réalités. Bonjour, je suis Maria et je suis une personne sans statut d’immigration.' />
    
    <meta property='og:title' content='Connaître l’essentiel | Solutions justes' />
    <meta property='og:description' content='Connaître l’essentiel de certains statuts d’immigration précaires et de l’absence de statut. Récits, mythes et réalités. Bonjour, je suis Maria et je suis une personne sans statut d’immigration.' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='Je rêvais d’une meilleure vie au Québec. Je rêve maintenant de ne plus vivre dans l’angoisse de devoir quitter. - Personne en attente de sa résidence permanente depuis 7 ans. Informez-vous sur les réalités migratoires au Québec. Solutions Justes, MCM' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/connaitre' />
    <meta property='og:type' content='website' />
    
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
  </>
);
