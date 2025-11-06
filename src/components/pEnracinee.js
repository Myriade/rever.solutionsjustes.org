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
	top: 20vh;
	left: 0; 
	right: 0;
	margin: auto;
	background: rgba(255,192,203,0.7);
	padding-top: 0;
	z-index: 50;
	opacity: 0.5;
	
	> * {
		max-width: none !important;}
	
	.cls-1 {
		fill: none;
		stroke: #0071bc;
		stroke-miterlimit: 10;
		stroke-width: 150px;}
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
				<div style={{background: 'white', textAlign: 'center'}}>
					[Vecteur]
				</div>
			</Vecteur>
			
			<Chapitres id='chapitres'>
				<div style={{marginInline: '0'}}>
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
