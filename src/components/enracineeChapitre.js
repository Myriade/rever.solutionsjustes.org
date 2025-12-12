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
	
	&.chapitre--right .illustration {
		margin-right: -10%;}
	
	&.chapitre--left .illustration {
		margin-left: -10%;}
	
	.content {
		display: grid;
		transform: scale(0.85);
		opacity: 0.5;
		border-radius: 3px;
		background: white;
		
		border: 1px solid var(--color-pourpre);}
	
	.text {
		color: var(--color-pourpre);
		margin-top: 5vh;}
		
	h2 {
		font-size: 2rem;
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
				padding-left: 4%;
				padding-right: 12.5%;}
		`};
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Chapitre = ({ id, lang, imgFile, texts, color, model }) => {
	const [hasParagraphs, setHasParagraphs] = useState(false);
	const gsapScopeRef = useRef();
	const paragraphes = useRef();
	
	// Charge en GraphQL toutes les images du répertoire images/enracinee
	const data = useStaticQuery(graphql`
		query { 
			allFile(filter: {sourceInstanceName: {eq: "images"}, relativeDirectory: {eq: "enracinee"}}) {
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
		if (paragraphes.current.childNodes.length > 1) {
		  setHasParagraphs(true)
		}
	},[])
	
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
					</div>
				}
				<div className='text'>
					<h2>{texts ? texts.title : '...'}</h2>
					{texts ? 
						<div className='paragraphs' dangerouslySetInnerHTML={{ __html: texts.texte }} ref={paragraphes}/>
						: <div className='paragraphs'><p>...</p><p></p></div>
					}
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;