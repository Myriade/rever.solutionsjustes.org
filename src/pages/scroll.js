import React, { useEffect, useRef, useState } from 'react'
import PageLayout from '../layouts/pageLayout'
import styled from 'styled-components'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Test = styled.div`
  display: flex;
  gap: 5vw;
  align-items: center;
  width: 100%;
  padding: 4vh;
  background-color: #eaeaea;
  overflow: hidden;
  
  .timeline__item {
    width: 30vh;
    height: 30vh;
    display: grid;
    > * {
      background-color: pink;
      color: navy;
      padding: 1rem;}
`;

const PageScroll = () => {
  const [isHovered, setIsHovered] = useState(null);
  const [isScrollReady, setIsScrollReady] = useState(null);
  const gsapContainer = useRef(null);
  const scrollRef = useRef(null);
  
  // Test 1 - Tween
  function hoverHandler() { setIsHovered(true) }
  function notHoverHandler() { setIsHovered(false) }
  useGSAP(() => {
    if (isHovered) {
      gsap.to('h2', { rotation: 180, duration: 1 });
    } else if (!isHovered) {
      gsap.to('h2', { rotation: 355, duration: 1 });
    }
  }, { dependencies: [isHovered], scope: gsapContainer});
  
  // Test 2 ScrollTrigger
  
  /////// TODO : extraire le code JS dans un fichier static pour le loader en dehors de React
  
  function mouseMoveHandler() { 
    setIsScrollReady(true);
  }
  useGSAP(() => {
    if (isScrollReady) {
      console.log('isScrollReady = ', isScrollReady);
      const target = scrollRef.current.childNodes[0];
      gsap.registerPlugin(ScrollTrigger);
      
      // gsap.to('.timeline', {
      //     scrollTrigger: '.timeline', // start animation when ".box" enters the viewport
      //     x: 500
      // });
      
      // Pin the timeline element
      gsap.to('.timeline', {
        scrollTrigger: {
          trigger: '.timeline',
          pin: true,
          start: 'top top',
          end: () => '+=' + (target.offsetHeight),
          scrub: true,
          markers: true,
        },
        duration: 1,
      });
    }
  }, { dependencies: [isScrollReady], scope: scrollRef});
  

  return (
    
    <PageLayout>
      <section>
        <h1>Tests de scroll</h1>
        <p>Avec GSAP ScrollTrigger </p>
      </section>
      
      <section>
        <div 
          ref={gsapContainer} 
          onMouseEnter={hoverHandler} 
          onMouseLeave={notHoverHandler}
          style={{height: '25vh', textAlign: 'center'}}
        >
          <h2>MW</h2>
        </div>
      </section>
        
      <section>
        <div>
          <ul style={{display: 'grid', gap: '8vh'}}>
            <li>Many  </li>
            <li>Words</li>
            <li>Displayed</li>
            <li>In</li>
            <li>An</li>
            <li>Unorded</li>
            <li>List</li>
          </ul>
        </div>
      </section>
      
      <section 
        ref={scrollRef} 
        onMouseMove={mouseMoveHandler}
      >
        <Test className="timeline">
          <div className="timeline__item" >
            <p>timeline__item 1</p>
          </div>
          <div className="timeline__item">
            <p>timeline__item 2</p>
          </div>
        </Test>
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
      
    </PageLayout>
  )
}

export default PageScroll

export const Head = () => <title>Tests de Scroll</title>
