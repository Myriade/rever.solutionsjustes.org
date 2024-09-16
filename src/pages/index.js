import React from 'react'
import PageLayout from '../layouts/pageLayout'
import { Link } from 'gatsby'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

import StatutsImmigrationList from '../components/statutsImmigrationList'
import HistoiresList from '../components/histoiresList'

const Section_1_hero = styled.section`
  padding-block: 0;
  background: url(/portrait4.webp);
  height: calc(40vh - var(--header-height));
  width: 100%;
  background-size: cover;
  background-position: center center;
  h1 {
    height: calc(40vh - var(--header-height));
    font-size: calc( (40vh - var(--header-height) - 10vh) / 3 );
    color: white;
    line-height: 1em;
    text-transform: uppercase;
    margin: 0;
    display: grid;
    align-items: center;
    span {
      display: block;
      &.right {
        text-align: right;}}}
  
  ${media.mediumUp`
    height: calc(95vh - var(--header-height));
    h1 {
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh);
    }
  `};
`;

const Section_2_intro = styled.section`
  .grid {
    gap: var(--v-spacer) 4rem;}
    
  h2, p {
    margin-block: 0;}
    
  h2 {
    font-size: clamp(24px, 2vw, 2rem);
    max-width: 21ch;
    font-weight: 500;
    line-height: 1.25;}
    
  p {
    font-size: 1.2rem;
    line-height: 1.35;}
    
  ${media.mediumUp`
    .grid {
      grid-template-columns: 1fr 1fr;}
    
    h2 {
      max-width: initial;}
  `};
  
  .button {
    margin-top: var(--v-spacer);}
`;

const Section_3_statuts = styled.section`
  background: var(--color-bleu-tres-pale);
  h2 {
    text-transform: uppercase;
    font-size: clamp(24px, 2vw, 2rem);
    font-weight: 600;
    width: 15ch;}
  
  ${media.mediumUp`
    .grid {
      grid-template-columns: 1fr 1fr;}
    
    h2 {
      max-width: initial;}
  `};
  
  p {
    font-size: 1.2rem;
    line-height: 1.35;}
`;

const Section_4_video = styled.section`
  background: var(--color-bleu-clair);
  h2 {
    color: white;
    text-transform: uppercase;
  }
`;

const Section_6_partenaires = styled.section`
  background: var(--color-bleu-tres-fonce);
  color: white;
`;

const IndexPage = () => {
  return (
    <PageLayout>
      <Section_1_hero >
        <div className='overlay-text'>
          <h1>
            <span>Rêver</span> 
            <span className='right'>à</span> 
            <span>l'essentiel</span>
          </h1>
        </div>
      </Section_1_hero>
      
      <Section_2_intro>
        <div className='grid'>
          <h2>Tout le monde a des rêves, mais ce n'est pas donné à tout le monde de pouvoir en faire une réalité.</h2>
          <div>
            <p>Les personnes im·migrantes sans statut ou à statut précaire sont souvent contraintes de mettre de côté leurs plus grandes aspirations pour ne rêver qu'à l'essentiel. En passant de grandes ambitions aux désirs les plus simples—et les plus humains—la campagne Rêver à l'essentiel met en lumière les obstacles auxquels ces personnes doivent faire face pour vivre dignement lorsque leur quotidien est dicté par leur statut migratoire.</p>
            <Link to='#agir' className='button'>Soutenir la cause</Link>
          </div>
        </div>
      </Section_2_intro>
      
      <Section_3_statuts>
        <div className='grid'>
          <h2>Les statuts d'immigration</h2>
          <p>Connaître la réalité des personnes im·migrantes au statut d'immigration absent ou précaire nécessite une meilleure compréhension des termes liés à l'enjeu. Apprenez-en davantage sur les différentes situations qui affectent les personnes im·migrantes.</p>
        </div>
        <StatutsImmigrationList />
      </Section_3_statuts>
      
      <HistoiresList />
      
      <Section_4_video id='video'>
        <h2>De toi à moi: témoignage d'une personne sans statut d'immigration.</h2>
        <p>... Vidéo à venir ...</p>
      </Section_4_video>
      
      <section id='agir'>
        <h2>Comment vous pouvez aider</h2>
        ...
      </section>
      
      <Section_6_partenaires id='plus-loin'>
        <h2>Pour aller plus loin</h2>
        ...
      </Section_6_partenaires>
      
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
