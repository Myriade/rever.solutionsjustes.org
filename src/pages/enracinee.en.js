import React, {useState} from 'react'
import PageLayout from '../layouts/pageLayout'
import PEnracinee from '../components/pEnracinee'
import getTexts from '../data/textesEnracinee'

const Page = () => {
  const [textes, setTextes] = useState(getTexts());
  
  return (
    <PageLayout 
      lang='en' 
      i18nLink='/enracinee'
    >
      { textes ? 
        <PEnracinee 
          lang='en' 
          texts={textes.en}
        />
        : '...'
      } 
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
    <html lang='fr' />
    <title>Enracinée | Solutions justes</title>
    <meta name='description' content='' />
    
    <meta property='og:title' content='Enracinée | Solutions justes' />
    <meta property='og:description' content='' />
    <meta property='og:image' content='' />
    <meta property='og:image:alt' content='' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/enracinee' />
    <meta property='og:type' content='website' />
  </>
);
