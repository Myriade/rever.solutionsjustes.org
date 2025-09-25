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
	
	${media.mediumUp``};
`;

const Video = styled.section`
	iframe {
		width: 100%;
		height: 30vh;
	}
	${media.mediumUp``};
`;

const Chapitres = styled.section`
	display: grid;
	gap: 5vw;
	
	section:nth-child(even) {
		padding-left: 10vw}
	section:nth-child(odd) {
		padding-right: 10vw}
`;

const Chapitre = styled.section`
	img {
		border: 1rem solid #3a1737;}

	.text {
		background: #b5bca2;
		padding: 2rem;
		border-radius: 3rem}
		
	.color2 .text {
		background: #729b76;}
	.color3 .text {
		background: #295534;
		h2, p {
			color: white;}}
	.color4 .text {
		background: #2d3837;
		h2, p {
			color: white;}}
	
	${media.mediumUp``};
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
					<p>image, titre, bouton sortie rapide</p>
				</div>
			</Banniere>
			<hr/>
			
			<Video>
				<iframe src="https://player.vimeo.com/video/235215203?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479" frameborder="0" allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share" referrerpolicy="strict-origin-when-cross-origin"></iframe>
				<script src="https://player.vimeo.com/api/player.js"></script>
			</Video>
			
			<Chapitres>
			
				<Chapitre><div id='chapitre1' className=''>
					<StaticImage 
						src='../images/enracinee/temp-1.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc1.titre}</h2>
						{texts.bloc1.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
					
				<Chapitre><div id='chapitre2' className='color2'>
					<StaticImage 
						src='../images/enracinee/temp-2.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc2.titre}</h2>
						{texts.bloc2.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre3' className='color3'>
					<StaticImage 
						src='../images/enracinee/temp-3.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc3.titre}</h2>
						{texts.bloc3.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre4' className='color4'>
					<StaticImage 
						src='../images/enracinee/temp-4.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc4.titre}</h2>
						{texts.bloc4.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre5' className='color3'>
					<StaticImage 
						src='../images/enracinee/temp-5.png'
						alt='temp'
					/>
					<div className='text'>
						<h2>{texts.bloc5.titre}</h2>
						{texts.bloc5.texte.map((item, index) => <p key={index}>{item}</p>)}
					</div>
				</div></Chapitre>
				
				<Chapitre><div id='chapitre6' className='color2'>
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
		
		</div>
	)
}

export default PEnracinee
