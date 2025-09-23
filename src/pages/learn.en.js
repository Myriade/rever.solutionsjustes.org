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
    <PageLayout lang='en'>
      <Connaitre 
        lang='en' 
        textData={textes.connaitre.en} 
        headerBottomInViewport={headerBottom} 
      />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <title>Learn the essentials | Solutions justes</title>
    <meta name='title' content='Learn the essentials | Solutions justes' />
    <meta name='description' content='' />
    
    <meta property='og:title' content='Learn the essentials | Solutions justes' />
    <meta property='og:description' content='Understanding the essentials of certain precarious immigration statuses and the reality of living without status. Stories, Myths, and Realities. Hello, my name is Maria, and I am undocumented.' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='Je rêvais d’une meilleure vie au Québec. Je rêve maintenant de ne plus vivre dans l’angoisse de devoir quitter. - Personne en attente de sa résidence permanente depuis 7 ans. Informez-vous sur les réalités migratoires au Québec. Solutions Justes, MCM' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en/learn' />
    <meta property='og:type' content='website' />
    
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
  </>
);
