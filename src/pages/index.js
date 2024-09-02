import React from 'react'
import PageLayout from '../layouts/pageLayout'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

import StatutsImmigrationList from '../components/statutsImmigrationList'
import HistoiresList from '../components/histoiresList'

const IndexPage = () => {
  return (
    <PageLayout>
      <section
        style={{background: 'lightgrey'}}>
        <div className='overlay-text' style={{maxWidth: '75ch'}}>
          <h1>Rêver à l'essentiel</h1>
          <h2>Tout le monde a des rêves, mais ce n'est pas donné à tout le monde de pouvoir en faire une réalité.</h2>
          <p>Les personnes im·migrantes sans statut ou à statut précaire sont souvent contraintes de mettre de côté leurs plus grandes aspirations pour ne rêver qu'à l'essentiel. En passant de grandes ambitions aux désirs les plus simples—et les plus humains—la campagne Rêver à l'essentiel met en lumière les obstacles auxquels ces personnes doivent faire face pour vivre dignement lorsque leur quotidien est dicté par leur statut migratoire.</p>
          <p>(image de fond à venir)</p>
        </div>
        <Link to='#agir' className='cta-btn'>Soutenir la cause</Link>
      </section>
      
      <section>
        <h2>Les statuts d'immigration</h2>
        <p>Connaître la réalité des personnes im·migrantes au statut d'immigration absent ou précaire nécessite une meilleure compréhension des termes liés à l'enjeu. Apprenez-en davantage sur les différentes situations qui affectent les personnes im·migrantes.</p>
        <StatutsImmigrationList />
      </section>
      
      <section id='consequences'>
        <h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
        <p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
        <HistoiresList />
      </section>
      
      <section id='video'>
        <h2>De toi à moi: témoignage d'une personne sans statut d'immigration.</h2>
        <p>... Vidéo à venir ...</p>
      </section>
      
      <section id='agir'>
        <h2>Comment vous pouvez aider</h2>
        ...
      </section>
      
      <section id='plus-loin'>
        <h2>Pour aller plus loin</h2>
        ...
      </section>
      
      <section id='a-propos'>
        <h2>À propos</h2>
        ...
      </section>
      
    </PageLayout>
  )
}

export default IndexPage

export const Head = () => (
  <>
    <title>Rêver à l'essentiel | Solutions justes</title>
    <link rel="stylesheet" href="/glide.core.min.css" />
    <link rel="stylesheet" href="/glide.theme.min.css" />
  </>
);
