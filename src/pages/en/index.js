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
    <meta name='description' content='Every dream deserves not to be essential! Together, let’s learn about the reality of humanitarian immigration and amplify the voices of those striving for a better future.' />
    
    <meta property='og:title' content='Rêver à l’essentiel  | Solutions justes' />
    <meta property='og:description' content='Every dream deserves not to be essential! Together, let’s learn about the reality of humanitarian immigration and amplify the voices of those striving for a better future.
' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='Je rêvais d’une meilleure vie au Québec. Je rêve maintenant de ne plus vivre dans l’angoisse de devoir quitter. - Personne en attente de sa résidence permanente depuis 7 ans. Informez-vous sur les réalités migratoires au Québec. Solutions Justes, MCM' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en' />
    <meta property='og:type' content='website' />
  </>
);
