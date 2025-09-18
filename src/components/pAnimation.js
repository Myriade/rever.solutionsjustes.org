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
	
	path {
		stroke-dashoffset: 5%
	}
	
	${media.mediumUp`
		
	`}
	
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export default function PAnimation() {
	
	const gsapScopeRef = useRef();
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	useGSAP(() => {
		gsap.set("path", {
			drawSVG: "0%"
		});
	},{ scope: gsapScopeRef }); 
	
	const onClickEvent = contextSafe((pathName) => {
		if (pathName === 'epines') {
			gsap.to('#click .epine path', {
				duration: 3,
				drawSVG: "100%"}
			);
		} else if (pathName === 'reset') {
			gsap.set("#click path", {
				drawSVG: "0%"
			});
		} else {
			gsap.to(`#click #${pathName} path`, {
				duration: 3,
				drawSVG: "100%"}
			);
		}
	});
	
	useGSAP(() => {
		gsap.to("#scroll path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll", // Use body as trigger
				start: "top 80%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		})
	},{ scope: gsapScopeRef }); 
	
	return (
		<div ref={gsapScopeRef} id='gsap-container'>
			<Styled>
				<h2>Tests d'animations vectorielles interactives</h2>
				
				<hr/>
				<h3>Déployer les lignes une à la fois</h3>
				<p>Cliquez les boutons pour voir chacune des lignes se déployer en 3 secondes</p>
				
				<div style={{display: 'flex', gap: '1rem'}}>
					<button onClick={() => onClickEvent('base_x5F_1')}>base_x5F_1</button> 
					<button onClick={() => onClickEvent('base_x5F_2')}>base_x5F_2</button> 
					<button onClick={() => onClickEvent('base_x5F_3')}>base_x5F_3</button> 
					<button onClick={() => onClickEvent('ombre_x5F_2')}>ombre_x5F_2</button> 
					<button onClick={() => onClickEvent('ombre_x5F_3')}>ombre_x5F_3</button> 
					<button onClick={() => onClickEvent('ombre_x5F_1_x5F_partie_x5F_1')}>ombre_x5F_1_x5F_partie_x5F_1</button>
					<button onClick={() => onClickEvent('ombre_x5F_1_x5F_partie_x5F_2')}>ombre_x5F_1_x5F_partie_x5F_2</button>
					<button onClick={() => onClickEvent('epines')}>Épines</button>
					<button onClick={() => onClickEvent('reset')}>Réinitialiser</button>
				</div>
				
				<section style={{width: '500px', height: '500px'}} id='click' >
					<LiereTest />
				</section>
				
				<hr/>
				<h3>Déployer toutes les lignes au scroll, même rythme</h3>
				<p>Défiler vers le bas 👇 👇</p>
				
				<section style={{width: '500px', height: '500px'}} id="scroll">
					<LiereTest />
				</section>
				
				<hr/>
				<h3>Déployer toutes les lignes au scroll, rythmes différents</h3>
				<p style={{minHeight: '30vh'}}>[À venir]</p>
				
			</Styled>
		</div>
	);
}