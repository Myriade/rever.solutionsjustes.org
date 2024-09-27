import React from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

const Section1Hero = styled.section`
  background-color: var(--color-bleu-tres-pale);
  background-image: url(/images/grand-portrait-Daniel.webp);
  background-size: cover;
  background-position: center center;
  padding-block: 0;
  height: calc(40vh - var(--header-height));
  width: 100%;
  padding: initial !important;
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
    height: calc(95vh - var(--header-height));
    h1 {
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh);
    }
  `};
`;

const QuizPage = () => {
  return (
    <PageLayout>
      <Section1Hero>
        <div className='overlay-text'>
          <h1>
            <span>Derrière</span> 
            <span className='right'>les</span> 
            <span>statuts</span>
          </h1>
        </div>
      </Section1Hero>
    </PageLayout>
  )
}

export default QuizPage

export const Head = () => <title>Quiz | Derrière les statuts</title>
