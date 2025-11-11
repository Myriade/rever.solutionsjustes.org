import React, {useState, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Chapitre from './enracineeChapitre'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Banniere = styled.section`
	background: white;
	width: 100%;
	height: 20vh;
	padding: initial !important;
	display: grid;
	
	.temp {
		padding: 5vh}
	
	${media.desktopUp``};
`;

const Video = styled.div`
	width: 80%;
	display: flex;
	background: lightgrey;
	margin-bottom: 10vh;
	position: relative;
		
	iframe {
		width: 100%;}
		
	.set-height {
		width: 0;
		padding-top: 56.25%;}
		
	${media.desktopUp`
		width: 60%;
		margin-inline: 10% 30%;
	`};
`;

const Chapitres = styled.section`
	${media.desktopUp`
		padding-top: 0 !important;
		.chapitre--modelB {
			margin-inline: 0 !important;}
		.chapitre--modelA {
			margin-inline: auto 0 !important;}
			
		#chapitre6 {
			margin-inline: auto !important;
			margin-top: 7rem;
		}
	`}
`;

const ScrollCtnr = styled.section`
	.vecteurs {
		opacity: 0;
		position: absolute;
		width: 100%;
		inset: 20vh 0;
		margin: auto;
		padding-top: 0 !important;
		display: flex;
		justify-content: space-between;
		align-items: stretch;}
	
	.large-only {
		display: none;}
		
	.vecteur--gauche {
		path {
			stroke: #00a99d;
			stroke-width: 400px;}}
		
	.vecteur--droite {
		z-index: 40;
		path {
			stroke: #0071bc;
			stroke-width: 175px;}}
	
	svg {
		position: absolute;
		inset: 0 0;}
	
	path {
		fill: none;
		stroke: #0071bc;
		stroke-miterlimit: 10;}
		
	${media.desktopUp`
		.small-only {
			display: none;}
			
		.large-only {
			display: flex;
			margin-inline: unset !important;
			width: 35%;
			position: relative;}
	`}
`

const localisedText = {
	fr: {
	},
	en: {
	}
}

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const PEnracinee = ({lang, texts}) => {
	const [data, setData] = useState(true)
	const [shareTooltipOn, setShareTooltipOn] = useState(false)
	const [isScrollReady, setIsScrollReady] = useState(false)
	const vecteursScopeRef = useRef()
	const contentRef = useRef()
	
	// GSAP Setup de depart
	useGSAP(() => {
		gsap.set("path", {drawSVG: "1%"});
		gsap.to(".vecteurs", {
			opacity: 1,
			duration: 2
		});
	},{ scope: vecteursScopeRef });
	
	// Animation vecteurs au scroll
	useGSAP(() => {
		if (isScrollReady) {
			gsap.to(".vecteur--gauche path", {
				drawSVG: "100%", 
				ease: "none", 
				scrollTrigger: {
					id: 'vecteur-gauche-large',
					trigger: ".vecteurs",
					start: "top 30%", 
					end: "bottom 75%",
					scrub: 1,
				}
			});
			
			gsap.to(".vecteur--droite path", {
				drawSVG: "100%", 
				ease: "none", 
				scrollTrigger: {
					id: 'vecteur-droite-large',
					trigger: ".vecteurs", 
					start: "top 30%", 
					end: "bottom 75%", 
					scrub: 1, 
					markers: false
				}
			});
		}
	}, { scope: vecteursScopeRef, dependencies: [isScrollReady], })
	
	return (
		<>
			<Banniere>
				<div className='temp'>
					<h1>Bannière</h1>
					<p>[ .... À venir: image, titre et bouton «sortie rapide» .... ]</p>
				</div>
			</Banniere>
			
			<ScrollCtnr ref={vecteursScopeRef}>
				<div className='vecteurs'>
					<div className='large-only vecteur--gauche'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570.59 9300.81" preserveAspectRatio="none" width="100%" height="100%">
							<path className="cls-1" d="M197.85,29.26c179.95,1216.81-14.61,1499.98,34.78,2537.16,69.13,1451.7,133.94,1871.87,20.74,2751.32-179.73,1396.4,380.21,2260.51-48.39,3933.42"/>
						</svg>
					</div>
					<div className='large-only vecteur--droite'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 584.6 9280.71" preserveAspectRatio="none" width="100%" height="100%">
							<path className="cls-1" d="M207.83,30.11C-112.7,904.65,639.69,588.22,469.54,1889.05c-59,451.03-404.23,543.96-376.33,1032.4,30.48,533.56,444.29,968.24,399.53,1477.37-31,352.64-389.86,637.85-404.82,1200.04-12.47,468.67,251.77,821.61,367.03,1346.04,89.22,405.97,32.57,787.04-130.37,1145.11-164.25,360.95-85.1,768.53,148.8,1144.47"/>
						</svg>
					</div>
					<div className='small-only vecteur--gauche'>
						
					</div>
					<div className='small-only vecteur--droite'>
						
					</div>
				</div>
			
				<Chapitres id='chapitres' ref={contentRef}>
					<div style={{marginInline: '0', maxWidth: 'unset'}}>
						<Video>
							<div className='set-height'></div>
							<p><i>[Vidéo]</i></p>
							{/*<iframe 
								id="ytplayer" 
								type="text/html" 
								width="720"
								src="https://www.youtube.com/embed/yL-fwv2Z3rE"
								frameBorder="0" 
								allowFullScreen 
								rel="0" 
							/>*/}
						</Video>
						
						<Chapitre
							id='chapitre1'
							lang={lang}
							imgFile='temp-1'
							texts={texts.bloc1}
							model='right'
						/>
							
						<Chapitre
							id='chapitre2'
							lang={lang}
							imgFile='temp-2'
							texts={texts.bloc2}
							model='left'
						/>
						
						<Chapitre
							id='chapitre3'
							lang={lang}
							imgFile='temp-3'
							texts={texts.bloc3}
							model='right'
						/>
						
						<Chapitre
							id='chapitre4'
							lang={lang}
							imgFile='temp-4'
							texts={texts.bloc4}
							model='left'
						/>
						
						<Chapitre
							id='chapitre5'
							lang={lang}
							imgFile='temp-5'
							texts={texts.bloc5}
							model='right'
						/>
						
						<Chapitre
							id='chapitre6'
							lang={lang}
							imgFile='temp-6'
							texts={texts.bloc6}
							model='left'
							onPinSet={() => setIsScrollReady(true)} 
						/>
					</div>
				</Chapitres>
			</ScrollCtnr>
			
			<Banniere>
				<div className='temp'>
					<hr/>
					<p><i>[ .... Lien vers Rapport et Appels à l'action : à venir .... ]</i></p>
				</div>
			</Banniere>
		
		</>
	)
}

export default PEnracinee
