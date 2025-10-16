import React, {useState, useEffect, useRef} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Styled = styled.div`
	max-width: 100% !important;
	
	.content {
		padding: 2rem;
		border-radius: 3px;
		background: #b5bca2;}
		
	.gatsby-image-wrapper {
		width: 112%;
		position: relative;
		bottom: 5rem;}
		
	&.chapitre--modelA .gatsby-image-wrapper {
		right: calc(var(--h-spacer) + 2rem);}
	
	.text {
		overflow: hidden;
		margin-top: -2rem;}
			
	.paragraphs {
		max-height: 30vh;
		overflow: hidden;
		p:first-child {
			margin-top: 0;
			font-weight: bold;}}
		
	h2 {
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		margin-bottom: 1em;}
		
	&.color2 .content {
		background: #729b76;}
		
	&.color3 .content {
		background: #295534;
		h2, p {
			color: white;}}
			
	&.color4 .content {
		background: #2d3837;
		h2, p {
			color: white;}}
			
	&.chapitre--modelA .content {
		margin-right: 10vw;}
	
	&.chapitre--modelB .content {
		margin-left: 10vw;}
	
	.gatsby-image-wrapper {
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
		width: 41vw;
		
		.gatsby-image-wrapper {
			width: 112%;}
		
		&.chapitre--modelA {
			margin-top: 20vh;
			.gatsby-image-wrapper {
				right: 0;}}
				
		&.chapitre--modelB {
			.gatsby-image-wrapper {
				right: calc(var(--h-spacer) + 2rem);}}
			
		&.chapitre--modelA .content, 
		&.chapitre--modelB .content {
			margin-inline: 0;	
		}
	`};
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Chapitre = ({ id, lang, imgFile, texts, color, model, markers }) => {
	const gsapScopeRef = useRef();
	const paragraphsRef = useRef();
	
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
	
	// Extrait la bonne image Gatsby selon le nom de fichier spécifié danes le prop
	const image = data.allFile.nodes.find(node => node.name === imgFile);
	const imageData = getImage(image.childImageSharp.gatsbyImageData);
	
	// Défilement du texte avec GSAP
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	const chapitreAnimation = contextSafe(() => {
		const paragraphsElement = paragraphsRef.current;
		if (!paragraphsElement) return;
		
		const paragraphsHiddenHeight = paragraphsElement.scrollHeight - paragraphsElement.offsetHeight;
		
		// Titre apparait
		gsap.from('h2', {
			scrollTrigger: {
				trigger: '.content',
				start: '50% 50%',
			},
			autoAlpha: 0,
		});
		
		// Premier paragraphe apparait
		gsap.from('.paragraphs p:first-child', {
			scrollTrigger: {
				trigger: '.content',
				start: '50% 40%',
			},
			autoAlpha: 0,
		});
		
		// Autres paragraphe apparaissent
		gsap.from('.paragraphs p:not(:first-child)', {
			scrollTrigger: {
				trigger: '.content',
				start: '50% 30%',
			},
			autoAlpha: 0,
		});
		
		// Défilement des paragraphes 
		gsap.to( '.paragraphs__scroll', {
			scrollTrigger: {
				id: `p-${id}`,
				trigger: '.content',
				start: '50% 30%',
				end: '50% 0%',
				scrub: 0.1,
			},
			y: -1 * paragraphsHiddenHeight,
		})
		
	},{ scope: gsapScopeRef }); 
	
	// GSAP init
	useEffect( () => {
		console.log('Chapitre useEffect');
		if (data) {
			chapitreAnimation()
		}
	},[chapitreAnimation])
	
	return (
		<Styled 
			className={`chapitre ${color} chapitre--${model}`} 
			id={id}
			ref={gsapScopeRef}
		>
			<div className='content'>
				{imageData && 
					<GatsbyImage
						image={imageData} 
						alt={id} 
					/>
				}
				<div className='text'>
					<h2>{texts.titre}</h2>
					<div className='paragraphs' ref={paragraphsRef}>
						<div className='paragraphs__scroll'>
							{texts.texte.map((item, index) => <p key={index}>{item}</p>)}
						</div>
					</div>
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;