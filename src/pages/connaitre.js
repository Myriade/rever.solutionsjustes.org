import React, { useState, useRef, useEffect }  from 'react'
import PageLayout from '../layouts/pageLayout'
import Connaitre from '../components/pConnaitre'

const Page = () => {
  return (
    <PageLayout lang='fr'>
      <Connaitre />
    </PageLayout>
  )
}

export default Page

export const Head = () => (
  <>
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
