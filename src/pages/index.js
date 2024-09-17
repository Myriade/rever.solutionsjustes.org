import React, { useState, useRef } from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

import StatutsImmigrationList from '../components/statutsImmigrationList'
import HistoiresList from '../components/histoiresList'

const Section1Hero = styled.section`
  background-color: var(--color-bleu-tres-pale);
  background-image: url(/portrait4.webp);
  background-size: cover;
  background-position: center center;
  padding-block: 0;
  height: calc(40vh - var(--header-height));
  width: 100%;
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

const Section2Intro = styled.section`
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

const Section3Statuts = styled.section`
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

const Section5Video = styled.section`
  background: var(--color-bleu-clair);
  h2 {
    color: white;
    text-transform: uppercase;
  }
`;

const Section7Partenaires = styled.section`
  background: var(--color-bleu-tres-fonce);
  color: white;
`;

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

const IndexPage = () => {
  const gsapContainerRef = useRef();
  
  const { contextSafe } = useGSAP({ scope: gsapContainerRef });
  
  const onClickHandler = contextSafe(() => {
    gsap.to( window, { duration: 1.5, scrollTo: '#agir' });
  });
  
  return (
    <PageLayout>
      <div ref={gsapContainerRef}  style={{overflow: 'scroll'}}>
        <Section1Hero >
          <div className='overlay-text'>
            <h1>
              <span>Rêver</span> 
              <span className='right'>à</span> 
              <span>l'essentiel</span>
            </h1>
          </div>
        </Section1Hero>
        
        <Section2Intro>
          <div className='grid'>
            <h2>Tout le monde a des rêves, mais ce n'est pas donné à tout le monde de pouvoir en faire une réalité.</h2>
            <div>
              <p>Les personnes im·migrantes sans statut ou à statut précaire sont souvent contraintes de mettre de côté leurs plus grandes aspirations pour ne rêver qu'à l'essentiel. En passant de grandes ambitions aux désirs les plus simples—et les plus humains—la campagne Rêver à l'essentiel met en lumière les obstacles auxquels ces personnes doivent faire face pour vivre dignement lorsque leur quotidien est dicté par leur statut migratoire.</p>
              <button 
                className='button soutenir'
                onClick={onClickHandler}
              >
                Soutenir la cause
              </button>
            </div>
          </div>
        </Section2Intro>
        
        <Section3Statuts>
          <div className='grid'>
            <h2>Les statuts d'immigration</h2>
            <p>Connaître la réalité des personnes im·migrantes au statut d'immigration absent ou précaire nécessite une meilleure compréhension des termes liés à l'enjeu. Apprenez-en davantage sur les différentes situations qui affectent les personnes im·migrantes.</p>
          </div>
          <StatutsImmigrationList />
        </Section3Statuts>
        
        <HistoiresList />
        
        <Section5Video id='video'>
          <h2>De toi à moi: témoignage d'une personne sans statut d'immigration.</h2>
          <p>... Vidéo à venir ...</p>
        </Section5Video>
        
        <section id='agir'>
          <h2>Comment vous pouvez aider</h2>
          ...
        </section>
        
        <Section7Partenaires id='plus-loin'>
          <h2>Pour aller plus loin</h2>
          ...
        </Section7Partenaires>
        
        <section id='a-propos'>
          <h2>À propos</h2>
          ...
        </section>
      </div>
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
