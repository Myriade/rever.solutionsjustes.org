import React, {useState} from 'react'
import PageLayout from '../../layouts/pageLayout'
import Accueil from '../../components/pAccueil'
import lesTextes from '../../data/textes'

const Page = () => {
  const [textes, setTextes] = useState(lesTextes());
  
  return (
    <PageLayout lang='en'>
      { textes ? 
        <Accueil lang='en' textData={textes.rever.en} />
        : '...'
      } 
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <title>Rêver à l’essentiel | Solutions justes</title>
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
    <meta name='description' content='' />
    
    <meta property='og:title' content='... | Solutions justes' />
    <meta property='og:description' content='' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en' />
    <meta property='og:type' content='website' />
  </>
);
