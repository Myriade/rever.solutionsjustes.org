import React, { useRef, useState } from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const LigneTemps = styled.div`
  background-color: lavender;
  height: 100%;
  display: flex;
  flex-wrap: nowrap;
  .timeline__item {
    min-width: 80vw;
    height: 6em;
    display: grid;
    background : pink;
    border: 1px solid var(--color-bleu-tres-fonce);
    color: var(--color-bleu-tres-fonce);
    padding: 1rem;
    margin: 1rem;}
`;

const PageScroll = () => {
  const [isScrollReady, setIsScrollReady] = useState(null);
  const scrollRef = useRef(null);
  
  function firstHoverTouchHandler() { setIsScrollReady(true) }
  
  useGSAP(() => {
    if (isScrollReady) {
      
      gsap.to('h2', { rotation: 355, duration: 1 });
      const timelineContainer = scrollRef.current.querySelector('.timeline');
      
      gsap.registerPlugin(ScrollTrigger);
      let sections = gsap.utils.toArray(timelineContainer.querySelectorAll('.timeline__item'));
      
      gsap.to(sections, {
        xPercent: -100 * (sections.length - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: timelineContainer,
          start: 'center 50%',
          end: () => '+=' + timelineContainer.offsetWidth,
          pin: scrollRef.current.querySelector('.pin-container'),
          pinSapincing: false,
          scrub: true,
          snap: 1 / (sections.length - 1),
          toggleClasse: 'is-active',
          markers: true,
        }
      });
      
    }
  }, { dependencies: [isScrollReady], scope: scrollRef});

  return (
    
    <PageLayout>
      <div
        ref={scrollRef} 
        onMouseEnter={firstHoverTouchHandler} 
        onTouchStart={firstHoverTouchHandler} >
        <section>
          <h1>Tests de scroll</h1>
          <p>Avec GSAP ScrollTrigger </p>
        </section>
        
        <section>
          <div style={{height: '25vh', textAlign: 'center'}} >
            <h2>MW</h2>
          </div>
        </section>
        
        <section className='pin-container'>
          <ul style={{display: 'grid', gap: '4vh'}}>
            <li>A</li>
            <li>few</li>
            <li>content</li>
            <li>displayed</li>
            <li>here</li>
          </ul>
          <div style={{overflowX: 'hidden'}} >
            <LigneTemps className="timeline">
              <div className="timeline__item" >
                <p>timeline__item 1</p>
              </div>
              <div className="timeline__item" >
                <p>timeline__item 2</p>
              </div>
              <div className="timeline__item" >
                <p>timeline__item 3</p>
              </div>
            </LigneTemps>
          </div>
          <ul style={{display: 'grid', gap: '4vh'}}>
            <li>More</li>
            <li>content</li>
            <li>displayed</li>
            <li>here</li>
          </ul>
        </section>
        
        <section>        
          <div  style={{paddingInline: '30vw', lineHeight: '2rem'}}>
            Lorem ipsum odor amet, consectetuer adipiscing elit. Vivamus pellentesque feugiat ligula habitasse lacus inceptos. Morbi suscipit sodales nostra etiam arcu maximus ex mollis nunc. Vitae accumsan congue quam taciti cras curabitur. Arcu quis dictum suspendisse erat netus curabitur. Commodo ornare morbi efficitur pharetra senectus placerat ex. Sollicitudin augue suscipit ut semper, per non nunc nam.
            
            Tellus amet finibus natoque, velit hendrerit eu parturient porta torquent. Viverra mauris magna, dictumst vehicula lacinia enim ut. Enim habitasse habitasse efficitur nulla taciti luctus ex hac. Vitae mauris magna litora vel vivamus tristique. Scelerisque nam eros imperdiet gravida; erat aptent mollis leo eget. Suspendisse non ligula mollis pharetra velit. Hendrerit in laoreet ridiculus facilisi suscipit inceptos dapibus tempor.
            
            Interdum per tincidunt leo ad malesuada? Netus dignissim luctus finibus; semper quisque aliquet diam. Montes quisque habitant vulputate semper vitae venenatis. Enim mi metus lacus risus pretium vitae integer. Fermentum ac potenti phasellus turpis nam tempor. Sem eget vestibulum scelerisque integer curabitur neque congue adipiscing. Nullam nunc accumsan curae libero blandit, netus curae. Nostra tellus tempor posuere magnis inceptos aliquam turpis lacinia.
            
            Nisi inceptos senectus nisi sollicitudin eleifend mollis augue. Magna tristique phasellus convallis nam aptent tortor. Nisl sem aptent commodo leo dictumst blandit hac. Eleifend volutpat quisque; tristique facilisis pulvinar senectus est. Ipsum rutrum metus enim ornare sed dictum sagittis diam potenti. Justo pellentesque rhoncus blandit venenatis pulvinar. Ultrices erat ultrices porta ex arcu finibus torquent etiam.
            
            Blandit aliquam sollicitudin curae magna felis velit sagittis orci. Nascetur aenean convallis venenatis; fusce torquent curabitur accumsan sagittis mattis. Finibus pellentesque cursus tempor rutrum vivamus. Adipiscing adipiscing metus lorem potenti pharetra amet vivamus laoreet libero. Arcu facilisi mus cras sollicitudin eget. Fringilla feugiat torquent mollis rutrum tempor aliquet quis elit. Eget donec semper ullamcorper lacus platea.
          </div>
        </section>
      </div>      
    </PageLayout>
  )
}

export default PageScroll

export const Head = () => <title>Tests de Scroll</title>
