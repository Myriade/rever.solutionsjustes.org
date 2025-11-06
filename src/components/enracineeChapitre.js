import React, {useState, useEffect, useRef} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const Styled = styled.div`
	width: 80%;
	margin-bottom: 10vh;
	
	&.chapitre--right {
		margin-inline: 0 2xl:0%;}
	
	&.chapitre--left {
		margin-inline: 20% 0;}
	
	${media.desktopUp`
		width: 60%;
		
		&.chapitre--right {
			margin-inline: 40% 20%;
			.illustration {
				justify-self: right;
				transform: translateX(25%) }}
		
		&.chapitre--left {
			margin-inline: 20% 40%;
			.illustration {
				transform: translateX(-25%)}}
	`};
	
	.content {
		display: grid;
		transform: scale(0.85);
		opacity: 0.5;
		padding: 4vh 10%;
		border-radius: 3px;
		background: #b5bca2;}
		
	.illustration {
		position: relative;
		bottom: 10vh;}
		
	.illustration {
		max-width: 50vh;}
	
	.text {
		color: var(--color-pourpre);
		overflow: hidden;
		margin-top: -5vh;}
			
		.paragraphs {
			max-height: 30vh;
			overflow: hidden;
			position: relative;
			
			> p {
				margin-top: 0;
				font-weight: bold;}
				
			&__overflow {
				overflow: hidden;
				position: relative;}
			
			&__before,
			&__after {
				position: absolute;
				width: 100%;
				height: 1em;
				background: linear-gradient(#fff, rgba(255,255,255,0))}
				
			&__before {
				top: 0;}
			&__after {
				bottom: 0;}
		}
		
	h2 {
		font-size: 1.5rem;
		letter-spacing: 0.05em;
		margin-bottom: 1em;}
		
	h2 strong, 
	.text p:first-child strong {
		background-color: var(--color-jaune);
		color: var(--color-pourpre);
		font-weight: bold;}
	
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
	
	// Mapper les couleurs 
	let bgColor = 'rgba(255,255,255,0)'
	if (color) {
		if (color === 'color1') {
			bgColor = '#b5bca2'
		} else if (color === 'color2') {
			bgColor = '#729b76'
		} else if (color === 'color3') {
			bgColor = '#295534'
		} else if (color === 'color4') {
			bgColor = '#2d3837'
		}
	}
	
	// Animations et scroll avec GSAP
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
		
		// Content zoom in & alpha
		gsap.to('.content', {
			scrollTrigger: {
				id: `scale-${id}`,
				trigger: '.content',
				start: 'top 80%',
				end: 'top 55%',
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
				start: '5% 55%',
				end: '10% 55%'
			},
			autoAlpha: 0,
		});
		
		// Premier paragraphe apparait
		gsap.from('.paragraphs p:first-child', {
			scrollTrigger: {
				id: `p1-${id}`,
				trigger: '.content',
				start: '15% 55%',
				end: '20% 55%'
			},
			autoAlpha: 0,
		});
		
		// Autres paragraphes apparaissent
		gsap.from('.paragraphs p:not(:first-child)', {
			scrollTrigger: {
				id: `ps-${id}`,
				trigger: '.content',
				start: '25% 55%',
				end: '30% 55%',
			},
			autoAlpha: 0,
		});
		
		// Défilement des paragraphes 
		gsap.to( '.paragraphs__scroll', {
			scrollTrigger: {
				id: `pscroll-${id}`,
				trigger: '.pin',
				start: 'top 17%',
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
							<p dangerouslySetInnerHTML={{ __html: texts.texte[0] }}/>
							<div className='paragraphs__overflow'>
								<div className='paragraphs__scroll'>
									{texts.texte.slice(1).map((item, index) => <p key={index} dangerouslySetInnerHTML={{ __html: item }}/>) }
								</div>
								<div 
									className='paragraphs__before' 
									style={{ background: `linear-gradient(${bgColor}, rgba(255,255,255,0))`}}
								/>
							</div>
							<div 
								className='paragraphs__after' 
								style={{ background: `linear-gradient(rgba(255,255,255,0), ${bgColor})`}}
							/>
						</div>
					</div>
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;