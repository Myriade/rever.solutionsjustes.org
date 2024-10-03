import React, { useState, useRef }  from 'react'
import PageLayout from '../layouts/pageLayout'
import { Link } from 'gatsby'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import connaitreData from '../data/connaitreData'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

const Section1Hero = styled.section`
  background-color: var(--color-bleu-tres-pale);
  background-image: url(/images/grand-portrait-Anabel.webp);
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
    position: relative;
    span.small {
      position: absolute;
      bottom: 1rem;
      font-size: 1.5rem;
      line-height: 1;}}
  
  ${media.mediumUp`
    height: calc(95vh - var(--header-height));
    h1 {
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 15ch);
      span.right {
        text-align: right;
      }
    }
  `};
`;

const SectionRealites = styled.section`
  padding: 0.5rem;
  display: grid;
  grid-template-columns: 10% 90%;
  grid-template-rows: auto auto;
  background: var(--color-bleu-tres-pale);
  
  > .titre {
    grid-area: 1 / 1 / 2 / 3;
    width: 100%;
    h2 {
      color: var(--color-bleu-tres-fonce);
      margin-bottom: 1rem;}}

  nav {
    ul {
      list-style-type: none;
      padding: 0;
      margin-top: 0;
      display: grid;
      gap: calc(var(--v-spacer) / 2);}
    li.realite-nav-item {
      background: var(--color-bleu-clair);
      color: white;
      border: 2px solid white;
      border-radius: 17px;
      border-bottom-left-radius: 0;
      line-height: 1.25;
      a {
        display: grid;;
        font-weight: 400;
        align-items: center;
        padding: 0.75em 1em;
        &:hover {
          cursor: pointer;}}
      &:hover, &.active {
        background: var(--color-bleu-gris);}}}
  
  #realites-container {
    margin-left: 2vw !important;}
  
  .realite-unique {
    height: calc(100vh - var(--header-height) - var(--v-spacer));
    overflow: hidden;
    background: white;
    border-radius: var(--border-radius);
    margin-bottom: var(--v-spacer);
    display: grid;
    grid-template-rows: 1fr auto;}
      
  .recit {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    z-index: 2;
    padding: var(--v-spacer) var(--h-spacer) calc(var(--v-spacer) / 3);
    background: white;
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--h-spacer);
        
    &__personna {
      background: white;
      h2 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: none;
        span {
          font-weight: 800;}}}
        
    &__narratif {
      background: white;
      position: relative;
      display: grid;
      
      p {
        margin-block: 0 1em;}
        
      p.paragr {
        background: white;
        overflow: hidden;}
        
      .presentation {
        grid-area: 1 / 1 / 2 / 2; }
      
      .impacts {
        grid-area: 1 / 1 / 2 / 2; 
        display: grid;
        grid-template-rows: auto 1fr auto;
        align-items: center;
        justify-items: center;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;}
        
      .impact {
        width: 50%;
        grid-area: 2 / 1 / 3 / 2;
        color: white;
        border-radius: 4px;
        margin-block: 20px;
        
        &:first-of-type {
          background: var(--color-bleu-tres-pale);
          color: var(--bleu-tres-fonce);}
        &:nth-of-type(2n) {
          background: var(--color-bleu-clair);}
        &:nth-of-type(3n) {
          background: var(--color-bleu-aqua);}
        &:nth-of-type(4n) {
          background: var(--color-bleu-gris);}
        &:nth-of-type(5n) {
          background: var(--color-bleu-tres-fonce);}
        p {
          padding: 0.75em 1em;
          margin-bottom: 0;
        }
      }
    }
  }
  
  .mythe {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    z-index: 1;
    padding: var(--v-spacer) var(--h-spacer) calc(var(--v-spacer) / 3);
    background: var(--color-bleu-tres-fonce);
    color: white;
    display: grid;
    align-content: center;
    overflow: hidden;
    &__intro {
      .mythe__titre {
        position: relative;
        display: inline-block;
        .biffe {
          text-decoration: line-through;
          text-decoration-color: hsla(353, 90%, 61%, 0.7);
          text-decoration-thickness: 5px;
        }
      }
      .mythe__sous-titre {
        display: grid;
        grid-template-columns: 100px auto;
        gap: 1rem;
        margin-bottom: 1rem;
        align-items: center;
        h3 {
          margin-bottom: 0;
        }
      }
    }
    &__explications {
      overflow: hidden;
      p {
        margin-block: 0 1em;
        max-width: 60ch;
        margin-inline: auto;
        line-height: 1.6;
      }
    }
  }
      
  .progress {
    grid-area: 2 / 1 / 3 / 2;
    padding: calc(var(--v-spacer) / 4) calc(var(--h-spacer) /2);
    &__bar-background {
      height: 0.8rem;
      width: 50%;
      margin-inline: auto;
      background-color: var(--color-bleu-tres-pale);
      border-radius: 0.4rem;}
    &__bar-animate {
      height: 100%;
      background-color: var(--color-bleu-clair);
      border-radius: 0.4rem;}}
`;

