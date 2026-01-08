import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Chapitre from './enracinerChapitre'

import useWixData from '../utils/useWixData'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import LierreOrdiDroit from '../images/enraciner/lierre-ordi-droit.js'
import LierreOrdiGauche from '../images/enraciner/lierre-ordi-gauche.js'
import LierreMobileDroit from '../images/enraciner/lierre-mobile-droit.js'
import LierreMobileGauche from '../images/enraciner/lierre-mobile-gauche.js'

const Banniere = styled.section`
	position: relative;
	z-index: 45;
	background: #eee;
	width: 100%;
	height: 20vh;
	padding: initial !important;
	display: grid;
	
	.temp {
		padding: 5vh}
	
	${media.desktopUp``};
`;

const Video = styled.div`
	display: flex;
	background: lightgrey;
	margin-bottom: 10vh;	
	position: relative;
	z-index: 45;	
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
	> div {
		margin-inline: 0; 
		max-width: unset;}
		
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
	position: relative;
	&::before {
		content: "";
		background: url("/images/enraciner/fond-texture-gris.png") no-repeat;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		background-position: center bottom;
		z-index: -1;}
	
	.vecteurs {
		opacity: 0;
		position: absolute;
		width: 100%;
		top: 5vh;
		right: 0;
		bottom: 20vh;
		left: 0;
		margin: auto;
		padding-top: 0 !important;
		display: flex;
		justify-content: space-between;
		align-items: stretch;
		&:last-child {
			z-index: 40;}}
		
	svg {
		position: absolute;
		inset: 0;}
	
	path {
		fill: none;
		stroke-miterlimit: 10;}
	
	.large-only {
		display: none;}
		
	.small-only {
		position: relative;
		width: 15%;
				
		&.vecteur--droite {
			svg {
				z-index: 20;
				width: 100%;
				top: 0;
				left: 0;}}}
	
	${media.mediumUp`
		&::before {
			background-size: 100% auto;}
	`}
		
	${media.desktopUp`
		.vecteurs {
			top: 20vh;}
			
		.small-only {
			display: none;}
			
		.large-only {
			display: block;
			position: relative;
			
			&.vecteur--gauche {
				width: 35%;}
			&.vecteur--droite {
				width: 35%;
				z-index: 40;}}
		
		button.shortcut {
			position: absolute;
			z-index: 46;
			top: 30rem;
			right: 10rem;
			text-transform: uppercase;
			color: var(--color-pourpre);
			border: 2px solid var(--color-pourpre);
			font-weight: bold;
			width: 19ch;
			text-align: center;
			background: rgba(255, 188, 82, 0.8);
			padding: 1em 2em;
			border-radius: var(--border-radius);
			&:hover {
				cursor: pointer;}}
	`}
`

const localisedText = {
	fr: {
		chargement: 'chargement'
	},
	en: {
		chargement: 'loading'
	}
}

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, DrawSVGPlugin);

