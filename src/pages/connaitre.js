import React, { useState, useRef, useEffect }  from 'react'
import PageLayout from '../layouts/pageLayout'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { media, breakpoints } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { TextPlugin } from 'gsap/TextPlugin'
import Glide from '@glidejs/glide'

import connaitreData from '../data/connaitreData'

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
    font-size: calc( (40vh - var(--header-height) - 10vh) / 3.5 );
    color: white;
    line-height: 1em;
    text-transform: uppercase;
    text-align: center;
    margin: 0 var(--h-spacer);
    display: grid;
    align-content: space-evenly;
    position: relative;
    span.small {
      text-transform: none;
      font-size: 1rem;
      line-height: 1;
      max-width: 35ch;
      justify-self: center;
    }}
  
  ${media.mediumUp`
    .bg-image {
      height: calc(95vh - var(--header-height));}
    h1 {
      align-content: stretch;
      align-items: center;
      text-align: unset;
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh); 
      span.right {
        text-align: right;}
      span.small {
        position: absolute;
        bottom: 6.5vh;
        right: 0;
        text-align: center;
        font-size: 1.5rem;
        max-width: unset;}
    }
  `};
`;

const SectionRealites = styled.section`
  padding: 0.5rem;
  background: var(--color-bleu-tres-pale);
  margin-inline: auto;
  
  > .titre {
    h2 {
      color: var(--color-bleu-tres-fonce);}}
  
  .nom {
    text-transform: uppercase;}
    
  p {
    color: var(--color-bleu-tres-fonce);}
    
  .instruction {
    display: none;
    visibility: hidden;}
  
  .recit, .mythe {
    padding: calc(var(--v-spacer) / 2) calc(var(--h-spacer) * 2);
    @media (max-height: 755px) {
      padding: calc(var(--v-spacer) / 3) var(--h-spacer);
    }
  }
      
  ${media.largeUp`
    display: grid;
    grid-template-columns: auto 1fr;
    grid-template-rows: auto auto;
    gap: 0 var(--h-spacer);
    
    > .titre {
      grid-area: 1 / 1 / 2 / 3;
      max-width: unset !important;
      width: 100%;}
      
    .instruction {
      display: block;
      visibility: visible;}
    
    .recit, .mythe {
      padding: var(--v-spacer) var(--h-spacer) calc(var(--v-spacer) / 2);
    }
    
  `}

  nav#realites-nav {
    padding-block: 1rem;
    z-index: 30;
    background-color: var(--color-bleu-tres-pale);
    ul {
      list-style-type: none;
      padding: 0;
      margin-top: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      align-items: stretch;
      margin-bottom: 0;}
    li.realite-nav-item {
      background: var(--color-bleu-clair);
      color: white;
      border-radius: 10px;
      line-height: 1.4;
      display: grid;
      a {
        display: grid;
        align-content: center;
        font-weight: 400;
        text-align: center;
        max-width: 17ch;
        padding-inline: 1rem;
        padding-block: 0.5em;
        position: relative;
        &:hover {
          cursor: pointer;}
        strong {
          display: block;
          overflow: hidden;}}
      
      &:hover, &.active {
        background: var(--color-bleu-tres-fonce);}
      
      .avatar {
        display: none;
        position: absolute;
        right: -4vh;
        top: -0.5vh;
        > * {
          width: clamp(30px, 6vh, 45px);
          height: clamp(30px, 6vh, 45px);
          margin-inline: auto;}}
        
      &.shortcut .avatar {
        > div {
          background-color: white;
          color: var(--color-bleu-tres-fonce);
          font-size: 1.5rem;
          border-radius: 50%;
          display: grid;
          align-items: center;}}}
          
    ${media.largeUp`
      z-index: 55;
      background-color: unset;
      padding-block: 0;
      ul {
        gap: var(--v-spacer) 1rem;
        height: 80vh;
        display: grid;}
      li.realite-nav-item a {
        padding-top: clamp(12px, 3.5vh, 25px);}
      li.realite-nav-item .avatar {
        display: block;
        top: -3vh;
        right: unset;
        width: 100%;}
    `}
    
    @media (max-height: 755px) {
      ul {
        gap: clamp(10px, 4vh,40px) 1rem;}
    }
    
  }
  
  #realites-container {
    margin-inline: 0 !important;
    margin-top: calc(var(--v-spacer) / 2);
  
    .realite-unique {
      background: white;
      border-radius: 10px;
      overflow: hidden;
    }
  
    ${media.largeUp`
      margin-top: 0;
      .realite-unique {
        height: unset;
        margin-bottom: var(--v-spacer);
        display: grid;
        grid-template-rows: 1fr auto;
        height: calc(100vh - var(--header-height) - var(--v-spacer));}
    `}
    
  }
      
  .recit {
    position: relative;
    z-index: 2;
    background: white;
    display: grid;
    gap: var(--v-spacer);
        
    &__personna {
      background: white;
      display: grid;
      align-items: center;
      grid-template-rows: auto 1fr;
      text-align: center;
      .philactere {
        display: grid;
        justify-items: center;
        align-items: center;
        padding-inline: 4vh;
        > * {
          grid-area: 1/1/2/2;
          position: relative;}}
          
      h2 {
        color: white;
        font-size: 1rem;
        font-weight: 400;
        text-transform: none;
        max-width: 23ch;
        line-height: 1.6;
        &::before {
          content: '';
          display: block;
          background-image: url(/images/connaitre/guillemet.svg);
          background-repeat: no-repeat;
          height: 2rem;
          width: 3rem;
          margin-inline: auto;
          margin-bottom: 1rem;}
        span {
          font-weight: 700;}}
          
      .identification {
        img {
          width: 13vh;
          height: 13vh;
          margin-bottom: calc(var(--v-spacer) / 4);
          border: 0.75px solid black;
          border-radius: 50%;}
        p {
          margin-block: 0;}}}
        
    &__narratif {
      background: white;
      position: relative;
      display: grid;
      gap: var(--v-spacer);
      overflow: hidden;
      
      p {
        margin-block: 0 1em;}
        
      .presentation {
        grid-area: 1 / 1 / 2 / 2; 
        background-color: white;
        p {
          max-width: 40ch;
          margin-inline: auto;}}
      
      .impacts {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 1rem;
        &__avatar {
          float: left;
          margin-right: 1rem;
          width: 55px;
          height: 55px;
        }
        &__intro {
          max-width: 25ch;
          font-size: 1.5rem;
          margin-bottom: 0;}
        &__content {
          display: grid;
          align-items: center;
        }
        &__fin {
          background-color: var(--color-bleu-clair);
          color: white;
          font-weight: 600;
          padding: 1.5rem 2rem;
          border-radius: 10px;
          font-size: 1rem;}}
        
      .impact {
        margin: 3vh 4vw;
        border-radius: 6px;
        transform-origin: center center;
        p {
          color: white;
          padding: 3vh 1.5em;
          margin-bottom: 0;
          line-height: clamp(1.1em, 3vh, 1.6em);}
        
        &:first-of-type {
          background: var(--color-bleu-tres-pale);
          p {color: var(--color-bleu-tres-fonce);}}
        &:nth-of-type(2n) {
          background: var(--color-bleu-clair);}
        &:nth-of-type(3n) {
          background: var(--color-bleu-aqua);}
        &:nth-of-type(4n) {
          background: var(--color-bleu-gris);}
        &:nth-of-type(5n) {
          background: var(--color-bleu-tres-fonce);}
        
        &:first-child p {
          visibility: visible !important;
          opacity: 1 !important;}}}
          
    ${media.onlySmall`
      .identification {
        img {
          width: 105px;
          height: 105px;}}
     .impact {
        margin-block: 25px;
        p {
          padding-block: 1.5em;
          line-height: 1.4em;
        }
      }
      
    `}
    
    ${media.largeUp` 
      grid-area: 1 / 1 / 2 / 2; 
      grid-template-columns: 1fr 2fr;
      gap: calc(var(--h-spacer) * 2) var(--v-spacer);
      
      &__narratif {
        .instruction {
          text-align: center;
          grid-area: 1/1/2/2;
          color: #aaa; 
          font-style: italic;}
        .impacts {
          opacity: 0;
          grid-area: 1 / 1 / 2 / 2;
          &__avatar {
            display: none;}
          &__instructions {
            opacity: 0;}}
        .impact {
          grid-area: 1 / 1 / 2 / 2;}}
      
      &__personna .philactere {
        padding-inline: unset;}
      
    `}
    
    @media (max-height: 680px) {
      &__personna .philactere {
        padding-inline: 4vh;}
    }
    
  }
  
  .mythe {
    position: relative;
    display: grid;
    background-color: var(--color-bleu-tres-fonce);
    
    * {color: white;}
    
    &__intro {
      position: relative;}
      
    &__titre {
      position: relative;
      display: inline-block;
      transform-origin: left top;
      .biffe {
        background-color: var(--color-bleu-tres-fonce);
        text-decoration: line-through;
        text-decoration-color: hsla(353, 90%, 61%, 0.7);
        text-decoration-thickness: 5px;}}
          
    &__sous-titre {
      background-color: var(--color-bleu-tres-fonce);
      display: grid;
      grid-template-columns: 2rem auto;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: start;
      h3 {
        font-size: clamp(18px, 1.6vw, 24px);
        font-weight: 400;
        margin-bottom: 0;
        line-height: 1.25;}}
      
    &__etiquette {
      overflow: hidden;}
      
    &__instruction {
      font-style: italic;
      color: var(--color-bleu-tres-pale);
      opacity: 0.5;
      position: absolute;}
      
    &__explications {
      overflow: hidden;
      p {
        margin-block: 0 1em;
        max-width: 60ch;
        margin-inline: auto;
        line-height: 1.6;
         a {
          text-decoration: underline;
          font-weight: normal;
        }
      }
    }
    
    ${media.largeUp`
      grid-area: 1 / 1 / 2 / 2;
      z-index: 1;
      overflow: hidden;
      &__sous-titre {
        grid-template-columns: 75px auto;}
    `}
    
  }
    
  .progress {
    display: none;
    visibility: hidden;
    width: 100%;
    margin-inline: auto;
    padding: calc(var(--v-spacer) / 4) calc(var(--h-spacer) /2);
    
    &__bar-background {
      background-color: var(--color-bleu-tres-pale);
      margin-inline: auto;
      height: 0.8rem;
      border-radius: 0.4rem;}
      
    &__bar-animate {
      height: 100%;
      background-color: var(--color-bleu-clair);
      border-radius: 0.4rem;}
      
    .shortcuts {
      margin-inline: auto;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      button {
        border: 0;
        background: transparent;
        &:hover {
          cursor: pointer;
          color: var(--color-bleu-clair) !important;
          text-decoration: underline;
        }
      }
    }
    
    ${media.largeUp`
      display: block;
      visibility: visible;
      grid-area: 2 / 1 / 3 / 2;
      &__bar-background {
        width: 50%;
      }
      .shortcuts {
        width: 50%;}
    `}
    
  }
