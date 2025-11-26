import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'
import Chapitre from './enracineeChapitre'

import useWixData from '../utils/useWixData'
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
				width: 35%;
				path {
					stroke: #00a99d;
					stroke-width: 400px;}}
			&.vecteur--droite {
				width: 35%;
				path {
					stroke: #0071bc;
					stroke-width: 250px;}}}
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
		manualSort = ''
	}
	
	if (lang === 'en') {
		collection = 'Enracinee-En'
		manualSort = ''
	}
	
	const fetchedData = useWixData(collection, manualSort, placeholderData);
	
	if (!wixData) {
		if (fetchedData && fetchedData.length > 1) {
			console.log('fetchedData', fetchedData);
			setWixData(fetchedData)
		}
	}
	
	// GSAP Setup de depart
	useGSAP(() => {
		if (wixData && texts) {
			gsap.set(".large-only path", {drawSVG: "3%"});
			gsap.set(".small-only.vecteur--gauche path", {drawSVG: "3%"});
			gsap.to(".vecteurs", {
				opacity: 1,
				duration: 2
			});
		}
	},{ scope: vecteursScopeRef, dependencies: [wixData] });
	
	// Animation vecteurs au scroll
	useGSAP(() => {
		if (wixData && texts) {
			gsap.to(".vecteur--gauche.large-only path", {
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
			
			gsap.to(".vecteur--droite.large-only path", {
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
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 586.01 9290.57" preserveAspectRatio="none" width="100%" height="100%">
							<path className="cls-1" d="M199.07,19.24c117.6,1217.08-54.85,1755.25,31.78,2537.16,123.93,1118.56,255.39,1866.74,41.74,2751.32-284.99,1179.99,400.88,2073.7-73.39,3933.42"/>
						</svg>
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
						
						{ wixData ? <>
							<Chapitre
								id='chapitre1'
								lang={lang}
								imgFile='temp-gen2'
								texts={texts.bloc1}
								model='right'
							/>
								
							<Chapitre
								id='chapitre2'
								lang={lang}
								imgFile='temp-gen'
								texts={texts.bloc2}
								model='left'
							/>
							
							<Chapitre
								id='chapitre3'
								lang={lang}
								imgFile='temp-gen'
								texts={texts.bloc3}
								model='right'
							/>
							
							<Chapitre
								id='chapitre4'
								lang={lang}
								imgFile='temp-gen2'
								texts={texts.bloc4}
								model='left'
							/>
							
							<Chapitre
								id='chapitre5'
								lang={lang}
								imgFile='temp-gen'
								texts={texts.bloc5}
								model='right'
							/>
							
							<Chapitre
								id='chapitre6'
								lang={lang}
								imgFile='temp-gen2'
								texts={texts.bloc6}
								model='left'
								//onPinSet={() => setIsScrollReady(true)} 
							/>
						</> : ''}
					</div>
				</Chapitres>
				
				<div className='vecteurs'>
					<div className='large-only vecteur--ghost'></div>
					<div className='large-only vecteur--droite'>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 588.53 9313.43" preserveAspectRatio="none" width="100%" height="100%">
							<path className="cls-1" d="M208.98,43.02c-320.53,874.53,391.87,558.11,221.72,1858.94-59,451.03-324.23,543.96-296.33,1032.4,30.48,533.56,322.61,979.15,319.53,1477.37-2.19,353.99-153.97,703.78-294.82,1200.04-128,451.02,141.77,821.61,257.03,1346.04,89.22,405.97,52.57,787.04-110.37,1145.11-164.25,360.95-65.1,768.53,168.8,1144.47"/>
						</svg>
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
