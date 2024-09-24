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
      padding: 0 3vw 0 0;
      margin-top: 0;
      display: grid;
      gap: var(--v-spacer);
    }
    li.realite-nav-item {
      background: var(--color-bleu-clair);
      color: white;
      border: 2px solid white;
      border-radius: 17px;
      padding: 0.5em 1em;
      line-height: 1.1;
      height: 5em;
      display: grid;
      align-items: center;
      a {
        display: block;
        &:hover {
          cursor: pointer;}}
      &:hover, &.active {
        background: var(--color-bleu-gris);
        
      }
    }
  }
  
  .realites-container {}
  
  .realite-unique {
    height: calc(100vh - var(--header-height) - var(--v-spacer));
    overflow: hidden;
    background: white;
    border-radius: var(--border-radius);
    padding: var(--v-h-spacer);
    margin-bottom: var(--v-spacer);
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: var(--h-spacer);
    
    .personna {
      h2 {
        font-size: 1.5rem;
        font-weight: 400;
        text-transform: none;
        span {
          font-weight: 800;}}}
    
    .narratif {
      p {
        margin-block: 0 1em;}
        
      .presentation {
        overflow: hidden;}
      
      .impacts {
        height: calc(100vh - var(--header-height) - var(--v-spacer));
        position: relative;}
        
      .impact {
        background: var(--color-bleu-tres-pale);
        color: white;
        border-radius: 4px;
        margin-bottom: 2vh;
        opacity: 0;
        position: absolute;
        top: 30%;
        left: 0;
        
        &:first-child {
          color: var(--bleu-tres-fonce);}
        &:nth-child(2n) {
          background: var(--color-bleu-clair);}
        &:nth-child(3n) {
          background: var(--color-bleu-aqua);}
        &:nth-child(4n) {
          background: var(--color-bleu-gris);}
        &:nth-child(5n) {
          background: var(--color-bleu-tres-fonce);}
        p {
          padding: 0.75em 1em;
          margin-bottom: 0;
        }
      }
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
      duration: 1, 
      scrollTo: {
        y: `#${clickedId}`,
        offsetY: 120
      }
    });
    setActiveRealite(clickedIndex);
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
    // todo : mettre l'array de timelines dans une state? pour pouvoir les remettre a un point au debut de leur timeline au changement.
    const timelines = realitesGsapArr.forEach((element, realiteIndex) => {
      
      // create a timeline
      let timeline = gsap.timeline();
      
      // add animations to the timeline
      timeline.from( element.querySelectorAll('.narratif .presentation'), {
        opacity: 0,
        duration: 1.5,
        stagger: 2
      });
      
      timeline.to( element.querySelector('.presentation'), {
        opacity: 0,
        height: 0,
        duration: 1
      });
      
      timeline.to( element.querySelectorAll('.narratif .impact'), {
        y: 'random(-150, 150, 5)',
        x: 'random(-250, 50, 5)',
        opacity: 1,
        duration: 1.5,
        stagger: 1,
        ease: 'back.out(4)'
      });
      
      ScrollTrigger.create({
        trigger: element,
        start: 'top 120px',
        end: 'bottom 10%',
        scrub: true,
        pin: element,
        animation: timeline,
        onEnter: ({ progress }) => {
          setActiveRealite(realiteIndex);
        },
        onEnterBack: () => {
          setActiveRealite(realiteIndex);
        },
        onLeave: ({ progress }) => {
          setActiveRealite(realiteIndex + 1);
        },
        onLeaveBack: (self) => {
          //console.log('onLeaveBack self = ', self);
          setActiveRealite(realiteIndex - 1);
        },
        //markers: true,
      });
    });
    
  }, { dependencies: [screenType], scope: gsapContainerRef } );
  
  return (
    <PageLayout>
      <Section1Hero 
        onMouseEnter={firstHoverTouchHandler} 
        onTouchStart={firstHoverTouchHandler}
      >
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
                    {realite.titreCourt}
                  </a>
                </li>
              )})}
            </ul>
          </nav>
          
          <div className='realites-container'>
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
                  {realitesDataArray[index].impacts.map( (paragraphe, pIndex) => { 
                    return (
                      <div key={pIndex} className='impact'>
                        <p>{paragraphe}</p>
                      </div>
                  )})}
                  </div>
                </div>
              </div>
            )})}
          </div>
          
        </SectionRealites>  
      </div>
      
    </PageLayout>
  )
}

export default ConnaitrePage

export const Head = () => <title>Pour connaître l'essentiel | Solutions justes</title>