`;

const BulletsControls = styled.div`
  display: grid;
  grid-template-columns: repeat(3, auto);
  justify-items: center;
  padding-top: calc(var(--v-spacer) / 2);	
  position: relative;
  
  button {
    border: 0;
    background: transparent;
    box-shadow: none;}
  
  .glide__bullets {
    position: initial;
    display: grid;
    grid-auto-columns: 1fr;
    grid-auto-flow: column;
    transform: unset;
    
    button {
      display: flex;
      align-items: center;
      flex-direction: column;
      &.glide__bullet--active, &:focus {
        .glide__bullet {
          background: black;
          border-color: black;}}}
  
    .glide__bullet {
      width: 15px;
      height: 15px;}}
      
  button.arrow {
    font-size: 2rem;
    font-family: sans;
  }
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

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, TextPlugin);

const breakPointsArray = [
  ['sm', `(max-width: ${breakpoints.smallMinusOne})`],
  ['md', `(min-width: ${breakpoints.small}) and (max-width: ${breakpoints.mediumMinusOne})`],
  ['lg', `(min-width: ${breakpoints.medium}) and (max-width: ${breakpoints.largeMinusOne})`],
  ['xl', `(min-width: ${breakpoints.large})`]
];

/* Appelle createBreakpointHandler avec les points de rupture et une fonction de rappel personnalisée. */
const initializeBreakpointHandling = (breakPointsArray, onBreakpointChange) => {
  /* Crée un gestionnaire de points de rupture pour la taille de la fenêtre. */
  const createBreakpointHandler = (breakpoints, callback) => {
    // Crée un tableau d'objets contenant les informations nécessaires pour chaque point de rupture
    const mediaQueryListeners = breakpoints.map(([breakpointName, mediaQuery]) => ({
      breakpointName,
      mediaQueryListener: window.matchMedia(mediaQuery),
      handler: (event) => event.matches && callback(breakpointName)
    }));

    // Initialise les écouteurs et appelle la fonction de rappel pour chaque point de rupture
    mediaQueryListeners.forEach(({ mediaQueryListener, handler }) => {
      mediaQueryListener.addListener(handler);
      handler({ matches: mediaQueryListener.matches });
    });

    // Retourne une fonction de nettoyage pour supprimer les écouteurs
    return () => {
      mediaQueryListeners.forEach(({ mediaQueryListener, handler }) => 
        mediaQueryListener.removeListener(handler));
    };
  };

  // Appelle createBreakpointHandler avec les points de rupture et la fonction de rappel personnalisée
  return createBreakpointHandler(breakPointsArray, onBreakpointChange);
};

