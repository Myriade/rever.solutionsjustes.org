import React from 'react'
import PageLayout from '../../layouts/pageLayout.en'
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
          <h2>Page not found.</h2>
          <Link to='/en' className='button button--centered'>Back to home</Link>
        </div>
      </Section>
      
    </PageLayout>
  )
}

export default Error404Page

export const Head = () => <title>Erreur 404 | Rêver à l’essentiel</title>