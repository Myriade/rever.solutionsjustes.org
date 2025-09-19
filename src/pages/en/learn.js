import React, { useState, useEffect }  from 'react'
import PageLayout from '../../layouts/pageLayout'
import Connaitre from '../../components/pConnaitre'
import lesTextes from '../../data/textes'
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
    <title>Connaître l’essentiel | Solutions justes</title>
    <meta name='title' content='Connaître l’essentiel | Solutions justes' />
    <meta name='description' content='' />
    
    <meta property='og:title' content='... | Solutions justes' />
    <meta property='og:description' content='' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en/learn' />
    <meta property='og:type' content='website' />
    
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
  </>
);