const ConnaitrePage = () => {
  /********  States, refs, context and data variables ********/
  const [screenType, setScreenType] = useState(null); 
  const [isHtmlReady, setIsHtmlReady] = useState(false);
  const [activeRealite, setActiveRealite] = useState(null);
  
  const gsapIsInit = useRef(false);
  const glideIsInit = useRef(false);
  const currentBreakpoint = useRef(null);
  const urlHash = useRef(null);
  const gsapContainerRef = useRef(null);
  const timelineRef = useRef([]);
  const glideCarrousel = useRef(null);
  const mobileIsFirstLoad = useRef(true);
  
  const { contextSafe } = useGSAP({ scope: gsapContainerRef });
  const realitesDataArray = connaitreData();
  
  // Dev helpers
  const stateStore = {
    screenType: screenType,
    currentBreakpoint: currentBreakpoint.current,
    isHtmlReady: isHtmlReady,
    glideIsInit: glideIsInit.current,
    gsapIsInit: gsapIsInit.current,
    activeRealite: activeRealite,
    urlHash: urlHash.current,
    //gsapContainerRef: gsapContainerRef.current,
    timelineRef: timelineRef.current,
    glideCarrousel: glideCarrousel.current,
    mobileIsFirstLoad: mobileIsFirstLoad.current,
  }
  console.log(stateStore);
  
  /******** Fonctions réutilisables *******/
  // Laptop et desktop GSAP Animations (appelé au moment du screenTypeCheck)
  const gsapAnimations = contextSafe(() => {
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
      },
    });
    
    // nav bar pins and hash control
    gsap.to('#realites-container', {
      scrollTrigger: {
        id: 'realitesNavPin',
        trigger: '#realites-container',
        pin: '#realites-nav',
        pinSpacing: false,
        start: 'top 115px',
        end: () => { 
          const timelineRefArrayLastIndex = timelineRef.current.length - 1;
          let endValue = 1000;
          if (timelineRefArrayLastIndex > 0) { 
            endValue = timelineRef.current[timelineRefArrayLastIndex].scrollTrigger.end;
          }
          return endValue;
        },
        onLeave: () => {
          document.querySelector('.pin-spacer-realitesNavPin').style.zIndex = 'unset';
          window.history.pushState({}, '', '#s-impliquer');
          urlHash.current = '#s-impliquer';
        },
        onEnterBack: () => {
          document.querySelector('.pin-spacer-realitesNavPin').style.zIndex = '55';
          const activeRealiteHash =  realitesDataArray[3].idUnique;
          const newLocationPath = `#${activeRealiteHash}`;
          window.history.pushState({}, '', newLocationPath);
        },
        //markers: true
      }
    });
    
    // REALITE UNIQUE
    // La zone des realités apparaît doucement
    gsap.from( '#realites-container', {
      autoAlpha: 0,
      duration: 1,
      delay: 0.5,
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
      
      // Présentation apparait par le bas
      contentTimeline.from( element.querySelector('.presentation'), {
        y: element.querySelector('.presentation').scrollHeight,
      });
      
      // Présentation instruction disparait en même temps
      contentTimeline.to( element.querySelector('.recit__instruction'), {
        autoAlpha: 0,
        height: 0
      }, '<');
      
      // Présentation disparait
      contentTimeline.to( element.querySelector('.presentation'), {
        autoAlpha: 0,
        y: element.querySelector('.presentation').scrollHeight * - 0.5,
      }, 'mon-statut');
      
      // Impacts la zone apparait, en meme temps
      contentTimeline.to( element.querySelector('.impacts'), {
        opacity: 1,
      }, '<');
      
      // Impacts intro apparaît en meme temps
      contentTimeline.from( element.querySelector('.impacts__intro'), {
        yPercent: '100',
        autoAlpha: 0,
      }, '<');
      
      // Impacts instruction apparaît en meme temps
      contentTimeline.from( element.querySelector('.impacts__instruction'), {
        yPercent: '100',
        autoAlpha: 0,
      }, '<');
      
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
      
      // La barre de progression devient bleu foncé tout de suite.
      contentTimeline.to( element.querySelector('.progress'), {
        backgroundColor: 'var(--color-bleu-tres-fonce)',
      }, '<');
      
      // Les liens de labels pour la timeline deviennent blancs tout de suite
      contentTimeline.to( element.querySelectorAll('.shortcuts button'), {
        color: 'white',
      }, '<');
      
      // Mythe intro se place plus bas
      contentTimeline.to( element.querySelector('.mythe__intro'), {
        y: element.querySelector('.mythe').offsetHeight / 3,
      }, '<');
      
      // Mythe Titre se raye
      contentTimeline.to( element.querySelector('.mythe__titre .biffer'), {
        text: {
          value: mythTextToStrike,
          newClass: 'biffe',
        },
      }, 'mythe-et-realite');
      
      // Mythe instruction disparait en même temps
      contentTimeline.to( element.querySelector('.mythe__instruction'), {
        autoAlpha: 0,
        height: 0
      }, '<');
      
      // Mythe sous-titre apparaît
      contentTimeline.from( element.querySelector('.mythe__sous-titre'), {
        autoAlpha: 0,
        height: 0
      });
      
      // Mythe intro se place plus haut en meme temps
      contentTimeline.to( element.querySelector('.mythe__intro'), {
        y: '0',
      }, '<');
      
      // Mythe étiquette disparait en meme temps 
      contentTimeline.to( element.querySelector('.mythe__etiquette'), {
        autoAlpha: 0,
        height: 0,
      }, '<');
      
      // Mythe titre rapetisse en meme temps 
      contentTimeline.to( element.querySelector('.mythe__titre'), {
        scale: '0.7',
        fontWeight: '400',
        marginBottom: '0.25em'
      }, '<');
      
      // Mythe explications apparait
      contentTimeline.from( element.querySelector('.mythe__explications'), {
        autoAlpha: 0,
        yPercent: 50,
      });
      
      // Mythe textes défilent vers le haut 
      contentTimeline.to( element.querySelectorAll('.mythe__explications p'), {
        y: -1 * mytheExplicationsHiddenHeight,
      });
      
      ScrollTrigger.create({
        id: `realiteContent-index-${realiteIndex}`,
        trigger: element,
        scrub: 1.5,
        animation: contentTimeline,
        pin: element,
        pinSpacing: true,
        start: 'top 110px',
        end: "+=" + (window.innerHeight * 5),
        toggleActions: 'play none none none',
        onEnter: (self) => {
          // console.log('onEnter, ', realiteIndex);
          ScrollTrigger.refresh()
          if (activeRealite !== realiteIndex && urlHash.current !== '#s-impliquer') { 
            // console.log('activeRealite sate change, ', realiteIndex);
            setActiveRealite(realiteIndex);
          }
        },
        onEnterBack: (self) => {
          // console.log('onEnterBack, ', realiteIndex);
          if (activeRealite !== realiteIndex) { 
            // console.log('activeRealite sate change, ', realiteIndex);
            setActiveRealite(realiteIndex);
          }
        },
        //markers: true
      });
      
      ScrollTrigger.create({
        id: `realiteProgressBar-index-${realiteIndex}`,
        trigger: element,
        animation: ProgressBarTimeline,
        start: 'top 115px',
        end: "+=" + (window.innerHeight * 5),
        scrub: 1.5,
        //markers: true,
      });
      
      timelineRef.current = [...timelineRef.current, contentTimeline];
      
    }); // end forEach
    
    console.log('GSAP is set (full)');
  }, { scope: gsapContainerRef } );
  
  // Mobiles touch GSAP Animations sobres (appelé au moment du screenTypeCheck)
  const sobreGsapAnimations = contextSafe(() => {
    const headerBottomInViewport = document.querySelector('#page-wrapper header').getBoundingClientRect().bottom; // pour le navbar pin
    const navElement = gsapContainerRef.current.querySelector('#realites-nav');
    const allRealitesElement = gsapContainerRef.current.querySelector('#realites-container');
    
    // nav items appears smoothly
    gsap.from('.realite-nav-item', {
      opacity: 0, 
      scale: 0, 
      duration: 0.3, 
      stagger: 0.5,
      scrollTrigger: {
        id: 'touchRealitesNavReveal',
        trigger: '#realites-nav',
        start: 'top 70%',
      },
    });
  
    // La zone des realités apparaît doucement
    gsap.from( '#realites-container', {
      autoAlpha: 0,
      duration: 1,
      delay: 0.5,
      scrollTrigger: {
        id: 'touchFirstRealiteReveal',
        trigger: '#realites-nav',
        start: 'top 70%'
      }
    });
    
    // Nav bar pin function to use in the next gsap tween
    const navBarPin = () => {
      const gsapPin = gsap.to('#realites-nav', { 
        scrollTrigger: {
          id: 'touchRealitesNavPin',
          trigger: '#realites-nav',
          pin: true,
          pinSpacing: false,
          start: 'top ' + headerBottomInViewport,
          end: () => `+=${allRealitesElement.offsetHeight}`,
          //markers: true,
        }
      });
      return gsapPin;
    }
    
    // Nav bar sub-titles disapear after 40px of scroll
    gsap.to( navElement.querySelectorAll('strong'), {
      height: 0,
      autoAlpha: 0,
      scrollTrigger: {
        id: 'touchNavHidesSubtitles',
        trigger: '#realites-container',
        start: 'top 40%',
        end: '+=40px',
        scrub: true,
        //markers: true,
        onLeave: (self) => {
          navBarPin();
        },
        onEnterBack: (self) => {
          ScrollTrigger.getById('touchRealitesNavPin').kill();
        },
      }
    });
    
    // Animations au scroll dans chacune des fiches de réalité
    const realitesGsapArr = gsap.utils.toArray('.realite-unique'); // creates an array of realite-unique items
    
    realitesGsapArr.forEach( (element, realiteIndex) => {
      
      // Impacts apparaissent progressivement de chaque cotes
      const impactsGsapArr = gsap.utils.toArray(element.querySelectorAll('.impact') ); // creates an array of impact items
      impactsGsapArr.forEach( (impact, impactIndex) => {
        gsap.from( impact, {
          autoAlpha: 0,
          xPercent: -50,
          scrollTrigger: {
            trigger: impact,
            id: `test`,
            start: 'top 70%',
            toggleActions: 'play none none reset',
          }
        });
      });
      
      // Mythe Titre se raye
      const mythTextToStrike = realitesDataArray[realiteIndex].mytheTitre;
      gsap.to( element.querySelector('.mythe__titre .biffer'), {
        text: {
          value: mythTextToStrike,
          newClass: 'biffe',
        },
        scrollTrigger: {
          id: 'touchMytheTextBiffe',
          trigger: element.querySelector('.mythe__titre'),
          start: 'top 70%',
          end: 'bottom 30%', 
          scrub: 0.5,
        // markers: true,
        },
        duration: 2.5,
      });
      
    }); // end forEach
    
    console.log('GSAP is set (sobre)');
  }, { dependencies: [activeRealite], scope: gsapContainerRef } );
  
  // Breakpoint set and change handler
  const onBreakpointChange = breakpoint => {
    if ( currentBreakpoint.current && currentBreakpoint.current !== breakpoint ) {
      console.log(`CHANGING Viewport size to : ${breakpoint}`);
      window.location.reload();
    } else if ( currentBreakpoint.current === null || currentBreakpoint.current === breakpoint) {
      console.log(`Viewport size is : ${breakpoint}`, '. Setup begins.');
      currentBreakpoint.current = breakpoint;
      setIsHtmlReady(true);
    } 
  }
  
  /******** Event Handlers *******/
  const navClickHandler = contextSafe( (clickedIndex, event) => {
    if (typeof event !== 'undefined') { event.preventDefault() }
    // console.log('navClickHandler called with ', clickedIndex);
    if (clickedIndex !== activeRealite) { setActiveRealite(clickedIndex); }
    
    if (screenType === 'mouse' || screenType === 'touch-large' ) {
      
      // Fade-out fade-in animation
      gsap.from( '#realites-container', {
        autoAlpha: 0,
        duration: 1
      });
    
      // Reset active realite scroll its progress near start
      const associateScrollTrigger = ScrollTrigger.getById(`realiteContent-index-${clickedIndex}`);
      associateScrollTrigger.scroll(associateScrollTrigger.start + 1);
      
    } else if ( glideIsInit.current && (screenType === 'touch' || screenType === 'mouse-narrow') )  {
      // console.log('navClickHandler glideIsInit clickedIndex :', clickedIndex);
      glideCarrousel.current.go(`=${clickedIndex}`);
      const navBottomInViewport = gsapContainerRef.current.querySelector('#realites-nav').getBoundingClientRect().bottom;
      // scroll to top under the nav, and recalculate the scrolltriggers
      gsap.to( window, { 
        scrollTo: {
          y: '#realites-container',
          offsetY: navBottomInViewport,
        },
      });
      urlHash.current = realitesDataArray[clickedIndex].idUnique;
      
      // update the glidetrack elem height
      const glideTrackElem =  gsapContainerRef.current.querySelector('.glide__track ')
      const activeElemHeight = gsapContainerRef.current.querySelectorAll('.glide__slide')[clickedIndex].offsetHeight;
      gsap.to( glideTrackElem, {
        height: activeElemHeight,
        duration: 0.5,
      });
    }
    
  }, {dependencies: [screenType, activeRealite, gsapAnimations]});
  
  const glideControlClickHandler = contextSafe( (clickedIndex) => {
    setActiveRealite(clickedIndex);
    // scroll to top
    const navBottomInViewport = gsapContainerRef.current.querySelector('#realites-nav').getBoundingClientRect().bottom;
    gsap.to( window, { 
      scrollTo: {
        y: '#realites-container',
        offsetY: navBottomInViewport,
      },
    });
    // update the glidetrack elem height
    const glideTrackElem =  gsapContainerRef.current.querySelector('.glide__track ')
    const activeElemHeight = gsapContainerRef.current.querySelectorAll('.glide__slide')[clickedIndex].offsetHeight;
    gsap.to( glideTrackElem, {
      height: activeElemHeight,
      duration: 0.5,
    });
    ScrollTrigger.refresh();
  });
  
  const labelClickHandler = contextSafe( (realiteIndex, clickedLabel ) => { 
    if (screenType === 'mouse' || screenType === 'touch-large') {
      gsap.to( window, { 
        scrollTo: timelineRef.current[realiteIndex].scrollTrigger.labelToScroll(clickedLabel),
      });
    }
  });
  
  const simpliquerClickHandler = contextSafe( (event) => {
    if (typeof event !== 'undefined') { event.preventDefault() }
    if (glideIsInit.current !== true) { document.querySelector('.pin-spacer-realitesNavPin').style.zIndex = '0'}
    gsap.to( window, { 
      scrollTo: {y: '#s-impliquer', offsetY: 130},
    });
    window.history.pushState({}, '', '#s-impliquer');
    urlHash.current = '#s-impliquer';
  });
  
  /******** Browser Effects (useEffect) *******/
  // Screen type check (touch or mouse)
  useEffect( () => {
    if (!screenType) {
      if (window.matchMedia('(hover: hover)').matches) {
        //console.log('Device has a mouse or touchpad events');
        if (window.matchMedia(`(min-width: ${breakpoints.large})`).matches) {
          //console.log(`Screen is more than ${breakpoints.large} wide.  Full Animations ok.`);
          setScreenType('mouse');
        } else {
          setScreenType('mouse-narrow');
          //console.log(`Screen is less than ${breakpoints.large} wide. Animations sobres.`);
        }
      } else {
        console.log('Device has no mouse, so has touch events.');
        if (window.matchMedia(`(min-width: ${breakpoints.large})`).matches) {
          //console.log(`Screen is more than ${breakpoints.large} wide. Full Animations ok.`)
          setScreenType('touch-large');
        } else {
          //console.log(`Screen is less than ${breakpoints.large} wide. Animations sobres.`);
          setScreenType('touch');
        }
      }
    }
  }, [screenType]);
  
  // Viewport size check (and logic on viewport resize ?)
  useEffect(() => {
    if ( screenType && !isHtmlReady) {
      const cleanupFunction = initializeBreakpointHandling(breakPointsArray, onBreakpointChange);
    }
  }, [screenType, isHtmlReady]);
  
  /******** 
            APRES screen and viewport check
                                             *********/
  // GSAP init
  useEffect( () => {
    if ( isHtmlReady && !gsapIsInit.current ) {
      if (screenType === 'mouse' || screenType === 'touch-large') {
        gsapAnimations();
      } else if ( screenType === 'mouse-narrow' || screenType === 'touch' ) {
        sobreGsapAnimations();  
      }
      gsapIsInit.current = true;
    }
  }, [screenType, activeRealite, isHtmlReady, gsapAnimations, sobreGsapAnimations]);
  
  // Mobile Glide Carrousel init
  useEffect( () => {
    if ( isHtmlReady && ( screenType === 'touch' || screenType === 'mouse-narrow' ) ) {
      glideCarrousel.current = new Glide('.glide', {
        type: 'slider',
        swipeThreshold: false,
        touchAngle: 0,
        dragThreshold: false,
        keyboard: false,
        hoverpause: true,
        perView: 1,
        gap: 20,
        bound: true,
        rewind: false,
      }).mount()
      glideIsInit.current = true;
      console.log('Glide Is Init');
    }
  }, [screenType, isHtmlReady]);
  
  // Refresh all ScrollTrigger une fois la premiere animation effectuee [--  PAS SURE --]
  useEffect( () => { 
    if ( isHtmlReady && gsapIsInit.current === true ) {
      ScrollTrigger.refresh(); 
    }
  }, [isHtmlReady] )
  
  // Hash in url triggers scroll to section (pour mobile, c'est seulement au premier montage du page load) [-- PAS SURE --]
  useEffect( () => {
    if ( (screenType !== null) && (gsapIsInit.current === true)) {
      ScrollTrigger.refresh();
      if ( window.location.hash ) {
        urlHash.current = window.location.hash;
        const hashSubstring = urlHash.current.substring(1);
        // console.log('url has hash : ', hashSubstring);
        if ( (urlHash.current !== '#s-impliquer') && (activeRealite === null)  ) {
          const correspondingDataArrayIndex = realitesDataArray.findIndex(item => item.idUnique === hashSubstring);
          if (screenType === 'mouse' || screenType === 'touch-large') {
            navClickHandler(correspondingDataArrayIndex);
            ScrollTrigger.refresh();
          } else if (glideIsInit.current === true) {
            navClickHandler(correspondingDataArrayIndex);
            mobileIsFirstLoad.current = false; 
          }
        } else if (urlHash.current === '#s-impliquer' && mobileIsFirstLoad.current) {
          if (screenType === 'mouse' || screenType === 'touch-large' || glideIsInit.current === true ) {
            simpliquerClickHandler();
            mobileIsFirstLoad.current = false;
          }
        }
      }
    }
  }, [screenType, activeRealite, mobileIsFirstLoad, navClickHandler, realitesDataArray, simpliquerClickHandler]);
  
  // Change hash to the corresponding activeRealite state
  useEffect( () => {
    if ( activeRealite !== null ) {
      if ( screenType === 'mouse' || screenType === 'touch-large' || glideIsInit.current === true ) {
        const activeRealiteHash =  realitesDataArray[activeRealite].idUnique;
        const newLocationPath = `#${activeRealiteHash}`;
        window.history.pushState({}, '', newLocationPath);
        urlHash.current = newLocationPath;
      }
    }
    
  }, [activeRealite, realitesDataArray, screenType]);

  return (
    <div id='page-wrapper'>
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
              <span>l’essentiel&nbsp;...</span>
              <span className='small'>... de certains statuts d’immigration précaires et de l’absence de statut</span>
            </h1>
          </div>
        </Section1Hero>
        
        { isHtmlReady === true ?
          <div ref={gsapContainerRef} id='gsap-container'>
            <SectionRealites id='section-realites'>
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
                        onClick={(e) => navClickHandler(index, e)}
                        aria-label='Aller à la section'
                        href={`#${realite.idUnique}`}
                      >
                        <div className='avatar'>
                          <img src={`/images/connaitre/${realite.nom}.svg`} alt='Illustration portrait' />
                        </div>
                        <div className='nom'>{realite.nom}</div>
                        <strong>{realite.titreCourt}</strong>
                      </a>
                    </li>
                  )})}
                  <li className='realite-nav-item shortcut'>
                    <a href='#s-impliquer' onClick={(event) => simpliquerClickHandler(event)}>
                      <div className='avatar'><div>✓</div></div>
                      S'impliquer
                    </a>
                  </li>
                </ul>
              </nav>
              
              <div id='realites-container' className={screenType === 'touch' || screenType === 'mouse-narrow' ? 'glide' : ''}>
                
                <div className={screenType === 'touch' || screenType === 'mouse-narrow' ? 'glide__track' : ''} data-glide-el='track'>
                  <div className={screenType === 'touch' || screenType === 'mouse-narrow' ? 'glide__slides' : 'no-glide-slides'}>
                    
                    {realitesDataArray.map( (realite, index) => { return (
                      <div
                        className='realite-unique glide__slide'
                        id={realite.idUnique} 
                        key={index}
                        rel='noreferrer'
                      > 
                      
                        <div className='recit'>
                          <div className='recit__personna'>
                            <div className='philactere'>
                              <StaticImage 
                                src='../images/connaitre/philactere.svg'
                                format='svg'
                                alt=''
                                placeholder='none'
                              />
                              <h2>
                                {realite.intro}<span>{realite.statut}</span>.
                              </h2>
                            </div>
                            <div className='identification'>
                              <img src={`/images/connaitre/${realite.nom}.svg`} alt='Illustration portrait' />
                              <p className='nom'>{realite.nom}</p>
                              <p>{realite.titreCourt}</p>
                            </div>
                          </div>
                          
                          <div className='recit__narratif'>
                            <p className='recit__instruction instruction'>
                              Faites défiler pour lire mon histoire
                            </p>
                            <div className='presentation'>
                              {realitesDataArray[index].presentation.map( (paragraphe, pIndex) => { 
                                return (
                                <p 
                                  key={pIndex} 
                                  className='paragr' 
                                  dangerouslySetInnerHTML={{ __html: paragraphe}}></p>
                              )})}
                            </div>
                            <div className='impacts'>
                              <div className='impacts__intro'>
                                <img className='impacts__avatar' src={`/images/connaitre/${realite.nom}.svg`} alt='Illustration portrait' />
                                <p dangerouslySetInnerHTML={{ __html: realite.impactIntro }} ></p>
                              </div>
                              <div className='impacts__content'>
                                <p className='impacts__instruction instruction'>
                                  Faites défiler pour voir les impacts
                                </p>
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
                              <div className='mythe__etiquette'>MYTHE&nbsp;:</div>
                              «&nbsp;<span className='biffer'>{realite.mytheTitre}</span>&nbsp;»
                            </h3>
                            <p className='mythe__instruction instruction'>Faites défiler pour lire la suite</p>
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
                              <p 
                                key={pIndex}
                                dangerouslySetInnerHTML={{ __html: paragraphe }}
                              ></p>
                            )})}
                          </div>
                        </div>
                        
                        <div className='progress'>
                          <nav className='shortcuts'>
                            <button
                              onClick={ () => labelClickHandler(index, 'mon-statut') } 
                              aria-label='Aller à la section'
                            >&#8250; Mon statut</button>
                            <button
                              onClick={ () => labelClickHandler(index, 'les-impacts') }
                              aria-label='Aller à la section'
                            >&#8250; Les impacts</button>
                            <button
                              onClick={ () => labelClickHandler(index, 'mythe-et-realite') }
                              aria-label='Aller à la section'
                            >&#8250; Mythe et réalité</button>
                          </nav>
                          <div className='progress__bar-background'>
                            <div className='progress__bar-animate'></div>
                          </div>
                        </div>
                        
                      </div>
                    )})}
                    
                  </div>
                </div>
                
                { screenType === 'touch' || screenType === 'mouse-narrow' ? 
                  <BulletsControls>
                    <div data-glide-el="controls[nav]">
                      <button 
                        className='arrow' 
                        data-glide-dir="<"
                        onClick={ () => glideControlClickHandler( activeRealite - 1 )}
                      > 
                      ‹ 
                      </button>
                    </div>
                    <div className="glide__bullets" data-glide-el="controls[nav]">
                      { realitesDataArray.map( (item, index) => {
                        return (
                          <button 
                            title={`voir l'histoire de ${item.nom}`}
                            data-glide-dir={`=${index}`} 
                            key={`point-${index}`}
                            aria-label={`Aller à la fiche ${index + 1}`}
                            onClick={ () => glideControlClickHandler(index)}
                          >
                            <div className='glide__bullet' ></div>
                            {item.nom}
                          </button>
                        )
                      })}
                    </div>
                    <div data-glide-el="controls[nav]">
                      <button 
                        className='arrow' 
                        data-glide-dir=">"
                        onClick={ () => glideControlClickHandler( activeRealite + 1)}
                      >
                      › 
                      </button>
                    </div>
                  </BulletsControls>
                : ''}
                
              </div>
              
            </SectionRealites>  
          </div>
        : <h4>... chargement</h4> }
        
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
      
      </PageLayout>
    </div>
  )
}

