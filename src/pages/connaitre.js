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

const Section1Hero = styled.section`
  background-color: var(--color-bleu-tres-pale);
  background-image: url(/grand-portrait.webp);
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

const Section2Intro = styled.section`
  .grid {
    gap: var(--v-h2-spacer);}
    
  h2, p {
    margin-block: 0;}
    
  h2 {
    font-size: clamp(24px, 2vw, 2rem);
    max-width: 21ch;
    font-weight: 500;
    line-height: 1.25;
    text-transform: initial;}
    
  ${media.mediumUp`
    .grid {
      grid-template-columns: 1fr 1fr;}
    
    h2 {
      max-width: initial;}
  `};
  
  .button {
    margin-top: var(--v-spacer);}
`;

const SectionRealites = styled.section`
  display: grid;
  grid-template-columns: 10% 90%;
  background: var(--color-bleu-tres-pale);

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
    padding: var(--v-spacer) var(--h-spacer) calc(var(--v-spacer) / 3);
    margin-bottom: var(--v-spacer);
    display: grid;
    grid-template-columns: 1fr 2fr;
    grid-template-rows: 1fr auto;
    gap: var(--h-spacer);
    
    .personna {
      h2 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: none;
        span {
          font-weight: 800;}}}
    
    .narratif {
      position: relative;
      p {
        margin-block: 0 1em;}
        
      .presentation {
        background: white;
        overflow: hidden;}
      
      .impacts {
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
        opacity: 0;
        
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
    
    .progress-bar {
      grid-area: 2 / 1 / 3 / 3;
      height: 0.8rem;
      background-color: var(--color-bleu-tres-pale);
      border-radius: 0.4rem;
      margin-top: calc(var(--h-spacer) / 2);
    }
  }
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin);

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
        //realiteScrollGsapAnimation();
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
        start: 'top 50%'
      }
    });
    
    // nav bar pins 
    gsap.to('#realites-nav', {
      scrollTrigger: {
        trigger: '#realites-nav',
        pin: true,
        start: 'top 120px',
        end: '200% bottom',
        //markers: true,
      }
    });
    
    // REALITE UNIQUE
    // La première realité apparaît doucement
    gsap.from( '#realites-container', {
      autoAlpha: 0,
      duration: 1.5,
      scrollTrigger: {
        id: 'firstRealiteReveal',
        trigger: '#realites-nav',
        start: 'top 50%'
      }
    });
    
    realitesGsapArr.forEach((element, realiteIndex) => {
      
      // ProgressBar timeline
      let ProgressBarTimeline = gsap.timeline();
      
      ProgressBarTimeline.from( element.querySelector('.progress-bar'), {
        width: 0,
        ease: 'none'
      });
      
      // Content timeline
      let contentTimeline = gsap.timeline();
      
      // Présentation, paragraphes un à un
      contentTimeline.from( element.querySelectorAll('.narratif .presentation'), {
        autoAlpha: 0,
        stagger: 0.5
      });
      
      // Présentation disparait
      contentTimeline.to( element.querySelector('.presentation'), {
        autoAlpha: 0,
        yPercent: -50,
      });
      
      // Impacts intro apparaît
      contentTimeline.from( element.querySelector('.impacts__intro'), {
        yPercent: '200',
        autoAlpha: 0,
      });      
      
      // Les impacts apparaissent, placés en désordre
      contentTimeline.to( element.querySelectorAll('.narratif .impact'), {
        y: 'random(-20, 20, 5)',
        xPercent: 'random(-50, 50, 5)',
        transformOrigin: 'center center',
        autoAlpha: 1,
        stagger: 1,
        ease: 'back.out(4)'
      });
      
      // Impacts message de fin apparaît
      contentTimeline.from( element.querySelector('.impacts__fin'), {
        yPercent: '200',
        autoAlpha: 0,
      });    
      
      ScrollTrigger.create({
        id: `realiteContent-index-${realiteIndex}`,
        trigger: element,
        animation: contentTimeline,
        start: 'top 120px',
        end: 'bottom 10%',
        scrub: 1.5,
        pin: element,
        toggleClass: 'active',
        fastScrollEnd: true,
        onEnter: (self) => {
          setActiveRealite(realiteIndex);
        },
        onEnterBack: (self) => {
          setActiveRealite(realiteIndex);
          self.scroll(self.start);
        }
        //markers: true,
      });
      
      ScrollTrigger.create({
        id: `realiteProgressBar-index-${realiteIndex}`,
        trigger: element,
        animation: ProgressBarTimeline,
        start: 'top 120px',
        end: 'bottom 10%',
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
              <span>Connaître</span> 
              <span className='right'>...</span> 
              <span>l'essentiel</span>
            </h1>
          </div>
        </Section1Hero>
        
        <Section2Intro>
          <h2>... de certains statuts d'immigration précaires et de l'absence de statut</h2>
        </Section2Intro>
          
        <div ref={gsapContainerRef} id='gsap-container'>
          <SectionRealites>
            <nav id='realites-nav'>
              <p className='intro'>Les récits et les mythes&nbsp;:</p>
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
              </ul>
            </nav>
            
            <div id='realites-container'>
              {realitesDataArray.map( (realite, index) => { return (
                <div
                  className='realite-unique' 
                  id={realite.idUnique} 
                  key={index}
                > 
                  <div className='personna'>
                    <h2>
                      {realite.intro} <span>{realite.statut}</span>.
                    </h2>
                  </div>
                  <div className='narratif'>
                    <div className='presentation'>
                      {realitesDataArray[index].presentation.map( (paragraphe, pIndex) => { 
                        return (
                        <p key={pIndex} className='presentation'>{paragraphe}</p>
                      )})}
                    </div>
                    <div className='impacts'>
                      <p className='impacts__intro'>{realite.impactIntro}</p>
                      {realitesDataArray[index].impacts.map( (paragraphe, pIndex) => { 
                        return (
                          <div key={pIndex} className='impact'>
                            <p>{paragraphe}</p>
                          </div>
                      )})}
                      <p className='impacts__fin'>Ce ne sont que quelques exemples parmi de nombreuses autres situations.</p>
                    </div>
                  </div>
                  <div className='progress-bar'></div>
                </div>
              )})}
            </div>
            
          </SectionRealites>  
        </div>
        
      </PageLayout>
    </div>
  )
}

export default ConnaitrePage

export const Head = () => <title>Pour connaître l'essentiel | Solutions justes</title>
