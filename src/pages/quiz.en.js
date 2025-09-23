import React, {useState} from 'react'
import PageLayout from '../layouts/pageLayout'
import Quiz from '../components/pQuiz'
import lesTextes from '../data/textes'

const Page = () => {
  const [textes, setTextes] = useState(lesTextes());
  return (
    <PageLayout lang='en'>
      { textes ? 
       <Quiz lang='en' textData={textes.quiz.en} />
        : '...'
      }
    </PageLayout>
  )
}

export default Page

export const Head = () => ( 
  <>
    <html lang='en' />
    <title>Quiz : Beyond Statuses | Solutions justes</title>
    <meta name='description' content="This quiz offers a unique perspective on the challenges faced by migrants and helps shed light on the often-overlooked connection between immigration status and daily well-being." />
    
    <meta property='og:title' content="Quiz : Beyond Statuses| Solutions justes" />
    <meta property='og:description' content="This quiz offers a unique perspective on the challenges faced by migrants and helps shed light on the often-overlooked connection between immigration status and daily well-being." />
    <meta property='og:image' content='https://rever.solutionsjustes.org/quiz-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content="Je rêvais d’une meilleure vie au Québec. Je rêve maintenant de ne plus vivre dans l’angoisse de devoir quitter. - Personne en attente de sa résidence permanente depuis 7 ans. Informez-vous sur les réalités migratoires au Québec. Solutions Justes, MCM" />
    <meta property='og:url' content='https://rever.solutionsjustes.org/en/quiz/' />
    <meta property='og:type' content='website' />
  </>
);