const Section4Cta = styled.section`
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
    max-width: 32ch;}
  
  .button {
    margin-top: var(--h-spacer);
    padding-inline: 3vw;}
  
  ${media.mediumUp`
    grid-template-columns: 1fr 1fr;
  `}
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, TextPlugin);

const ConnaitrePage = () => {
  const [screenType, setScreenType] = useState(''); 
  const [activeRealite, setActiveRealite] = useState(0);
  
  const gsapContainerRef = useRef();
  
  const { contextSafe } = useGSAP({ scope: gsapContainerRef });
  
  const realitesDataArray = connaitreData();
  
  // event handlers
  function firstHoverTouchHandler() {
    // Detect computer mouse or touch screen 
    if (!screenType) {
      if (window.matchMedia('(hover: hover)').matches) {
        console.log('Device has a mouse or touchpad events');
        setScreenType('mouse');
        gsapAnimations();
      } else {
        console.log('Device has no mouse, so has touch events');
        setScreenType('touch');
      }
    }
  }
  
  const navClickHandler = contextSafe( (clickedIndex) => {
    const clickedId = realitesDataArray[clickedIndex].idUnique;
    gsap.to( window, { 
      duration: 0, 
      scrollTo: {
        y: `#${clickedId}`,
        offsetY: 120
      }
    });
    gsap.from( '#realites-container' , {
      autoAlpha: 0,
      duration: 1
    });
    setActiveRealite(clickedIndex);
    // reset scroll progress to its start
    const associateScrollTrigger = ScrollTrigger.getById(`realiteContent-index-${clickedIndex}`);
    associateScrollTrigger.scroll(associateScrollTrigger.start);
    
  });
  
  // GSAP Animations pour la barre de navigation et les realite uniquess
  const gsapAnimations = contextSafe(() => {
    
    // creates an array of realite-unique items
    const realitesGsapArr = gsap.utils.toArray('.realite-unique');
    
    // NAVIGATION 
    // nav items appears smoothly
    gsap.from('.realite-nav-item', {
      opacity: 0, 
      scale: 0, 
      duration: 0.3, 
      stagger: 0.5,
      scrollTrigger: {
        id: 'realitesNavReveal',
        trigger: '#realites-nav',
        start: 'top 70%',
        //markers: true,
      },
    });
    
    // nav bar pins 
    gsap.to('#realites-nav', {
      scrollTrigger: {
        trigger: '#realites-nav',
        pin: true,
        pinSpacing: false,
        start: 'top 120px',
        end: "+=" + ( window.innerHeight * 5 * (realitesDataArray.length + 0.6)),
        //markers: true,
      }
    });
    
    // REALITE UNIQUE
    // La première realité apparaît doucement
    gsap.from( '#realites-container', {
      autoAlpha: 0,
      duration: 1.5,
      delay: 1,
      scrollTrigger: {
        id: 'firstRealiteReveal',
        trigger: '#realites-nav',
        start: 'top 70%'
      }
    });
    
    // Animations au scroll dans chacune des fiches de réalité
    realitesGsapArr.forEach((element, realiteIndex) => {
      const mythTextToStrike = realitesDataArray[realiteIndex].mytheTitre;
      
      const mytheAllParagraphesHeight = element.querySelector('.mythe__explications').scrollHeight;
      
      // ProgressBar timeline
      let ProgressBarTimeline = gsap.timeline();
      
      ProgressBarTimeline.from( element.querySelector('.progress__bar-animate'), {
        width: 0,
        ease: 'none'
      });
      
      // Content timeline
      let contentTimeline = gsap.timeline();
      
      // Présentation
      contentTimeline.from( element.querySelector('.presentation'), {
        autoAlpha: 0,
        yPercent: 50,
      });
      
      // Présentation disparait
      contentTimeline.to( element.querySelector('.presentation'), {
        autoAlpha: 0,
        yPercent: -50,
      });
      
      // Impacts intro apparaît
      contentTimeline.from( element.querySelector('.impacts__intro'), {
        yPercent: '100',
        autoAlpha: 0,
      });      
      
      // Les impacts apparaissent, placés en désordre
      contentTimeline.to( element.querySelectorAll('.impacts .impact'), {
        y: 'random(-20, 20, 5)',
        xPercent: 'random(-50, 50, 5)',
        transformOrigin: 'center center',
        // visibility: 'visible',
        // opacity: 1,
        autoAlpha: 1,
        stagger: 1,
        ease: 'power1.inOut'
      });
      
      // Impacts message de fin apparaît
      contentTimeline.from( element.querySelector('.impacts__fin'), {
        yPercent: '200',
        autoAlpha: 0,
      });
      
      // Le récit disparait (persona et narratif), laissant apparaître le mythe
      contentTimeline.to( element.querySelector('.recit'), {
        yPercent: '-100',
      });
      
      // La barre de progression s'adapte à la couleur de fond
      contentTimeline.to( element.querySelector('.progress'), {
        backgroundColor: 'var(--color-bleu-tres-fonce)',
      }, '<');
      
      // Mythe Titre se raye
      contentTimeline.to( element.querySelector('.mythe__titre .biffer'), {
        text: {
          value: mythTextToStrike,
          newClass: 'biffe',
        },
      });
      
      // Mythe sous-titre apparaît
      contentTimeline.from( element.querySelector('.mythe__sous-titre'), {
        autoAlpha: 0,
        yPercent: '50',
        height: 0
      });
      
      // Mythe explications apparaît 
      contentTimeline.from( element.querySelector('.mythe__explications'), {
        autoAlpha: 0,
        height: 0,
        yPercent: '50'
      });
      
      // Mythe textes défilent vers le haut 
      contentTimeline.to( element.querySelectorAll('.mythe__explications p'), {
        y: -1 * mytheAllParagraphesHeight / 2,
      });
      
      ScrollTrigger.create({
        id: `realiteContent-index-${realiteIndex}`,
        trigger: element,
        animation: contentTimeline,
        start: 'top 120px',
        end: "+=" + (window.innerHeight * 5),
        scrub: 1.5,
        pin: element,
        toggleClass: 'active',
        fastScrollEnd: true,
        onEnter: (self) => {
          setActiveRealite(realiteIndex);
        },
        onEnterBack: (self) => {
          setActiveRealite(realiteIndex);
        },
        //markers: true,
      });
      
      ScrollTrigger.create({
        id: `realiteProgressBar-index-${realiteIndex}`,
        trigger: element,
        animation: ProgressBarTimeline,
        start: 'top 120px',
        end: "+=" + (window.innerHeight * 5),
        scrub: 1.5,
        //markers: true,
      });
      
    });
    
  }, { dependencies: [screenType], scope: gsapContainerRef } );
  
  return (
    <div 
      id='firstHoverTouchCheck' 
      onMouseEnter={firstHoverTouchHandler} 
      onTouchStart={firstHoverTouchHandler}
    >
      <PageLayout>
        <Section1Hero>
          <div className='overlay-text'>
            <h1>
              <span className='right'>Connaître</span> 
              <span></span> 
              <span>l'essentiel&nbsp;...</span>
              <span className='small'>... de certains statuts d'immigration précaires et de l'absence de statut</span>
            </h1>
          </div>
        </Section1Hero>
          
        <div ref={gsapContainerRef} id='gsap-container'>
          <SectionRealites>
            <div className='titre'>
              <h2>Récits mythes et réalités</h2>
            </div>
            <nav id='realites-nav'>
              <ul>
                {realitesDataArray.map( (realite, index) => { return (
                  <li 
                    key={index} 
                    className={activeRealite === index ? 'realite-nav-item active' : 'realite-nav-item'}
                  >
                    <a 
                      onClick={() => navClickHandler(index)}
                      aria-label='Aller à la section'
                    >
                      {realite.nom}, <br/>
                      <em>{realite.titreCourt}</em>
                    </a>
                  </li>
                )})}
                <li className='realite-nav-item shortcut'>
                  <a href='#s-impliquer'>
                    S'impliquer
                  </a>
                </li>
              </ul>
            </nav>
            
            <div id='realites-container'>
              {realitesDataArray.map( (realite, index) => { return (
                <div
                  className='realite-unique' 
                  id={realite.idUnique} 
                  key={index}
                  rel='noreferrer'
                > 
                
                  <div className='recit'>
                    <div className='recit__personna'>
                      <h2>
                        {realite.intro} <span>{realite.statut}</span>.
                      </h2>
                    </div>
                    <div className='recit__narratif'>
                      <div className='presentation'>
                        {realitesDataArray[index].presentation.map( (paragraphe, pIndex) => { 
                          return (
                          <p key={pIndex} className='paragr'>{paragraphe}</p>
                        )})}
                      </div>
                      <div className='impacts'>
                        <p className='impacts__intro'>{realite.impactIntro}</p>
                        {realitesDataArray[index].impacts.map( (paragraphe, pIndex) => { 
                          return (
                            <div key={pIndex} className='impact'>
                              <p dangerouslySetInnerHTML={{ __html: paragraphe }}></p>
                            </div>
                        )})}
                        <p className='impacts__fin'>Ce ne sont que quelques exemples parmi de nombreuses autres situations.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className='mythe'>
                    <div className='mythe__intro'>
                      <h3 className='mythe__titre'>
                        MYTHE&nbsp;:<br/>
                        «&nbsp;<span className='biffer'>{realite.mytheTitre}</span>&nbsp;»
                      </h3>
                      <div className='mythe__sous-titre'>
                        <div>
                          <img
                            src='/images/logo-sans-texte.svg'
                            alt='Solutions Justes'
                          />
                        </div>
                        <h3>{realite.mytheSoustitre}</h3>
                      </div>
                    </div>
                    <div className='mythe__explications'>
                      {realite.mytheExplications.map( (paragraphe, pIndex) => { return (
                        <p key={pIndex}>{paragraphe}</p>
                      )})}
                    </div>
                  </div>
                  
                  <div className='progress'>
                    <div className='progress__bar-background'>
                      <div className='progress__bar-animate'></div>
                    </div>
                  </div>
                  
                </div>
              )})}
            </div>
            
          </SectionRealites>  
        </div>
        
        <Section4Cta id='s-impliquer'>
          <h2>S'impliquer davantage</h2>
          <div className='grid'>
          
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
                <p>Signer des pétitions de nos allié.e.s est une manière d’agir pour faire entendre votre voix et changer les choses.</p>
              </div>
              <a href='https://migrantrights.ca/take-action/participez/' className='button centered' target='_blank' rel='noreferrer'>
                Agir
              </a>
            </div>
          </div>
        </Section4Cta>
        
      </PageLayout>
    </div>
  )
}

export default ConnaitrePage

export const Head = () => <title>Pour connaître l'essentiel | Solutions justes</title>
