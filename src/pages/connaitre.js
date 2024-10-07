import React, { useState, useRef }  from 'react'
import PageLayout from '../layouts/pageLayout'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import connaitreData from '../data/connaitreData'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'

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
    position: relative;
    
    span.small {
      position: absolute;
      bottom: 1rem;
      font-size: 1.5rem;
      line-height: 1;}}
  
  ${media.mediumUp`
    .bg-image {
      height: calc(95vh - var(--header-height));}
    h1 {
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh); 
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
      color: var(--color-bleu-tres-fonce);}}

  nav#realites-nav {
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
        gap: 1rem;
        &__intro {
          max-width: 30ch;
          background: white;}
        &__content {
          display: grid;
          align-items: center;
        }
      }
        
      .impact {
        margin: 5vh 5vw;
        grid-area: 1 / 1 / 2 / 2;
        color: white;
        border-radius: 6px;
        transform-origin: center center;
        
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
          padding: 1.5em 2.5em;
          margin-bottom: 0;
          line-height: clamp(1.1em, 3vh, 1.6em);}
        
        &:first-child p {
          visibility: visible !important;
          opacity: 1 !important;
        }
      }
    }
  }
}
  
  .mythe {
    grid-area: 1 / 1 / 2 / 2;
    position: relative;
    z-index: 1;
    padding: var(--v-spacer) var(--h-spacer) calc(var(--v-spacer) / 3);
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
    width: 100%;
    margin-inline: auto;
    grid-area: 2 / 1 / 3 / 2;
    padding: calc(var(--v-spacer) / 4) calc(var(--h-spacer) /2);
    &__bar-background {
      background-color: var(--color-bleu-tres-pale);
      width: 50%;
      margin-inline: auto;
      height: 0.8rem;
      border-radius: 0.4rem;}
    &__bar-animate {
      height: 100%;
      background-color: var(--color-bleu-clair);
      border-radius: 0.4rem;}
    .shortcuts {
      width: 50%;
      margin-inline: auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;}
    
  }
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
  // States, refs and variables
  const [screenType, setScreenType] = useState(''); 
  const [activeRealite, setActiveRealite] = useState(0);
  const gsapContainerRef = useRef();
  const { contextSafe } = useGSAP({ scope: gsapContainerRef });
  const realitesDataArray = connaitreData();
  const timelineRef = useRef([]);
  
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
  
  const labelClickHandler = contextSafe( (realiteIndex, clickedLabel ) => { 
    gsap.to( window, { 
      scrollTo: timelineRef.current[realiteIndex].scrollTrigger.labelToScroll(clickedLabel),
      duration: 0,
    });
  });
  
  // GSAP Animations pour la barre de navigation et les realite uniques
  const gsapAnimations = contextSafe(() => {
    
    let allRealitesHeight = 1000;
    
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
        id: 'realitesNavPin',
        trigger: '#realites-nav',
        pin: true,
        pinSpacing: false,
        start: 'top 120px',
        end: () => allRealitesHeight,
      }
    });
    
    // REALITE UNIQUE
    // La zone des realités apparaît doucement
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
    // creates an array of realite-unique items
    const realitesGsapArr = gsap.utils.toArray('.realite-unique');
    // create a ScrollTrigger for each realite
    realitesGsapArr.forEach( (element, realiteIndex) => {
      const elementYMargin = window.innerHeight * 0.05;
      const elementXMargin = window.innerWidth * 0.05;
      
      const mythTextToStrike = realitesDataArray[realiteIndex].mytheTitre;
      
      const mytheExplicationsHiddenHeight = element.querySelector('.mythe__explications').scrollHeight - element.querySelector('.mythe__explications').offsetHeight;
      
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
      }, 'mon-statut');
      
      // Impacts intro apparaît
      contentTimeline.from( element.querySelector('.impacts__intro'), {
        yPercent: '100',
        autoAlpha: 0,
      });      
      
      // Les impacts apparaissent, placés en désordre
      contentTimeline.from( element.querySelectorAll('.impacts .impact'), {
        yPercent: -100,
        autoAlpha: 0,
        stagger: 1,
        ease: 'power1.inOut',
      }, 'les-impacts');
      
      contentTimeline.to( element.querySelectorAll('.impacts .impact'), {
        x: `random(-${elementXMargin}, ${elementXMargin}, 3)`,
        y: `random(-${elementYMargin}, ${elementYMargin}, 3)`,
        stagger: 1,
        ease: 'power1.inOut'
      }, '<');
      
      contentTimeline.from( element.querySelectorAll('.impacts .impact > p'), {
        autoAlpha: 0,
        stagger: 1,
        ease: 'power2.in',
        delay: 0.2
      }, '<');
      
      // Impacts message de fin apparaît
      contentTimeline.from( element.querySelector('.impacts__fin'), {
        yPercent: '200',
        autoAlpha: 0,
      });
      
      // Le récit disparait (persona et narratif), laissant apparaître le mythe
      contentTimeline.to( element.querySelector('.recit'), {
        yPercent: '-100',
      });
      
      // Le conteneur du mythe devient bleu foncé tout de suite.
      contentTimeline.to( element.querySelector('.mythe'), {
        backgroundColor: 'var(--color-bleu-tres-fonce)',
      }, '<');
      
      // La barre de progression devient bleu foncé tout de suite.
      contentTimeline.to( element.querySelector('.progress'), {
        backgroundColor: 'var(--color-bleu-tres-fonce)',
      }, '<');
      
      // Mythe Titre se raye
      contentTimeline.to( element.querySelector('.mythe__titre .biffer'), {
        text: {
          value: mythTextToStrike,
          newClass: 'biffe',
        },
      }, 'mythe-et-realite');
      
      // Mythe sous-titre apparaît
      contentTimeline.from( element.querySelector('.mythe__sous-titre'), {
        autoAlpha: 0,
        height: 0
      });
      
      // Mythe explications apparaît 
      contentTimeline.from( element.querySelector('.mythe__explications'), {
        autoAlpha: 0,
        height: 0,
      });
      
      // Mythe textes défilent vers le haut 
      contentTimeline.to( element.querySelectorAll('.mythe__explications p'), {
        y: -1 * mytheExplicationsHiddenHeight,
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
          if (realiteIndex < realitesGsapArr.length - 1) {
            allRealitesHeight = self.end + window.innerHeight;
          } else {
            allRealitesHeight = self.end;
          }
          ScrollTrigger.refresh();
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
      
      timelineRef.current[realiteIndex] = contentTimeline;
      
    }); // end forEach
    
  }, { dependencies: [screenType], scope: gsapContainerRef } );
  
  return (
    <div 
      id='firstHoverTouchCheck' 
      onMouseEnter={firstHoverTouchHandler} 
      onTouchStart={firstHoverTouchHandler}
    >
      <PageLayout>
        <Section1Hero>
          <StaticImage 
            className='bg-image'
            src='../images/grand-portrait-Anabel.webp'
            layout='fullWidth'
            alt='portrait de Anabel'
            placeholder='blurred'
            quality={100}
          />
          <div className='overlay-text'>
            <h1>
              <span className='right'>Connaître</span>
              <span>l'essentiel&nbsp;...</span>
              <span className='small'>... de certains statuts d'immigration précaires et de l'absence de statut</span>
            </h1>
          </div>
        </Section1Hero>
          
        <div ref={gsapContainerRef} id='gsap-container'>
          <SectionRealites>
            <div className='titre'>
              <h2>Récits, mythes et réalités</h2>
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
                        <p className='impacts__intro' dangerouslySetInnerHTML={{ __html: realite.impactIntro }} ></p>
                        <div className='impacts__content'>
                          {realitesDataArray[index].impacts.map( (paragraphe, pIndex) => { 
                            return (
                              <div key={pIndex} className='impact'>
                                <p dangerouslySetInnerHTML={{ __html: paragraphe }}></p>
                              </div>
                          )})}
                        </div>
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
                    <nav className='shortcuts'>
                      <button
                        onClick={ () => labelClickHandler(index, 'mon-statut') } 
                      >Mon statut</button>
                      <button
                        onClick={ () => labelClickHandler(index, 'les-impacts') }
                      >Les impacts</button>
                      <button
                        onClick={ () => labelClickHandler(index, 'mythe-et-realite') }
                      >Mythe et réalité</button>
                    </nav>
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
