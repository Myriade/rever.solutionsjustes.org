import React, {useState, useRef} from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { media } from '../styles/mixins.js'

import QuizItem from '../components/quizItem'
import data from '../data/quizData'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

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

const SectionProgression = styled.section`
  
`;

const Section2Intro = styled.section`
  height: calc(100vh - var(--header-height));
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

const Section4Cta = styled.section`
  background-color: white;
  .grid {
    display: grid;
    gap: calc(var(--v-spacer) / 2) var(--h-spacer);
    margin-inline: -1vw;
    > div {
      padding: calc(var(--v-spacer) / 2) var(--h-spacer);
      background: var(--color-bleu-tres-pale);
      border-radius: var(--border-radius);
      display: grid;
      justify-items: left;
      align-content: space-between;
      overflow: hidden;}
    
  h3 {
    font-size: 2rem;
    font-weight: 500;}
    
  .intro p {
    font-weight: 500;
    max-width: 32ch;
    font-size: 1.2rem;}
    
  p {
    font-size: 1rem;}
  
  .button {
    margin-top: var(--h-spacer);
    padding-inline: 3vw;}
  
  ${media.mediumUp`
    grid-template-columns: 1fr 1fr;
  `}
  
  ${media.largeUp`
    grid-template-columns: 1fr 1fr 1fr;
  `}
`;

gsap.registerPlugin(useGSAP);
gsap.registerPlugin(ScrollToPlugin);

const QuizDevPage = () => {
  const [answersProgression, setAnswersProgression] = useState(null);
  const gsapPageContainerRef = useRef();
  const { contextSafe } = useGSAP({ scope: gsapPageContainerRef });
  
  if ( answersProgression === null ) {
    const initialAnswersProgression = quizData.map( (item, index) => { 
      return {
        questionNumber: index + 1,
        answerState: null
      }
    });
    setAnswersProgression(initialAnswersProgression);
  }
  
  // Event handlers
  const shortcutClickHandler = contextSafe(() => {
    gsap.to( window, { 
      duration: 1, 
      scrollTo: {y: '#quiz', offsetY: 120} });
  });
  
  const updateProgressionItem = (index, newValue) => {
    setAnswersProgression( prevState => {
      return prevState.map((item, i) => 
        i === index ? { ...item, answerState: newValue } : item
      );
    });
  };
  
  return (
    <PageLayout>
      <div ref={gsapPageContainerRef} id='gsap-container'>
    
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
        
        <SectionProgression>
          { answersProgression ? 
            answersProgression.map( (question, index) => { return (
              <div key={index}>
                {question.questionNumber} <br/>
                {question.answerState === true ? 'bon' : 'pas bon'}
              </div>
            )})
          : ''}
        </SectionProgression>
        
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
                onClick={shortcutClickHandler}
              >
                commencer le quiz !
              </button>
            </div>
          </div>
        </Section2Intro>
        
        <section className='full-width' id='quiz'>
          { quizData.map( (item, index) => { return (
            <QuizItem  
              key={item.id} 
              itemData={item} 
              itemIndex={index}
              onChange={ (newValue) => updateProgressionItem(index, newValue) } 
            />
          )})}
        </section>
        
        <Section4Cta id='s-impliquer'>
          <h2>S'impliquer davantage</h2>
          <div className='grid'>
          
            <div className='sensibilsation'>
              <div className='intro'>
                <h3>Je souhaite accueillir un atelier</h3>
                <p>Voulez-vous organiser une activité de sensibilisation ou une formation dans votre entreprise, organisation, fête de quartier ou école&nbsp;?</p>
              </div>
              <StaticImage 
                src='../images/connaitre/MCM_SiteWeb_Illustration-Statut-migratoire-precaire.png'
                alt='Illustration d’une famille portant des boîtes'
                placeholder='blurred'
                quality={100}
                height={200}
                style={{ marginInline: 'auto' }}
              />
              <a 
                href={`mailto:atelier@montrealcitymission.org?subject=Je%20souhaite%20participer%20%C3%A0%20un%20atelier&body=Bonjour%2C%0A%0AJ'ai%20vu%20la%20campagne%20R%C3%AAver%20%C3%A0%20l'essentiel%20et%20j'aimerais%20organiser%20une%20activit%C3%A9%20de%20sensibilisation%20ou%20une%20formation%20dans%20mon%20entreprise%2C%20organisation%2C%20f%C3%AAte%20de%20quartier%20ou%20%C3%A9cole.`} 
                className='button centered' 
                target='_blank' 
                rel='noreferrer'
              >
                Contactez-nous
              </a>
            </div>
            
            <div className='benevolat'>
              <div className='intro'>
                <h3>Je veux faire du bénévolat</h3>
                <p>Vous souhaitez aider et vous avez un peu de temps à nous offrir&nbsp;? Devenez bénévole chez nous&nbsp;!</p>
              </div>
              <p>Accueillir et orienter les personnes, faire de l’interprétariat, de la défense des droits, écrire des articles, animer un atelier, aider a la communication… Il y a bien des façons d’aider l'organisme et les personnes qu'il dessert.</p>
              <p>Envoyez-nous votre proposition de bénévolat via le formulaire ci-dessous.</p>
              <a href='https://www.solutionsjustes.org/benevolat' className='button centered' target='_blank' rel='noreferrer'>Nous rejoindre</a>
            </div>
            
            <div className='petitions'>
              <div className='intro'>
                <h3>Je souhaite signer des pétitions</h3>
                <p>Signer des pétitions de nos allié·e·s est une manière d’agir pour faire entendre votre voix et changer les choses.</p>
              </div>
              <StaticImage 
                src='../images/connaitre/MCM_SiteWeb_Illustration-Personnes-sans-statut-immigration.png'
                alt='Illustration d’une famille'
                placeholder='blurred'
                quality={100}
                height={200}
                style={{ marginInline: 'auto' }}
              />
              <a href='https://migrantrights.ca/take-action/participez/' className='button centered' target='_blank' rel='noreferrer'>
                Agir
              </a>
            </div>
          </div>
        </Section4Cta>
    
      </div>
    </PageLayout>
  )
}

export default QuizDevPage

export const Head = () => <title>Quiz | Au delà les statuts</title>