export default ConnaitrePage

export const Head = () => (
  <>
    <title>Connaître l’essentiel | Solutions justes</title>
    <meta name='title' content='Connaître l’essentiel | Solutions justes' />
    <meta name='description' content='Connaître l’essentiel de certains statuts d’immigration précaires et de l’absence de statut. Récits, mythes et réalités. Bonjour, je suis Maria et je suis une personne sans statut d’immigration.' />
    
    <meta property='og:title' content='Connaître l’essentiel | Solutions justes' />
    <meta property='og:description' content='Connaître l’essentiel de certains statuts d’immigration précaires et de l’absence de statut. Récits, mythes et réalités. Bonjour, je suis Maria et je suis une personne sans statut d’immigration.' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-mcm-og.jpg' />
    <meta property='og:image:alt' content='Je rêvais d’une meilleure vie au Québec. Je rêve maintenant de ne plus vivre dans l’angoisse de devoir quitter. - Personne en attente de sa résidence permanente depuis 7 ans. Informez-vous sur les réalités migratoires au Québec. Solutions Justes, MCM' />
    <meta property='og:url' content='https://rever.solutionsjustes.org/connaitre' />
    <meta property='og:type' content='website' />
    
    <link rel='stylesheet' href='/glide.core.min.css' />
    <link rel='stylesheet' href='/glide.theme.min.css' />
  </>
);
