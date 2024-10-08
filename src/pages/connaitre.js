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
    font-size: calc( (40vh - var(--header-height) - 10vh) / 3.5 );
    color: white;
    line-height: 1em;
    text-transform: uppercase;
    margin: 0 var(--h-spacer);
    display: grid;
    align-items: center;
    position: relative;
    text-align: center;
    span.small {
      text-transform: none;
      font-size: 1rem;
      line-height: 1;
      position: absolute;
      bottom: 0.5rem;
    }}
  
  ${media.mediumUp`
    .bg-image {
      height: calc(95vh - var(--header-height));}
    h1 {
      text-align: unset;
      height: calc(95vh - var(--header-height));
      font-size: clamp(25px, 12vw, 22vh); 
      span.right {
        text-align: right;}
      span.small {
        right: 0;
        text-align: center;
        font-size: 1.5rem;
        bottom: 6.5vh;}
    }
  `};
`;

const SectionRealites = styled.section`
  padding: 0.5rem;
  background: var(--color-bleu-tres-pale);
  
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
    padding: calc(var(--v-spacer) / 2) var(--h-spacer);
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
    ul {
      list-style-type: none;
      padding: 0;
      margin-top: 0;
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
      align-items: stretch;}
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
          cursor: pointer;}}
      
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
        display: block;
        > div {
          background-color: white;
          color: var(--color-bleu-tres-fonce);
          font-size: 1.5rem;
          border-radius: 50%;
          display: grid;
          align-items: center;}}}
          
    ${media.largeUp`
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
      margin-bottom: var(--v-spacer);
      display: grid;
      grid-template-rows: 1fr auto;}
  
    ${media.largeUp`
      margin-top: 0;
      .realite-unique {
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
        > * {
          grid-area: 1/1/2/2;
          position: relative;
        }}
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
          width: 10vh;
          height: 10vh;
          margin-bottom: calc(var(--v-spacer) / 4);
          border: 0.75px solid black;
          border-radius: 50%;}
        p {
          margin-block: 0;
        }
      }
    }
        
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
        p {
          max-width: 40ch;
          margin-inline: auto;}}
      
      .impacts {
        display: grid;
        grid-template-rows: auto 1fr auto;
        gap: 1rem;
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
          grid-area: 1 / 1 / 2 / 2;}
        .impact {
          grid-area: 1 / 1 / 2 / 2;
        }
      }
    `}
    
  }
  
  .mythe {
    position: relative;
    display: grid;
    overflow: hidden;
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
      grid-template-columns: 75px auto;
      gap: 1rem;
      margin-bottom: 1rem;
      align-items: center;
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
    max-width: 32ch;
    font-size: 1.2rem;}
    
  p {
    font-size: 1rem;}
  
  .button {
    margin-top: var(--h-spacer);
    padding-inline: 3vw;}
  
  ${media.mediumUp`
    grid-template-columns: 1fr 1fr 1fr;
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
        if (window.matchMedia('(min-width: 1200px)').matches) {
          console.log('Screen is more than 1200px wide. GSAP ok');
          setScreenType('mouse');
          gsapAnimations();
        } else {
          setScreenType('mouse-narrow');
          console.log('Screen is less than 1200px wide. No GSAP');
        }
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
    
    if (screenType === 'mouse') {
      gsap.from( '#realites-container' , {
        autoAlpha: 0,
        duration: 1
      });
      setActiveRealite(clickedIndex);
      // reset scroll progress to its start
      const associateScrollTrigger = ScrollTrigger.getById(`realiteContent-index-${clickedIndex}`);
      associateScrollTrigger.scroll(associateScrollTrigger.start);
    }
  });
  
  const labelClickHandler = contextSafe( (realiteIndex, clickedLabel ) => { 
    if (screenType === 'mouse') {
      gsap.to( window, { 
        scrollTo: timelineRef.current[realiteIndex].scrollTrigger.labelToScroll(clickedLabel),
      });
    }
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
      
      // Impacts intro apparaît
      contentTimeline.from( element.querySelector('.impacts__intro'), {
        yPercent: '100',
        autoAlpha: 0,
      });
      
      // Impacts instruction apparaît en meme temps]
      contentTimeline.from( element.querySelector('.impacts__instruction'), {
        yPercent: '100',
        autoAlpha: 0,
      },'<');
      
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
          allRealitesHeight = self.end;
          ScrollTrigger.refresh();
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
              <span>l’essentiel&nbsp;...</span>
              <span className='small'>... de certains statuts d’immigration précaires et de l’absence de statut</span>
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
                      <div className='avatar'>
                        <img src={`/images/connaitre/${realite.nom}.svg`}/>
                      </div>
                      <div className='nom'>{realite.nom}</div>
                      <strong>{realite.titreCourt}</strong>
                    </a>
                  </li>
                )})}
                <li className='realite-nav-item shortcut'>
                  <a href='#s-impliquer'>
                    <div className='avatar'><div>✓</div></div>
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
                        <img src={`/images/connaitre/${realite.nom}.svg`}/>
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
                        <p className='impacts__intro' dangerouslySetInnerHTML={{ __html: realite.impactIntro }} ></p>
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
            
          </SectionRealites>  
        </div>
        
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
    <meta name='title' property='og:title' content='Connaître l’essentiel | Solutions justes' />
    <meta name='description' content='Connaître l’essentiel de certains statuts d’immigration précaires et de l’absence de statut. Récits, mythes et réalités. Bonjour, je suis Maria et je suis une personne sans statut d’immigration.' />
    <meta property='og:image' content='https://rever.solutionsjustes.org/rever-essentiel-solutions-justes-og.jpg' />
    <meta property='og:image:width' content='919' />
    <meta property='og:image:height' content='400' />
  </>
);
