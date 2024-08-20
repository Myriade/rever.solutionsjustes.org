import * as React from 'react'
import PageLayout from '../layouts/pageLayout'
import { Link } from 'gatsby'

const IndexPage = () => {
  return (
    <PageLayout>
    
      <section>
        <h4>Bannière d'intro</h4>
        <h1>Rêver à l'essentiel</h1>
        <p>(image et court paragraphe)</p>
        <Link to='#agir' className='cta-btn'>Agir</Link>
      </section>
      
      <section>
        <h1>Comprendre les statuts migratoires</h1>
        <p>Court texte</p>
        <p>Caroussel des status</p>
      </section>
      
      <section id='agir'>
        <h1>Comment vous pouvez aider</h1>
        ...
      </section>
      
    </PageLayout>
  )
}

export default IndexPage

export const Head = () => <title>Rêver à l'essentiel | Solutions justes</title>
