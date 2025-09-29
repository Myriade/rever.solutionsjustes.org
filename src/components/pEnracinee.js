import React, {useState, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'

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
	gap: var(--v-spacer) 0.5rem;
	flex-wrap: wrap;
	align-items: flex-start;
	padding-bottom: 0 !important;
	margin-bottom: 6vh;
	
	.chapitre {
		margin-top: 10vh;
		max-width: 85%}
	
	${media.desktopUp`
		> div:nth-child(2) {
			max-width: 30vw !important;
			.gatsby-image-wrapper {
				}
		.chapitre {
			max-width: 100%;}}
	`};
`;

const Video = styled.div`
	width: 100%;
	display: grid;
	grid-template-columns: 0 auto;
		
	iframe {
		width: 100%;
		height: 100%;}
		
	${media.mediumUp`
		.set-height {
			height: clamp(500px, 40vh, 800px);
			width: 0;}
	`}
		
	${media.desktopUp`
		width: 50vw;
			
		iframe {
			min-width: 50vw;}
	`};
`;

const Chapitres = styled.section`
	display: flex;
	flex-wrap: wrap;
	gap: 13vh 3vw;
	margin-inline: 2rem;
`;

const Chapitre = styled.div`
	max-width: 100% !important;
	.chapitre {
		background: #b5bca2;
		padding: 2rem;
		border-radius: 3rem;}
		
	&:nth-child(odd) .chapitre {
		
		.gatsby-image-wrapper {
			}}

	.text {
		p {
			display: none;}
		p:nth-of-type(1) {
			display: block;
			font-weight: bold;}
		p:nth-of-type(2) {
			display: block;}
		p:nth-of-type(3) {
			display: block;
			white-space: nowrap;
			max-width: 70ch;
			overflow: hidden;
			text-overflow: "... [défilement vers la suite, à coder]";}}
		
	h2 {
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		margin-bottom: 0.25rem;
		margin-top: -1rem;}
		
	.chapitre.color2 {
		background: #729b76;}
		
	.chapitre.color3 {
		background: #295534;
		h2, p {
			color: white;}}
			
	.chapitre.color4 {
		background: #2d3837;
		h2, p {
			color: white;}}
	
	.gatsby-image-wrapper {
		position: relative;
		top: -10vh;
		border: 1rem solid #3a1737;
		--size: 0.75rem;
		--g: #0000 98%, #000;
		mask: 
			radial-gradient(var(--size) at 0 0, var(--g)) 0 0,
			radial-gradient(var(--size) at 100% 0, var(--g)) 100% 0,
			radial-gradient(var(--size) at 0 100%, var(--g)) 0 100%,
			radial-gradient(var(--size) at 100% 100%, var(--g)) 100% 100%;
		mask-size: 51% 51%;
		mask-repeat: no-repeat;
		-webkit-mask: 
			radial-gradient(var(--size) at 0 0, var(--g)) 0 0,
			radial-gradient(var(--size) at 100% 0, var(--g)) 100% 0,
			radial-gradient(var(--size) at 0 100%, var(--g)) 0 100%,
			radial-gradient(var(--size) at 100% 100%, var(--g)) 100% 100%;
		-webkit-mask-size: 51% 51%;
		-webkit-mask-repeat: no-repeat;}
	
	${media.desktopUp`
		width: 47%;
	`};
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
				
				<Chapitre><div id='chapitre1' className='chapitre'>
					<StaticImage 
						src='../images/enracinee/temp-1.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc1.titre}</h2>
						{texts.bloc1.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
			</Intro>
			
			<Chapitres>
					
				<Chapitre><div id='chapitre2' className='chapitre color2'>
					<StaticImage 
						src='../images/enracinee/temp-2.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc2.titre}</h2>
						{texts.bloc2.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre3' className='chapitre color3'>
					<StaticImage 
						src='../images/enracinee/temp-3.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc3.titre}</h2>
						{texts.bloc3.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre4' className='chapitre color4'>
					<StaticImage 
						src='../images/enracinee/temp-4.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc4.titre}</h2>
						{texts.bloc4.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre5' className='chapitre color3'>
					<StaticImage 
						src='../images/enracinee/temp-5.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc5.titre}</h2>
						{texts.bloc5.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre6' className='chapitre color2'>
					<StaticImage 
						src='../images/enracinee/temp-6.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc6.titre}</h2>
						{texts.bloc6.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
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
