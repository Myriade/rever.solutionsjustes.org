import React, { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'

const Styled = styled.section`
	background: white;
	
	${media.mediumUp`
		
	`}
	
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function PAnimation() {
	
	const gsapScopeRef = useRef();
	
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	const onClickEvent = contextSafe(() => {
		gsap.to('.box', { x: 180 });
	});
	
	return (
		<div ref={gsapScopeRef} id='gsap-container'>
			<Styled>
				<h2>Page juste pour tester une animation vectorielle</h2>
				<h3>Défiler vers le bas 👇 👇</h3>
			<button onClick={onClickEvent}>Click-moi</button>
				<p className='box'>Ça va bouger</p>
			</Styled>
		</div>
	);
}