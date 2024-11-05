import React, {useState, useEffect, useRef} from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'
import { StaticImage } from 'gatsby-plugin-image'
import { media } from '../styles/mixins.js'

import QuizItem from '../components/quizItem'
import data from '../data/quizData'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { ScrollTrigger } from 'gsap/ScrollTrigger'

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
  height: calc(90vh - var(--header-height));
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

const SectionProgression = styled.section`
  display: flex;
  justify-content: stretch;
  margin-bottom: 1.25rem;
  background: white;
  padding-block: 2.5rem 2rem !important;
  z-index: 30;
  
  .question {
    display: grid;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    border-bottom: 3px solid var(--color-bleu-tres-fonce);
    border-radius: 0;
    background-color: transparent;
    margin: 0;
    height: 1.5rem;
    flex-grow: 1;
    padding-inline: 3vw;
    &__reponse {
      position: relative;
      bottom: calc(0.75rem + 5px);}
    &__point {
      display: grid;
      justify-content: center;
      position: relative;
      bottom: 1rem;
      background: var(--color-bleu-tres-pale);
      border-radius: 50%;
      width: 1.75rem;
      height: 1.75rem;
      line-height: 1.75;
      font-weight: 700;
      &.repondu {
        background: var(--color-bleu-tres-fonce);
        color: white;
      }}
`;

