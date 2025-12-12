import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Chapitre from './enracineeChapitre'

import useWixData from '../utils/useWixData'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import LierreOrdiDroit from '../images/enracinee/lierre-ordi-droit.js'
import LierreOrdiGauche from '../images/enracinee/lierre-ordi-gauche.js'

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
		
	svg {
		position: absolute;
		inset: 0 0;}
	
	path {
		fill: none;
		stroke-miterlimit: 10;}
	
	.large-only {
		display: none;}
			
	.vecteur--ghost {
		top: 0;
		bottom: auto;}
		
	.small-only {
		display: flex;
		margin-inline: unset !important;
		position: relative;
		
		&.vecteur--gauche {
			width: 15%;
			path {
				stroke: #ffc9de;
				stroke-width: 70px;}}
		&.vecteur--droite {
			width: 15%;
			svg {
				position: fixed;
				height: 90vh;
				inset: auto 0 0 auto;}
			path {
				fill: #c8eb9b;}}}
		
	${media.desktopUp`
		.small-only {
			display: none;}
			
		.large-only {
			display: flex;
			margin-inline: unset !important;
			position: relative;
			
			&.vecteur--gauche {
				width: 35%;}
			&.vecteur--droite {
				width: 35%;}}
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

gsap.registerPlugin(useGSAP, ScrollTrigger, DrawSVGPlugin);

const PEnracinee = ({lang}) => {
	const [wixData, setWixData] = useState()
	//const [shareTooltipOn, setShareTooltipOn] = useState(false)
	
	const vecteursScopeRef = useRef()
	const contentRef = useRef()
	
	/******** Fetch Wix data *********/
	const placeholderData = {
		data: {
			title: 'Chargement ...',
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
	
	// GSAP Setup de depart
	useGSAP(() => {
		if (wixData && wixData.length >= 6 ) {
			
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
			gsap.set(".small-only.vecteur--gauche path", {drawSVG: "3%"});
			
		}
	},{ scope: vecteursScopeRef, dependencies: [wixData] });
	
	// Animation vecteurs au scroll
	useGSAP(() => {
		if (wixData && wixData.length >= 6) {
			
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
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			}); 
			
			gsap.to("#ld-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-2", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
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
	}, { scope: vecteursScopeRef, dependencies: [wixData], })
	
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
						<LierreOrdiGauche />
					</div>
					<div className='large-only vecteur--ghost'></div>
					<div className='small-only vecteur--gauche'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100.51 7612.47" preserveAspectRatio="none" width="100%" height="100%">
							<path className="cls-1" d="M55.23,1.73c-18.19,367.18-23.85,987.17-9,1347,27.18,658.47,23.23,1135.89,3,1603-17.98,415.2-20.29,1214.75,1,1624,19.91,382.6,14.39,1375.5-5,1829-12.85,300.48-15.98,899.96,8,1205"/>
						</svg>
					</div>
					<div className='small-only vecteur--ghost'></div>
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
						
						{ wixData && wixData.length >= 6 ? <>
							<Chapitre
								id='chapitre1'
								lang={lang}
								imgFile='temp-gen2'
								texts={wixData[0].data}
								model='right'
							/>
								
							<Chapitre
								id='chapitre2'
								lang={lang}
								imgFile='temp-gen'
								texts={wixData[1].data}
								model='left'
							/>
							
							<Chapitre
								id='chapitre3'
								lang={lang}
								imgFile='temp-gen'
								texts={wixData[2].data}
								model='right'
							/>
							
							<Chapitre
								id='chapitre4'
								lang={lang}
								imgFile='temp-gen2'
								texts={wixData[3].data}
								model='left'
							/>
							
							<Chapitre
								id='chapitre5'
								lang={lang}
								imgFile='temp-gen'
								texts={wixData[4].data}
								model='right'
							/>
							
							<Chapitre
								id='chapitre6'
								lang={lang}
								imgFile='temp-gen2'
								texts={wixData[5].data}
								model='left'
							/>
						</> : <p>... {localisedText[lang].chargement}</p>}
					</div>
				</Chapitres>
				
				<div className='vecteurs'>
					<div className='large-only vecteur--ghost'></div>
					<div className='large-only vecteur--droite'>
						<LierreOrdiDroit />
					</div>
					<div className='small-only vecteur--ghost'></div>
					<div className='small-only vecteur--droite'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64.75 1196">
							<path className="cls-1" d="M64.75,0v1196S1.06,1018.85.75,957C-.25,758-.25,415,.75,153,.91,111.54,64.75,0,64.75,0Z"/>
						</svg>
					</div>
				</div>
				
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
