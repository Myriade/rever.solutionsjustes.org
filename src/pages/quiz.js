import React from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { media } from '../styles/mixins.js'

import QuizItem from '../components/quizItem'
import data from '../data/quizData'

const quizData = data();

const Section1Hero = styled.div`
  width: 100%;
  padding: initial !important;
  display: grid;
  
 .bg-image, .overlay-text {
    height: calc(40vh - var(--header-height));
    grid-area: 1/1/2/2;
    width: 100%;}
    
  .bg-image {
    height: calc(40vh - var(--header-height));}
    
  .overlay-text {
    position: relative;}
  
  h1 {
    height: calc(40vh - var(--header-height));
    font-size: calc( (40vh - var(--header-height) - 10vh) / 3 );
    color: white;
    line-height: 1em;
    text-transform: uppercase;
    margin: 0 var(--h-spacer);
    display: grid;
    align-items: center;
    
    span {
      display: block;
      &.right {
        text-align: right;}}}
  
  ${media.mediumUp`
    .bg-image {
      height: calc(95vh - var(--header-height));}
    h1 {
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh);
    }
  `};
`;

const Section2Intro = styled.section`
  .grid {
    gap: var(--v-h2-spacer);}
    
  h2 {
    font-size: clamp(24px, 2vw, 2rem);
    max-width: 21ch;
    font-weight: 500;
    line-height: 1.25;
    text-transform: initial;}
    
  p {
    margin-top: 0;}
    
  ${media.mediumUp`
    .grid {
      grid-template-columns: 1fr 1fr;}
    
    h2 {
      max-width: initial;}
  `};
  
  .button {
    margin-top: calc(var(--v-spacer) / 2);}
`;

const QuizPage = () => {
  return (
    <PageLayout>
    
      <Section1Hero>
        <StaticImage 
          className='bg-image'
          src='../images/grand-portrait-Daniel.webp'
          layout='fullWidth'
          alt='portrait de Daniel'
          placeholder='blurred'
          quality={100}
        />
        <div className='overlay-text'>
          <h1>
            <span>Au delà</span> 
            <span className='right'>des</span> 
            <span>statuts</span>
          </h1>
        </div>
      </Section1Hero>
      
      <Section2Intro>
        <div className='grid'>
          <div>
            <h2>Testez vos connaissances avec le quiz <br/>
             Au delà des statuts</h2>
          </div>
          <div>
            <p><strong>Vous vous demandez comment les différents statuts d'immigration influencent la vie quotidienne des personnes migrantes ? Testez vos connaissances avec notre quiz interactif&nbsp;!</strong> 🧠💡</p>
            <p>Ce quiz vous offrira une perspective unique sur les défis auxquels font face les personnes migrantes et vous permettra de mieux comprendre les liens souvent méconnus entre le statut d'immigration et le bien-être quotidien.</p>
            <button 
              className='button'
            >
              commencer le quiz !
            </button>
          </div>
        </div>
      </Section2Intro>
      
      { quizData.map( item => { return (
        <QuizItem itemData={item} key={item.id} />
      )})}
      
    </PageLayout>
  )
}

export default QuizPage

export const Head = () => <title>Quiz | Au delà les statuts</title>