const SectionConclusion = styled.section`
  min-height: 50vh;
  border-top: 1px solid var(--color-bleu-tres-fonce);
    
  h3 {
    font-size: 2rem;
    font-weight: 500;}
    
  p {
    text-align: center;
    font-weight: 500;
    font-size: 1.2rem;}
  
  .button {
    margin-top: var(--h-spacer);
    padding-inline: 3vw;}
  
  ${media.mediumUp`
    
  `}
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const QuizDevPage = () => {
  const [screenType, setScreenType] = useState(''); 
  const [answersProgression, setAnswersProgression] = useState(null);
  const [goodAnswerCount, setGoodAnswerCount] = useState(0);
  const gsapPageContainerRef = useRef();
  const { contextSafe } = useGSAP({ scope: gsapPageContainerRef });
  
  // Screen type check and animations trigger
  useEffect( () => {
    if (!screenType) {
      if (window.matchMedia('(hover: hover)').matches) {
        console.log('Device has a mouse or touchpad events');
        if (window.matchMedia('(min-width: 1200px)').matches) {
          console.log('Screen is more than 1200px wide.  Full Animations ok.');
          setScreenType('mouse');
        } else {
          setScreenType('mouse-narrow');
          console.log('Screen is less than 1200px wide. Animations sobres.');
        }
      } else {
        console.log('Device has no mouse, so has touch events. Animations sobres.');
        setScreenType('touch');
      }
    }
    
    if (screenType) {
      gsapAnimations();
    }  
  }, [screenType]);
  
  // Initiate the progression array
  if ( answersProgression === null ) {
    const initialAnswersProgression = quizData.map( (item, index) => { 
      return {
        questionNumber: index + 1,
        answerState: 'attente'
      }
    });
    setAnswersProgression(initialAnswersProgression);    
  }
  
  // Gsap general animations 
  const gsapAnimations = contextSafe(() => {
  
    const pageRefElem = gsapPageContainerRef.current;
    const heroTopPosition = pageRefElem.querySelector('#page-hero').getBoundingClientRect().y;
    
    // progression bar pins 
    gsap.to('#progression-bar', {
      scrollTrigger: {
        id: 'progressionBarPin',
        trigger: '#progression-bar',
        pin: true,
        pinSpacing: false,
        start: `top ${heroTopPosition - 1}`,
        endTrigger: '#conclusion',
        end: `top 150`,
      }
    });
    
  }, { dependencies: [screenType], scope: gsapPageContainerRef } );
  
  // Event handlers
  const shortcutClickHandler = contextSafe(() => {
    gsap.to( window, { 
      duration: 1, 
      scrollTo: {y: '#quiz', offsetY: 180} });
  });
  
  const updateQuiz = (index, answerResult) => {
    
    // Progression Bar
    setAnswersProgression( prevState => {
      return prevState.map((item, i) => 
        i === index ? { ...item, answerState: answerResult } : item
      );
    });
    
    // Conclusion result
    if ( answerResult === 'bonne' ) {
      setGoodAnswerCount( goodAnswerCount + 1 );
    }
    
    // Next Question animation
    const onChangeGsapAnimations = contextSafe(() => {
      const thisInteraction = gsapPageContainerRef.current.querySelector(`#quiz > div:nth-child(${index+ 1}) .interaction`);
      const nextQuestion = gsapPageContainerRef.current.querySelector(`#quiz > div:nth-child(${index+ 2}) > .grid`);
      
      // dévoiler la prochaine question en transition de hauteur
      gsap.to( nextQuestion, {
        height: 'auto',
        duration: 1,
        scrollTrigger: {
          trigger: nextQuestion,
          start: 'top 50%'
        }
      });
      
      // dévoiler les 2 zones zones de la prochaine question en alpha transition une à la fois
      if (nextQuestion !== null) {
        gsap.to( nextQuestion.children, {
          autoAlpha: 1,
          duration: 2,
          stagger: 1,
          scrollTrigger: {
            trigger: nextQuestion,
            start: 'top 50%'
          },
          onStart: () => {
            // Sets the border color of the current question interaction div to white
            gsap.set( thisInteraction, {
              borderColor: 'white'
            });
          }
        });   
      }   
    }, { dependencies: [screenType], scope: gsapPageContainerRef } ); 
    onChangeGsapAnimations();
    
  };
  
  return (
    <PageLayout>
      <div ref={gsapPageContainerRef} id='gsap-container'>
    
        <Section1Hero id='page-hero'>
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
                onClick={shortcutClickHandler}
              >
                commencer le quiz !
              </button>
            </div>
          </div>
        </Section2Intro>
        
        <SectionProgression id='progression-bar'>
          { answersProgression ? 
            answersProgression.map( (question, index) => { return (
              <div className='question' key={index}>
                <div className='question__reponse'>
                  {question.answerState === 'bonne' ? '✔' : '\u00A0'}{question.answerState === 'mauvaise' ? '✗' : '\u00A0'}
                </div>
                <div className={ question.answerState === 'attente' ? 'question__point attente' : 'question__point repondu'}>
                  {question.questionNumber}
                </div>
              </div>
            )})
          : ''}
        </SectionProgression>
        
        <section className='full-width' id='quiz'>
          { quizData.map( (item, qIndex) => { return (
            <QuizItem  
              key={item.id} 
              itemData={item} 
              itemIndex={qIndex}
              onQuizItemChange={ (answerResult) => updateQuiz(qIndex, answerResult) } 
            />
          )})}
        </section>
        
        <SectionConclusion id='conclusion'>
          { answersProgression !== null ?
            <div> 
              { answersProgression[answersProgression.length - 1 ].answerState == 'attente' ? 
                <p>Répondez à la question ci-haut pour voir la suite en défilant plus bas</p>
                : <p>
                  Vous avez { goodAnswerCount } bonne{goodAnswerCount > 1 && 's'} réponse{goodAnswerCount > 1 && 's'} sur {answersProgression.length}.
                </p>
              }
            </div>
          : ''}
          <div style={{marginTop: '2rem'}}>
            <code><em>
            <b>Notes conclusion du Quiz</b> :<br/>
            Résumé des résultats bonnes réponses sur total.<br/>
            Phrase de conclusion<br/>
            Bouton «Partager»
            </em></code>
          </div>
        </SectionConclusion>
    
      </div>
    </PageLayout>
  )
}

export default QuizDevPage

export const Head = () => <title>Quiz | Au delà les statuts</title>