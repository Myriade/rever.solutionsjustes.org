import React, { useState, useEffect, useRef } from 'react'
import { StaticImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

import LiereTest from '../images/enracinee/LiereTest.js'

const Styled = styled.section`
	background: white;
	
	${media.mediumUp`
		
	`}
	
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export default function PAnimation() {
	
	const gsapScopeRef = useRef();
	
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	const onClickEvent = contextSafe(() => {
		gsap.from("path", {
			duration:3,
			drawSVG: 0}
		);
	});
	
	
	return (
		<div ref={gsapScopeRef} id='gsap-container'>
			<Styled>
				<h2>Page juste pour tester une animation vectorielle</h2>
				<h3>Défiler vers le bas 👇 👇</h3>
				<hr/>
				<button onClick={onClickEvent}>Click-moi</button>
				<p className='box'>Ça va bouger</p>
				<hr/>
				
				<section
					style={{width: '500px', height: '500px'}}
				>
					<LiereTest />
				</section>
				
			</Styled>
		</div>
	);
}