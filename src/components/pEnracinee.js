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
		background: #295534;}
	.color4 .text {
		background: #2d3837;}
	
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
			
			<Chapitre><div id='chapitre1' className=''>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>{texts.bloc1.titre}</h2>
					{texts.bloc1.texte.map((item, index) => <p key={index}>{item}</p>)}
				</div>
			</div></Chapitre>
				
			<Chapitre><div id='chapitre2' className='color2'>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>{texts.bloc2.titre}</h2>
					{texts.bloc2.texte.map((item, index) => <p key={index}>{item}</p>)}
				</div>
			</div></Chapitre>
			
			<Chapitre><div id='chapitre3' className='color3'>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>Bloc 3</h2>
				</div>
			</div></Chapitre>
			
			<Chapitre><div id='chapitre4' className='color4'>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>Bloc 4</h2>
				</div>
			</div></Chapitre>
			
			<Chapitre><div id='chapitre5' className='color3'>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>Bloc 5</h2>
				</div>
			</div></Chapitre>
			
			<Chapitre><div id='chapitre6' className='color2'>
				<StaticImage 
					src='../images/MCM_Visuel-Histoire.png'
					alt='temp'
				/>
				<div className='text'>
					<h2>Bloc 6</h2>
				</div>
			</div></Chapitre>
		
		</div>
	)
}

export default PEnracinee
