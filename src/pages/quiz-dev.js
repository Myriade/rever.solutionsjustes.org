import React, {useState, useEffect, useRef} from 'react'
import { Link } from 'gatsby'
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
  background: var(--color-bleu-tres-pale);
  
  > .card {
    max-width: max-content !important;}
  
  .card {
    background: white;
    display: grid;
    justify-items: center;
    border-radius: var(--border-radius);
    padding: var(--v-h2-spacer);
    position: relative;
    margin-bottom: 1.5rem;
    > div {
      max-width: 755px;
      text-align: center;}}
      
  h2, h3 {
    margin-bottom: 2.5rem;
  }
    
  h2 {
    text-align: center;
    max-width: 27ch;
    font-size: 1.25rem;
    font-weight: 500;
    line-height: 1.25;
    text-transform: initial;
    background: var(--color-bleu-clair);
    color: white;
    padding: 0.5rem 1rem;
    border-radius: calc(var(--border-radius) / 2);}
    
  .texte {
    position: relative;}
    
  h3 {
    text-align: center;
    line-height: 1.75;
    font-size: clamp(24px, 2vw, 27px);
    b {
      font-weight: inherit;
      background: var(--color-bleu-tres-pale);
      border-radius: calc(var(--border-radius) / 2);
      padding: 0.25em 0.5em;}}
    
  p {
    font-size: 1rem;
    line-height: 1.75;
    max-width: 65ch;
    margin-inline: auto;}
    
  .cta {
    position: absolute;
    bottom: -1.5rem;
    width: 100%;
    display: grid;
    justify-items: center;}
  
  .button {
    margin-top: calc(var(--v-spacer) / 2);
    span {
      font-size: 2rem;
      line-height: 0;}
      
  ${media.mediumUp`
    h3 span {
      display: block;
    }
  `};
`;

const SectionProgression = styled.section`
  background: var(--color-bleu-clair);
  display: flex;
  justify-content: stretch;
  padding-block: 2rem 3rem !important;
  z-index: 30;
  
  .question {
    display: grid;
    justify-items: center;
    border-bottom: 3px solid white;
    border-radius: 0;
    background-color: transparent;
    margin: 0;
    height: 1rem;
    flex-grow: 1;
    padding-inline: 3vw;
      
    &__point {
      display: grid;
      justify-items: center;
      align-items: center;
      background: white;
      border-radius: 50%;
      width: 2rem;
      height: 2rem;
      color: var(--color-bleu-fonce);
      line-height: 0.5;
      position: relative;}
    
    &__reponse {
      font-weight: bold;
      font-size: 1.25rem;
      font-style: italic;
      color: white;
      position: absolute;
      top: -4px;
      right: 0;}
    
    &--repondue {
      border-color: var(--color-bleu-tres-fonce); 
      .question__point {
        background: var(--color-bleu-tres-fonce); 
        color: white;}
      .question__reponse {
        right: -3px;
        font-weight: normal;}}
    
    &--mauvaise .question__reponse {
      color: var(--color-rouge);}
  } 
`;

const SectionConclusion = styled.section`
  border-top: 1px solid var(--color-bleu-tres-pale);
  
  .next {
    height: 35vh;
    justify-items: center;
    align-content: center;}
    
  p {
    color: var(--color-bleu-tres-fonce);
    text-align: center;
    font-weight: 300;
    font-size: 1.2rem;
    max-width: 65ch;
    b {
      font-weight: 700;}}
    
  p.instructions {
    color: #888; 
    font-style: italic;}
  
  .resultats {
    visibility: hidden;
    opacity: 0;
    background: white;
    border-radius: var(--border-radius);
    padding: var(--v-h2-spacer);
    display: grid;
    justify-items: center;
    p a {
      background: var(--color-bleu-tres-pale);
      border-radius: calc(var(--border-radius) / 2);
      padding: 0.25em 0.5em;
    }}
    
  p.resultats__finaux {
    font-weight: 600;
    background: var(--color-bleu-tres-pale);
    border-radius: 0.5em;
    padding: 1em 2em;}
  
  .button {
    margin-top: var(--h-spacer);
    padding-inline: 3vw;
    span {
      margin-left: 1rem;
      font-weight: 100;}}
  
  ${media.mediumUp`
    
  `}
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

const QuizDevPage = () => {
  const [screenType, setScreenType] = useState(''); 
  const [answersProgression, setAnswersProgression] = useState(null);
  const [goodAnswerCount, setGoodAnswerCount] = useState(0);
  const [activeQuestion, setActiveQuestion] = useState(null)
  
  const gsapPageContainerRef = useRef();
  const offsetHeight = useRef()
  const { contextSafe } = useGSAP({ scope: gsapPageContainerRef });
  
  // Get Header and progresssion frise offset height for scrolling offset
  useEffect ( () => {
    function getOffsetHeight() {
      const headerHeight = document.querySelector('header').offsetHeight;
      const progressionHeight = document.querySelector('#progression-bar').offsetHeight;
      return headerHeight + progressionHeight;
    }
    offsetHeight.current = getOffsetHeight();
  }, [screenType]);
  
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
      introAnimations();
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
    setActiveQuestion(0); 
  }
  
  // Intro Animations 
  const introAnimations = contextSafe(() => {
  
    const pageRefElem = gsapPageContainerRef.current;
    const heroTopPosition = pageRefElem.querySelector('#page-hero').getBoundingClientRect().y;
    
    // Le titre d'intro apparaît
    gsap.from( '.intro .titre h2' ,{
      scale: 0.9,
      duration: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: '.intro .card',
        start: 'top 80%'
      }
    });
    
    // Les paragraphes aparaissent
    gsap.from( '.intro .texte > * ' ,{
      autoAlpha: 0,
      duration: 1,
      ease: 'circ.in',
      stagger: 0.5,
      scrollTrigger: {
        trigger: '.intro .texte',
        start: 'top 70%'
      }
    });
    
    // Le bouton Commencer slides from left
    gsap.from( '.intro .cta .button' ,{
      xPercent: -25,
      autoAlpha: 0,
      duration: 1.5,
      scrollTrigger: {
        trigger: '.intro .card',
        start: 'bottom 80%'
      }
    });
    
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
    
  }, {dependencies: [screenType]} );
  
  // Dévoiler la prochaine question lorsqu'on on défile au delà du bouton Prochaine question
  useEffect( () => {
    if ( activeQuestion !== null ) {
      // seulement si la question active n'est pas la première et que la dernière est en attente
      if ( activeQuestion !== 0 && answersProgression[quizData.length - 1 ].answerState === 'attente' ) {
        ScrollTrigger.create({
          id: 'nextOnScroll',
          trigger: '#conclusion',
          start: 'bottom bottom',
          once: true,
          onEnter: () => {
            goNextHandler();
          },
        });
      }
    }
  }, [activeQuestion]);
  
  // Conclusion Animation : lorsque la dernière question est répondue, la zone de conclusion devient bleu foncée
  const conclusionAnimations = contextSafe(() => {
    if ( answersProgression !== null && answersProgression[ answersProgression.length - 1 ].answerState !== 'attente' ) {
      
      let conclusionTimeline = gsap.timeline();
      
      conclusionTimeline.to('#conclusion', {
        backgroundColor: '#d6e7f5',
        duration: 1,
        ease: 'expoScale(0.5,7,none)',
        delay: 2,
      });
      
      conclusionTimeline.to('#conclusion .resultats', {
        autoAlpha: 1,
        duration: 1,
      }, '<');
      
    }
  }, {dependencies: [answersProgression]});
  conclusionAnimations();
  
  // Event handlers
  const goNextHandler = contextSafe(() => {
    const quizContainerElem = gsapPageContainerRef.current.querySelector('#quiz');
    const activeQInteraction = quizContainerElem.querySelector(`.quiz-item:nth-child(${activeQuestion + 1}) > .grid`);
    const prevQInteraction = quizContainerElem.querySelector(`.quiz-item:nth-child(${activeQuestion}) .interaction`);
    
    // Next question reveal Timeline
    let goNextTimeline = gsap.timeline();
    
    // dévoiler la prochaine question en transition de hauteur
    goNextTimeline.to( activeQInteraction, {
      height: 'auto',
      duration: 0.25,
      ease: 'power1.in',
      onComplete: () => { 
        ScrollTrigger.refresh();
      },
    });
    
    // scroller jusqu'à la prochaine question
    goNextTimeline.to( window, { 
      duration: 0.5, 
      ease: 'power1.inOut',
      scrollTo: {
        y: `#quiz-item-${quizData[activeQuestion].id}`,
        offsetY: offsetHeight.current - 2,
      } 
    });
    
    // dévoiler les 2 zones zones de la prochaine question en alpha transition une à la fois
    goNextTimeline.to( activeQInteraction.children, {
      autoAlpha: 1,
      duration: 1.25,
      stagger: 1,
      onStart: () => {
        // Sets the border color of the current question interaction div to white
        gsap.set( prevQInteraction, {
          borderColor: '#d6e7f5'
        });
      },
      onComplete: () => { ScrollTrigger.refresh() },
    });

  }, { dependencies: [screenType, activeQuestion], scope: gsapPageContainerRef } );
  
  const updateQuiz = (index, answerResult) => {
    // Progression Bar
    setAnswersProgression( prevState => {
      return prevState.map((item, i) => {
        if (i === index ) { 
          return { ...item, answerState: answerResult }; 
        }
        return item;
      });
    });
    
    // Conclusion result
    if ( answerResult === 'bonne' ) {
      setGoodAnswerCount( goodAnswerCount + 1 );
    }
    
    const lastQuestionIndex = answersProgression.length - 1;
    
    if ( index < lastQuestionIndex ) {
      setActiveQuestion( index + 1 )
    }
    
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
        
        <Section2Intro className='intro'>
          <div className='card'>
            <div className='titre'>
              <h2>Testez vos connaissances avec notre quiz interactif&nbsp;!&nbsp;🧠💡</h2>
            </div>
            <div className='texte'>
              <h3><span>Vous vous demandez comment les différents</span> statuts d'immigration <b>influencent la vie quotidienne</b> <span>des personnes migrantes&nbsp;? </span></h3>
              <p>Ce quiz vous offrira une perspective unique sur les défis auxquels font face les personnes migrantes et vous permettra de mieux <b>comprendre les liens souvent méconnus entre le statut d'immigration et le bien-être quotidien.</b></p>
            </div>
            <div className='cta'>
              <button 
                className='button centered'
                onClick={goNextHandler}
              >
                Commencer le quiz&nbsp;&nbsp;<span>→</span>
              </button>
            </div>
          </div>
        </Section2Intro>
        
        <SectionProgression id='progression-bar' className='full-width'>
          { answersProgression ? 
            answersProgression.map( (question, index) => { return (
              <div key={index} className={`question 
                ${ question.answerState !== 'attente' ? 'question--repondue' : '' }
                ${ question.answerState === 'bonne' ? 'question--bonne' : '' }
                ${ question.answerState === 'mauvaise' ? 'question--mauvaise' : '' }
              `}>
                <div className='question__point'>
                  <div className='question__reponse'>
                    {question.answerState === 'bonne' && '\u2714'}{question.answerState === 'mauvaise' && '\u2717'}
                  </div>
                  <div className='question__number'>
                    {question.questionNumber}
                  </div>
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
            <>
            
              { answersProgression[ answersProgression.length - 1 ].answerState == 'attente' ? 
                <div className='grid next'>
                  <button className='button centered' onClick={ goNextHandler }>
                    Prochaine question<span>❯</span>
                  </button>
                  <p className='instructions'>
                    Encore {answersProgression.length - activeQuestion} question{answersProgression.length - activeQuestion > 1 && 's'} à répondre.
                  </p>
                </div>
              : ''}
              
              <div className='resultats'>
                { answersProgression[ answersProgression.length - 1 ].answerState !== 'attente' ?
                  <>
                    <p className='resultats__finaux'>
                     Résultat : { goodAnswerCount }/{answersProgression.length} !
                    </p>
                    
                    { goodAnswerCount < 4 ? 
                      <>
                        <p><b>Pas de panique, vous êtes sur la bonne voie&nbsp;!</b> Il est normal de ne pas tout savoir : les personnes migrantes sans statut et à statut précaire vivent souvent dans l'invisibilité, ce qui rend difficile la compréhension de leurs histoires et de leurs défis. Cependant, ce quiz vous a permis de mieux comprendre certains aspects clés de la réalité des personnes migrantes et les enjeux liés à leur statut d'immigration.</p>
                        <p>Nous vous encourageons à poursuivre votre apprentissage<br/> 
                        <Link to='/connaitre'>en explorant ces autres récits</Link><br/> 
                        et en nous suivant sur les réseaux sociaux pour en savoir plus.</p>
                      </>
                    : 
                      <>
                        <p><b>Félicitations&nbsp;!</b> Vous avez désormais une meilleure compréhension de la réalité vécue par les personnes migrantes sans statut ou à statut précaire, dont de nombreux problèmes et enjeux découlent de leur statut d’immigration.</p>
                        <p>Continuez à vous informer <Link to='/connaitre'>avec ces autres récits</Link><br/> et en nous suivant sur les réseaux sociaux.</p>
                      </>
                    }
                    
                    <div className='socials'>
                      <a href='' target='_blank'>FB</a> 
                      <a href='' target='_blank'>LI</a>
                    </div>
                    
                  </>
                : '' }
              </div>
              
            </>
          : ''}
        </SectionConclusion>
    
      </div>
    </PageLayout>
  )
}

export default QuizDevPage

export const Head = () => <title>Quiz | Au delà les statuts</title>
