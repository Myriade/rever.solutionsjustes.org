import React from 'react'
import PageLayout from '../layouts/pageLayout.fr'
import styled from 'styled-components'
import { Link } from 'gatsby'

const Section = styled.section`
  min-height: calc(94vh - var(--header-height));
`;

const Error404Page = () => {
  return (
    <PageLayout>
      
      <Section>
        <div>
          <h2>Page non trouvée.</h2>
          <Link to='/' className='button button--centered'>Retour à l’accueil</Link>
        </div>
      </Section>
      
    </PageLayout>
  )
}

export default Error404Page

export const Head = () => <title>Erreur 404 | Rêver à l’essentiel</title>