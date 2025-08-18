import React, { useState, useRef, useEffect }  from 'react'
import PageLayout from '../../layouts/pageLayout'
import Connaitre from '../../components/pConnaitre'

const Page = () => {
  return (
    <PageLayout lang='en'>
      <Connaitre />
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
    <meta property='og:url' content='https://rever.solutionsjustes.org/en/know' />
    <meta property='og:type' content='website' />
    
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
  </>
);
