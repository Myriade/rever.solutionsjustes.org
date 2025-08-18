import React from 'react'
import PageLayout from '../layouts/pageLayout'
import Quiz from '../components/pQuiz'

const Page = () => {
  
  return (
    <PageLayout lang='fr'>
      <Quiz />
    </PageLayout>
  )
}

export default Page

export const Head = () => ( 
  <>
    <title>Quiz : Au-delà des statuts d'immigration | Solutions justes</title>
    <meta name='description' content="Ce quiz offre une perspective unique sur les défis auxquels font face les personnes migrantes et permet de mieux comprendre les liens souvent méconnus entre le statut d'immigration et le bien-être quotidien." />
    
    <meta property='og:title' content="Quiz : Au-delà des statuts d'immigration | Solutions justes" />
    <meta property='og:description' content="Ce quiz offre une perspective unique sur les défis auxquels font face les personnes migrantes et permet de mieux comprendre les liens souvent méconnus entre le statut d'immigration et le bien-être quotidien." />
    <meta property='og:image' content='https://rever.solutionsjustes.org/quiz-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content="Testez vos connaissances avec notre quiz interactif ! 🧠💡
    Vous vous demandez comment les différents statuts d'immigration influencent la vie quotidienne des personnes migrantes ? Ce quiz vous offrira une perspective unique sur les défis auxquels font face les personnes migrantes et vous permettra de mieux comprendre les liens souvent méconnus entre le statut d'immigration et le bien-être quotidien." />
    <meta property='og:url' content='https://rever.solutionsjustes.org/quiz' />
    <meta property='og:type' content='website' />
  </>
);
