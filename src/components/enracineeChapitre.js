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
	margin-bottom: 7rem;
	
	.content {
		transform: scale(0.85);
		opacity: 0.5;
		padding: 2rem;
		border-radius: 3px;
		background: #b5bca2;}
		
	.illustration {
		position: relative;
		bottom: 5rem;}
		
	.illustration {
		max-width: 50vh;}
		
	&.chapitre--modelA .illustration {
		right: calc(var(--h-spacer) + 2rem);}
	
	.text {
		color: var(--color-pourpre);
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
		
	h2 strong, 
	.text p:first-child strong {
		background-color: var(--color-jaune);
		color: var(--color-pourpre);
		font-weight: bold;}
		
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
	
	.illustration {
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
		margin-bottom: 0;
		
		.illustration {
			width: 112%;}
		
		&.chapitre--modelA {
			.illustration {
				right: 0;}}
				
		&.chapitre--modelB {
			.illustration {
				right: calc(var(--h-spacer) + 2rem);}}
			
		&.chapitre--modelA .content, 
		&.chapitre--modelB .content {
			margin-inline: 0;}
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
		
		// Content pins
		gsap.to('.pin', {
			scrollTrigger: {
				id: `pin-${id}`,
				trigger: '.pin',
				start: 'top 17%',
				end: `+=${paragraphsHiddenHeight + 200}`,
				pin: true
			}
		})
		
		// // Content zoom in & alpha
		gsap.to('.content', {
			scrollTrigger: {
				id: `scale-${id}`,
				trigger: '.content',
				start: 'top 17%',
				end: '15% 17%',
				scrub: 0.1
			},
			scale: 1,
			autoAlpha: 1,
		})
		 
		// Titre apparait
		gsap.from('h2', {
			scrollTrigger: {
				id: `titre-${id}`,
				trigger: '.content',
				start: '17% 17%',
				end: '20% 17%'
			},
			autoAlpha: 0,
		});
		
		// Premier paragraphe apparait
		gsap.from('.paragraphs p:first-child', {
			scrollTrigger: {
				id: `p1-${id}`,
				trigger: '.content',
				start: '20% 17%',
				end: '25% 17%'
			},
			autoAlpha: 0,
		});
		
		// Autres paragraphes apparaissent
		gsap.from('.paragraphs p:not(:first-child)', {
			scrollTrigger: {
				id: `ps-${id}`,
				trigger: '.content',
				start: '25% 17%',
				end: '30% 17%',
			},
			autoAlpha: 0,
		});
		
		// Défilement des paragraphes 
		gsap.to( '.paragraphs__scroll', {
			scrollTrigger: {
				id: `pscroll-${id}`,
				trigger: '.content',
				start: '30% 17%',
				end: `+=${paragraphsHiddenHeight + 200}`,
				scrub: 0.1
			},
			y: -1 * paragraphsHiddenHeight,
		})
		
	},{ scope: gsapScopeRef }); 
	
	// GSAP init
	useEffect( () => {
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
			<div className='pin'>
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
						<h2>{texts.titre}</h2>
						<div className='paragraphs' ref={paragraphsRef}>
							<div className='paragraphs__scroll'>
								{texts.texte.map((item, index) => <p key={index} dangerouslySetInnerHTML={{ __html: item }}/>)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;