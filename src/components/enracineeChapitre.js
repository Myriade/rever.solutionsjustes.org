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
		margin-inline: 0 20%;}
	
	&.chapitre--left {
		margin-inline: 20% 0;}
	
	${media.desktopUp`
		width: 55%;
				
		&.chapitre--right {
			margin-inline: 30% 15%;}
		
		&.chapitre--left {
			margin-inline: 15% 30%;}
	`};
	
	.content {
		display: grid;
		transform: scale(0.85);
		opacity: 0.5;
		border: 1px dashed rgb(181, 188, 162);
		border-radius: 3px;
		background: white;}
	
	.text {
		padding-left: 2%;
		padding-right: 12.5%;
		color: var(--color-pourpre);
		overflow: hidden;
		margin-top: 5vh;}
		
	h2 {
		font-size: 2rem;
		letter-spacing: 0.05em;
		margin-bottom: 1em;}
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

const Chapitre = ({ id, lang, imgFile, texts, color, model }) => {
	const gsapScopeRef = useRef();
	
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
	} else {
		color=''
	}
	
	// Animations et scroll avec GSAP
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	const chapitreAnimation = contextSafe(() => {
		
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
		
	},{ scope: gsapScopeRef }); 
	
	// GSAP init
	useEffect( () => {
		if (data) {
			chapitreAnimation()
		}
	},[chapitreAnimation, data])
	
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
					<h2>{texts.titre}</h2>
					<div className='paragraphs'>
						{texts.texte.map((item, index) => <p key={index} dangerouslySetInnerHTML={{ __html: item }}/>) }
					</div>
				</div>
			</div>
		</Styled>
	);
}
	
export default Chapitre;