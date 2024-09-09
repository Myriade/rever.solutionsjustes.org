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
  padding-block: 4vh;
  background-color: #eaeaea;
  overflow: hidden;
  
  .scroll-item {
    width: 30vh;
    height: 30vh;
    display: grid;
    &__inner {
      background-color: pink;
      color: navy;
      padding: 1rem;
      transform: translateX(calc(100vw - var(--progress) * 100vw));}}
`;

const PageScroll = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { gsapContainer } = useRef();
  
  function hoverHandler() {
    setIsHovered(true);
  }
  function notHoverHandler() {
    setIsHovered(false);
  }

  useGSAP(() => {
    if (isHovered) {
      gsap.to('h2', { rotation: 180, duration: 1 });
    } else {
      gsap.to('h2', { rotation: 355, duration: 1 });
    }
  }, { dependencies: [isHovered], scope: gsapContainer});

  return (
    
    <PageLayout>
      <section>
        <h1>Tests de scroll</h1>
        <p>Avec GSAP ScrollTrigger </p>
      </section>
      
      <section>
        <div style={{height: '25vh', textAlign: 'center'}} ref={gsapContainer} onMouseEnter={hoverHandler} onMouseLeave={notHoverHandler}>
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
      
      <section id='horizontal-scroll'>
        <Test 
          className="scroll-content-list"
          data-scroll-section
          >
          <div
            className="scroll-item"
            data-scroll 
            data-scroll-css-progress
          >
            <p className='scroll-item__inner'>scroll-item 1</p>
          </div>
          <div
            className="scroll-item"
            data-scroll 
            data-scroll-css-progress
          >
            <p className='scroll-item__inner'>scroll-item 2</p>
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
