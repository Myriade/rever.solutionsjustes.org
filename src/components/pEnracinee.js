import React, {useState, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import Chapitre from './enracineeChapitre'

const Banniere = styled.div`
	background: white;
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
	gap: var(--v-spacer) var(--h-spacer);
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: start;
	padding-bottom: 0 !important;
	margin-bottom: 6vh;
	
	> * {
		margin-inline: 0 !important;}
	
	.chapitre {
		margin-top: 10vh;
		max-width: 85%;}
	
	${media.desktopUp`
		> :first-child {
			margin-top: -10vh;}
		.chapitre {
			max-width: calc( 30vw - var(--h-spacer) ) !important;
			.gatsby-image-wrapper {
				transform: scale(1.05) translateY(-6vh);}
			}
		}
	`};
`;

const Video = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 0 auto;
	align-items: start;
		
	iframe {
		width: 100%;
		height: 100%;}
		
	.set-height {
		height: clamp(150px, 35vh, 520px);
		width: 0;}
		
	${media.mediumUp`
		.set-height {
			height: clamp(500px, 80vh, 800px);
			width: 0;}
	`}
		
	${media.desktopUp`
		max-width: calc( 64vw - var(--h-spacer) - var(--h-spacer) ) !important;
	`};
`;

const Chapitres = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 13vh 6vw;
	align-items: start;
	
	> div:last-child {
		.gatsby-image-wrapper {
			transform: scale(1.05) translateY(-6vh);}
	}
`;

const localisedText = {
	fr: {
	},
	en: {
	}
}

const PEnracinee = ({lang, texts}) => {
	const [shareTooltipOn, setShareTooltipOn] = useState(false);
	const gsapContainerRef = useRef();
	
	return (
		<div ref={gsapContainerRef} id='gsap-container'>
			<Banniere>
				<div className='temp'>
					<h1>Bannière</h1>
					<p>[ .... À venir: image, titre et bouton «sortie rapide» .... ]</p>
					<hr/>
					<p><i>[Animation à coder par Myriam : les chapitres apparaissent un à la fois en fade-in]</i></p>
				</div>
			</Banniere>
			
			<Intro>
				<Video>
					<div className='set-height'></div>
					<iframe src="https://player.vimeo.com/video/235215203?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
					<script src="https://player.vimeo.com/api/player.js"></script>
				</Video>
				<Chapitre
					id='chapitre1'
					lang={lang}
					imgFile='temp-1'
					texts={texts.bloc2}
					color='color1'
					model='modelA'
				/>
			</Intro>
			
			<Chapitres>
					
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
		
		</div>
	)
}

export default PEnracinee
