import React, {useState, useEffect, useRef} from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';

const Styled = styled.div`
	max-width: 100% !important;
		background: #b5bca2;
		padding: 2rem;
		border-radius: 3rem;
		
	.gatsby-image-wrapper {}
	
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
		
	&.color2 {
		background: #729b76;}
		
	&.color3 {
		background: #295534;
		h2, p {
			color: white;}}
			
	&.color4 {
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

gsap.registerPlugin(useGSAP);

const Chapitre = ({ id, lang, imgFile, texts, color, model }) => {
	
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
	
	return (
		<Styled 
			className={`chapitre ${color}`} 
			id={id}
		>				
			{imageData && 
				<GatsbyImage
					image={imageData} 
					alt={id} 
				/>
			}
			<div className='text'>
				<h2>{texts.titre}</h2>
				{texts.texte.map((item, index) => <p key={index}>{item}</p>)}
			</div>
		</Styled>
	);
}
	
export default Chapitre;