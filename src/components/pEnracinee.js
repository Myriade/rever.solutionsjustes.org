import React, {useState, useEffect, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
import Chapitre from './enracineeChapitre'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Banniere = styled.section`
	background: #eee;
	width: 100%;
	padding: initial !important;
	display: grid;
	
	.temp {
		padding: 5vh}
	
	${media.desktopUp``};
`;

const Intro = styled.section`
	background: white;
	display: flex;
	gap: calc(var(--v-spacer) *2) var(--h-spacer);
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: start;
	padding-bottom: 0 !important;
	margin-bottom: 6vh;
	
	${media.desktopUp`
		#chapitre1 {
			max-width: calc( 30vw - var(--h-spacer) ) !important;
			&.chapitre--modelA {
				margin-top: 3rem;}}
	`};
`;

const Video = styled.div`
	width: 100%;
	display: flex;
	background: #eee;
		
	iframe {
		width: 100%;}
		
	.set-height {
		width: 0;
		padding-top: 56.25%;}
		
	${media.desktopUp`
		width: calc( 60vw - var(--h-spacer) - var(--h-spacer) ) !important;
	`};
`;

const Chapitres = styled.section`
	${media.desktopUp`
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
			
			<Intro>
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
					color='color1'
					model='modelA'
				/>
			</Intro>
			
			<Chapitres id='chapitres'>
					
				<Chapitre
					id='chapitre2'
					lang={lang}
					imgFile='temp-2'
					texts={texts.bloc2}
					color='color2'
					model='modelB'
				/>
				
				<Chapitre
					id='chapitre3'
					lang={lang}
					imgFile='temp-3'
					texts={texts.bloc3}
					color='color3'
					model='modelA'
				/>
				
				<Chapitre
					id='chapitre4'
					lang={lang}
					imgFile='temp-4'
					texts={texts.bloc4}
					color='color4'
					model='modelB'
				/>
				
				<Chapitre
					id='chapitre5'
					lang={lang}
					imgFile='temp-5'
					texts={texts.bloc5}
					color='color3'
					model='modelA'
				/>
				
				<Chapitre
					id='chapitre6'
					lang={lang}
					imgFile='temp-6'
					texts={texts.bloc6}
					color='color2'
					model='modelB'
				/>
				
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
