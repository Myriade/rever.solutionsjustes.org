import React, { useState, useEffect, useRef } from 'react'
import { StaticImage } from "gatsby-plugin-image"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import { useGSAP } from '@gsap/react'

import LiereTest from '../images/enraciner/LiereTest.js'

const Styled = styled.section`
	background: white;
	
	section {
		width: 100%;}
	
	path {
		stroke-dashoffset: 5%}
		
	.buttons {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;}
	
	${media.mediumUp`
		section {
			width: 500px;
			height: 500px;}
	`}
	
`;

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

export default function PAnimation() {
	
	// GSAP Setup de depart
	const gsapScopeRef = useRef();
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	useGSAP(() => {
		gsap.set("#click path", {drawSVG: "1%"});
		gsap.set("#scroll path", {drawSVG: "0%"});
		gsap.set("#scroll2 path:not(.plan1)", {drawSVG: "0%"});
		gsap.set("#scroll2 .plan1", {drawSVG: "2%"});
	},{ scope: gsapScopeRef }); 
	
	// Au click sur bouton
	const onClickEvent = contextSafe((pathName) => {
		if (pathName === 'epines') {
			gsap.to('#click .epine path', {
				duration: 3,
				drawSVG: "100%"}
			);
		} else if (pathName === 'reset') {
			gsap.set("#click path", {
				drawSVG: "1%"
			});
		} else {
			gsap.to(`#click #${pathName} path`, {
				duration: 3,
				drawSVG: "100%"}
			);
		}
	});
	
	// au scroll, même rythme
	useGSAP(() => {
		gsap.to("#scroll path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll", // Use body as trigger
				start: "top 60%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		})
	},{ scope: gsapScopeRef }); 
	
	// au scroll, rythmes différents
	useGSAP(() => {
		console.log('scroll2')
		gsap.to("#scroll2 .plan1 path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll2", // Use body as trigger
				start: "top 60%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		});
		
		gsap.to("#scroll2 .plan2 path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll2", // Use body as trigger
				start: "top 50%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		});
		
		gsap.to("#scroll2 .plan3 path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll2", // Use body as trigger
				start: "top 40%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		});
		
		gsap.to("#scroll2 .plan4 path", {
			drawSVG: "100%", // End with path fully drawn
			ease: "none", // Linear progression with scroll
			scrollTrigger: {
				trigger: "#scroll2", // Use body as trigger
				start: "top 30%", // Start when top of body hits top of viewport
				end: "bottom 75%", // End when bottom of body hits bottom of viewport
				scrub: 1, // Smooth scrubbing, takes 1 second to "catch up"
				markers: false
			}
		});
	},{ scope: gsapScopeRef }); 
	
	return (
		<div ref={gsapScopeRef} id='gsap-container'>
			<Styled>
				<h2>Tests d'animations vectorielles interactives</h2>
				
				<hr/>
				<h3>Déployer les lignes une à la fois</h3>
				<p>Cliquez les boutons pour voir chacune des lignes se déployer en 3 secondes</p>
				
				<div className='buttons'>
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
				
				<section id='click' >
					<LiereTest />
				</section>
				
				<hr/>
				<h3>Déployer toutes les lignes au scroll, même rythme</h3>
				<p>Défiler <b>tranquilement</b> vers le bas 👇 👇  Départ et fin synchronisés</p>
				
				<section id="scroll">
					<LiereTest />
				</section>
				
				<hr/>
				<h3>Déployer toutes les lignes au scroll, rythmes différents</h3>
				<p>Défiler <b>tranquilement</b> vers le bas 👇 👇  Départs à intervalle, puis fin synchronisée</p>
				<section style={{marginBottom: '30vh'}} id="scroll2">
					<LiereTest />
				</section>
				
			</Styled>
		</div>
	);
}