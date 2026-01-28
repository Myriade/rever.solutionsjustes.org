import React, {useEffect, useState, useRef} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Styled = styled.div`
	width: 90%;
	margin-inline: auto;
	margin-bottom: 10vh;
	
	.illustration {
		position: relative;
		padding: 5%;}
		
	.cadre {
		position: absolute;
		inset: -5px -2px 0 -2px;
		width: calc(100% + 4px);
		height: 100%;
		.cadre--path {
			fill: #c1caaf;}
		.contour {
			fill: none;
			stroke: #191a16;
			stroke-miterlimit: 10;
			stroke-width: 4px;}
		.coins {
			fill:#191a16;}}
	
	&#chapitre2 .cadre--path {
		fill: #467251;}
		
	&#chapitre3 .cadre--path {
		fill: #2E5E45;}
		
	&#chapitre4 .cadre--path,
	&#chapitre6 .cadre--path {
		fill: #154939;}
		
	&#chapitre5 {
		.cadre--path {
			fill: #191a16;}
		.coins {
			fill: #ddc99d;}
		.contour {
			stroke: #ddc99d;}}
	
	&.chapitre--right {
		margin-left: 10%;}
	
	&.chapitre--left {
		margin-right: 7%;}
	
	.content {
		display: grid;
		transform: scale(0.85);
		opacity: 0.5;
		border-radius: 3px;
		background: white;
		border: 1px solid var(--color-pourpre);}
	
	.text {
		margin-block: 1em;
		color: var(--color-pourpre);
		padding-left: 4%;
		padding-right: 12.5%;}
	
	button.readmore {
		background: none;
		padding: 0;
		border: 0;
		path {
			stroke: var(--color-bleu-tres-fonce);}
		&:hover {
			cursor: pointer;
			path { 
				stroke: var(--color-bleu-clair);}}}
		
	h2 {
		font-size: 1.75rem;
		letter-spacing: 0.05em;
		margin-bottom: 1em;}
		
	p { font-size: 1.2rem;}
		
	${media.desktopUp`
		width: 55%;
			
		&.chapitre--right {
			margin-inline: 30% 15%;
			.illustration {
				margin-right: unset;}}
		
		&.chapitre--left {
			margin-inline: 15% 30%;
			.illustration {
				margin-left: unset;}}
				
		.text {
			margin-block: 2.5em;}
		
		h2 {
			font-size: 2rem;}
	`};
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

const localisedText = {
	fr: {
		readMore: 'Lire la suite',
	},
	en: {
		readMore: 'Continue reading',
	}
}

const Chapitre = ({ id, readMoreId, lang, imgFile, texts, color, model, rendered, onRenderChange }) => {
	const [hasParagraphs, setHasParagraphs] = useState(false);
	const gsapScopeRef = useRef();
	const paragraphes = useRef();
	
	// Charge en GraphQL toutes les images du répertoire images/enraciner
	const data = useStaticQuery(graphql`
		query { 
			allFile(filter: {sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "enraciner"}}) {
				nodes {
					childImageSharp {
						gatsbyImageData(layout: CONSTRAINED)
					}
					name
				}
			}
		}
	`);
	
	// Extrait la bonne image Gatsby selon le nom de fichier spécifié dans le prop
	const image = data.allFile.nodes.find(node => node.name === imgFile);
	const imageData = getImage(image.childImageSharp.gatsbyImageData);
	
	// Check if paragraphs exist (more than one)
	useEffect( ()=>{
		if (!hasParagraphs && paragraphes.current.childNodes.length > 1) {
			setTimeout(() => {
		  	setHasParagraphs(true)
			}, 250);
		}
	},[hasParagraphs])
	
	// Sends render State to Parent component
	useEffect( ()=>{
		if (typeof rendered === 'number' && hasParagraphs && imageData) {
			if (rendered === 5) {
				onRenderChange(true)
			}
		}
	},[rendered, hasParagraphs, imageData, onRenderChange])
	
	// Animations et scroll avec GSAP
	useGSAP(() => {
		if (hasParagraphs && imageData && texts) {
			
			// Content zoom in & alpha
			gsap.to('.content', {
				scrollTrigger: {
					id: `scale-${id}`,
					trigger: '.content',
					start: 'top 70%',
					end: 'top 40%',
					scrub: 0.1,
				},
				scale: 1,
				autoAlpha: 1,
			})
			
			// Titre apparait
			gsap.from('h2', {
				scrollTrigger: {
					id: `titre-${id}`,
					trigger: '.paragraphs',
					start: 'top 80%',
					end: 'top 70%',
					scrub: 0.1,
				},
				autoAlpha: 0,
			});
			
			// Premier paragraphe apparait
			gsap.from('.paragraphs p:first-child', {
				scrollTrigger: {
					id: `p1-${id}`,
					trigger: '.paragraphs',
					start: 'top 65%',
					end: 'top 55%',
					scrub: 0.1
				},
				autoAlpha: 0,
			});
			
			// Autres paragraphes apparaissent
			gsap.from('.paragraphs p:not(:first-child)', {
				scrollTrigger: {
					id: `ps-${id}`,
					trigger: '.paragraphs',
					start: 'top 55%',
					end: 'top 45%',
					scrub: 0.1
				},
				autoAlpha: 0,
			});
		}
	},{ scope: gsapScopeRef, dependencies: [hasParagraphs, imageData, texts] });
	
	// Event Handler
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	const readmoreClickHandler = contextSafe( id => {
		console.log('readmore clicked')
		gsap.to( window, { duration: 3, scrollTo: { y: `#${id}`, offsetY: -50 }});
	});
	
	return (
		<Styled 
			className={`chapitre ${color} chapitre--${model}`} 
			id={id}
			ref={gsapScopeRef}
		>
			<div className='content'>
				{imageData && 
					<div className='illustration'>
						<GatsbyImage
							image={imageData} 
							alt={id} 
						/>
						<svg className='cadre' data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 742.3 419.64"  preserveAspectRatio="none">
							<g id="Calque_1-2" data-name="Calque 1">
								<path className="cadre--path" d="M700.3,42v335.64H42V42h658.3M742.3,0H0v419.64h742.3V0h0Z"/>
								<rect className="contour" x="42.15" y="42.58" width="658.06" height="334.78"/>
								<g>
									<path className="coins" d="M14.13,15.81c5.96,3.53,11.13,7.98,16.12,12.7,4.92,4.78,9.58,9.77,13.35,15.58-5.96-3.53-11.13-7.97-16.12-12.7-4.92-4.79-9.57-9.77-13.35-15.58h0Z"/>
									<path className="coins" d="M728.8,15.81c-3.78,5.81-8.43,10.79-13.35,15.58-4.98,4.72-10.15,9.17-16.12,12.7,3.77-5.81,8.43-10.8,13.35-15.58,4.99-4.72,10.16-9.16,16.12-12.7h0Z"/>
									<path className="coins" d="M728.8,404.23c-5.96-3.53-11.13-7.98-16.12-12.7-4.92-4.78-9.58-9.77-13.35-15.58,5.96,3.53,11.13,7.97,16.12,12.7,4.92,4.79,9.57,9.77,13.35,15.58h0Z"/>
									<path className="coins" d="M14.13,404.23c3.78-5.81,8.43-10.79,13.35-15.58,4.98-4.72,10.15-9.17,16.12-12.7-3.77,5.81-8.43,10.8-13.35,15.58-4.99,4.72-10.16,9.16-16.12,12.7h0Z"/>
								</g>
							</g>
						</svg>
					</div>
				}
				<div className='text'>
					<h2>{texts ? texts.title : '...'}</h2>
					{texts ? 
						<div className='paragraphs' dangerouslySetInnerHTML={{ __html: texts.texte }} ref={paragraphes}/>
						: <div className='paragraphs'><p>...</p><p></p></div>
					}
					{readMoreId ? 
						<button
							className='readmore'
							onClick={() => readmoreClickHandler(readMoreId)}
							title={localisedText[lang].readMore}
						>
							<svg mlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-chevron-down-icon lucide-chevron-down"><path d="m6 9 6 6 6-6"/></svg>
						</button>
					: ''}
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;