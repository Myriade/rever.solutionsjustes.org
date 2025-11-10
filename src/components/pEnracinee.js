import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
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

const Intro = styled.section`
	display: flex;
	gap: calc(var(--v-spacer) *2) var(--h-spacer);
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: start;
	padding-bottom: 0 !important;
	margin-bottom: 0;
	
	${media.desktopUp`
		#chapitre1 {
			max-width: calc( 30vw - var(--h-spacer) ) !important;
			&.chapitre--modelA {
				margin-top: 3rem;}}
	`};
`;

const Video = styled.div`
	width: 80%;
	display: flex;
	background: lightgrey;
	margin-bottom: 10vh;
		
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

const Vecteur = styled.section`
	position: absolute;
	width: 100%;
	inset: 20vh 0;
	margin: auto;
	padding-top: 0 !important;
	z-index: 50;
	opacity: 0.5;
	display: flex;
	justify-content: space-between;
	align-items: stretch;
	
	> div {
		margin-inline: unset !important;
		width: 35%;
		position: relative;
		display: flex;}
	
	svg {
		position: absolute;
		top: 0;
		bottom: 0;
		right: 0;
		background: rgba(255,192,203,0.7);}
	
	.cls-1 {
		fill: none;
		stroke: #0071bc;
		stroke-miterlimit: 10;
		stroke-width: 150px;}
		
	.cls-2 {
		fill: none;
		stroke: orange;
		stroke-miterlimit: 10;
		stroke-width: 5px;}
`

const localisedText = {
	fr: {
	},
	en: {
	}
}

gsap.registerPlugin(useGSAP, ScrollTrigger);

const PEnracinee = ({lang, texts}) => {
	const [data, setData] = useState(true)
	const [shareTooltipOn, setShareTooltipOn] = useState(false);
	
	return (
		<>
			<Banniere>
				<div className='temp'>
					<h1>Bannière</h1>
					<p>[ .... À venir: image, titre et bouton «sortie rapide» .... ]</p>
				</div>
			</Banniere>
			
			<Vecteur>
				<div>
					
				</div>
				<div>
					<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 602.52 9280.22" preserveAspectRatio="none" width="100%" height="100%">
						<path class="cls-1" d="M392.24,48.07c-468.89,713.15,103.06,1502.98,103.06,2083.22,0,377.56-429.93,289.45-402.03,777.9,30.48,533.56,442.32,1278.58,397.56,1787.71-31,352.64-387.89,327.51-402.84,889.7-12.47,468.67,219.29,829.82,367.03,1346.04,110.31,385.41,69.47,822.6-130.37,1145.11-191.3,308.72,298.64,588.62-140.46,1148.47"/>
					</svg>
				</div>
			</Vecteur>
			
			<Chapitres id='chapitres'>
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
					/>
				</div>
			</Chapitres>
			
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