const PEnraciner = ({lang}) => {
	const [wixData, setWixData] = useState()
	const [chapitreRendered, setChapitreRendered] = useState();
	//const [shareTooltipOn, setShareTooltipOn] = useState(false)
	
	const vecteursScopeRef = useRef()
	const contentRef = useRef()
	
	/******** Fetch Wix data *********/
	const placeholderData = {
		data: {
			title: localisedText[lang].chargement,
		}
	}
	
	let collection = null;
	let manualSort = null;
	
	if (lang === 'fr') {
		collection = 'Import692'
		manualSort = '_manualSort_609e1759-a61d-4150-b9d9-25754c3777a3'
	}
	
	if (lang === 'en') {
		collection = 'Enracinee-En'
		manualSort = '_manualSort_c53c7168-c1f4-4f95-bf5d-b132894b6c31'
	}
	
	const fetchedData = useWixData(collection, manualSort, placeholderData);
	
	if (!wixData) {
		if (fetchedData && fetchedData.length > 1) {
			setWixData(fetchedData)
		}
	}
	
	// Event Handler
	const { contextSafe } = useGSAP({ scope: vecteursScopeRef });
	const shortcutClickHandler = contextSafe(() => {
		gsap.to( window, { duration: 4, scrollTo: { y: '#recit', offsetY: -700 }});
	});
	
	// GSAP Setup de depart
	useGSAP(() => {
		if (wixData && wixData.length >= 6 && chapitreRendered ) {
			
			// Tous
			gsap.to(".vecteurs", {
				opacity: 1,
				duration: 2
			});
			gsap.set(".vecteurs path", {
				opacity: 0
			});
			
			// ordi gauche	
			gsap.set(".large-only.vecteur--gauche path", {drawSVG: "0%"});
			gsap.set("#lg-1", {drawSVG: "20%", autoAlpha: 1});
			
			gsap.set("#lg-2", {drawSVG: "3%", autoAlpha: 1});
			gsap.set("#lg-3", {drawSVG: "5%", autoAlpha: 1});
			
			gsap.set("#lg-4", {drawSVG: "15%", autoAlpha: 1});
			gsap.set("#lg-5", {drawSVG: "25%", autoAlpha: 1});
			
			// ordi droite
			gsap.set(".large-only.vecteur--droite path", {drawSVG: "0%"});
			gsap.set("#ld-1", {drawSVG: "3%", autoAlpha: 1});
			gsap.set("#ld-2", {drawSVG: "2.8%", autoAlpha: 1});
			
			// Mobile
			gsap.set(".small-only.vecteur--gauche path", {drawSVG: "3%", autoAlpha: 1});
			gsap.set(".small-only.vecteur--droite path", {autoAlpha: 1});
			
		}
	},{ scope: vecteursScopeRef, dependencies: [wixData, chapitreRendered] });
	
	// Animation vecteurs au scroll
	useGSAP(() => {
		if (wixData && wixData.length >= 6 && chapitreRendered) {
			
			const enterTween = { autoAlpha: 1, duration: 0.5, ease: 'none' }
			const leaveBackTween = { autoAlpha: 0, duration: 0.5, ease: 'none' }
			
			// ordi gauche	
			gsap.to("#lg-1", {
				drawSVG: "100%", ease: "none",
				scrollTrigger: { trigger: "#lg-1", start: "top 20%", end: "bottom 35%", scrub: 1}
			});
			
			gsap.to("#lg-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-2", start: "top 20%", end: "bottom 65%", scrub: 1}
			}); 
			gsap.to("#lg-3", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-3", start: "top 20%", end: "bottom 45%", scrub: 1}
			});
			
			gsap.to("#lg-4", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-4", start: "top 10%", end: "bottom 75%", scrub: 1}
			}); 
			gsap.to("#lg-5", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-5", start: "top 10%", end: "bottom 80%", scrub: 1}
			});
			
			gsap.to("#lg-6", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-6", start: "top 30%", end: "top 10%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-7", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-7", start: "top 20%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-8-9", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-8", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-10", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-10", start: "top 20%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-11-12", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-11", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-13", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-13", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-14", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-14", start: "top 20%", end: "bottom 65%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-15-16", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-15", start: "top 20%", end: "bottom 75%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-17", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-17", start: "top 20%", end: "bottom 55%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-18", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-18", start: "top 20%", end: "bottom 55%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-19", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-19", start: "top 75%", end: "top 50%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-20", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-20", start: "top 75%", end: "top 30%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			// ordi droite	
			gsap.to("#ld-1", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-1", start: "top 20%", end: "bottom 65%", scrub: 1, 
				}
			}); 
			
			gsap.to("#ld-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-2", start: "top 30%", end: "bottom 70%", scrub: 1,
				}
			});
			
			gsap.to("#ld-3", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-3", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-4", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-4", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-5", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-5", start: "top 30%", end: "bottom 40%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-6", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-6", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			gsap.to("#ld-7", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-6", start: "top 30%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-8", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-8", start: "top 33%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-9", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-9", start: "top 40%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-10", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-10", start: "top 35%", end: "bottom 80%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-11", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-11", start: "top 35%", end: "bottom 80%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-12", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-12", start: "top 30%", end: "bottom 80%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-13", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-13", start: "top 40%", end: "bottom 70%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			// mobile gauche
			gsap.to(".vecteur--gauche.small-only path", {
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
		}
	}, { scope: vecteursScopeRef, dependencies: [wixData, chapitreRendered], })
	
	return (
		<>
			<Banniere>
				<div className='temp'>
					<h1>Bannière</h1>
					<p>[ .... À venir: image, titre et bouton «sortie rapide» .... ]</p>
				</div>
			</Banniere>
			
			<ScrollCtnr id='recit' ref={vecteursScopeRef}>
			
				<button
					className='shortcut large-only'
					onClick={shortcutClickHandler}
				>
					Lire le récit de Hana ↓
				</button>
			
				<div className='vecteurs'>
					<div className='large-only vecteur--gauche'><LierreOrdiGauche /></div>
					<div className='small-only vecteur--gauche'><LierreMobileGauche /></div>
					<div className='large-only vecteur--droite'><LierreOrdiDroit /></div>
					<div className='small-only vecteur--droite'><LierreMobileDroit /></div>
				</div>
			
				<Chapitres id='chapitres' ref={contentRef}>
					<div>
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
						
						{ wixData && wixData.length >= 6 ? <>
							<Chapitre
								id='chapitre1'
								readMoreId='chapitre2' 
								lang={lang}
								imgFile='chapitre1'
								texts={wixData[0].data}
								model='right' 
								rendered={0}
							/>
								
							<Chapitre
								id='chapitre2'
								readMoreId='chapitre3' 
								lang={lang}
								imgFile='chapitre2'
								texts={wixData[1].data}
								model='left' 
								rendered={1}
							/>
							
							<Chapitre
								id='chapitre3'
								readMoreId='chapitre4' 
								lang={lang}
								imgFile='chapitre3'
								texts={wixData[2].data}
								model='right' 
								rendered={2}
							/>
							
							<Chapitre
								id='chapitre4'
								readMoreId='chapitre5' 
								lang={lang}
								imgFile='chapitre4'
								texts={wixData[3].data}
								model='left' 
								rendered={3}
							/>
							
							<Chapitre
								id='chapitre5'
								readMoreId='chapitre6' 
								lang={lang}
								imgFile='chapitre5'
								texts={wixData[4].data}
								model='right' 
								rendered={4}
							/>
							
							<Chapitre
								id='chapitre6'
								lang={lang}
								imgFile='chapitre6'
								texts={wixData[5].data}
								model='left'
								rendered={5}
								onRenderChange={setChapitreRendered}
							/>
						</> : <p>... {localisedText[lang].chargement}</p>}
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

export default PEnraciner
