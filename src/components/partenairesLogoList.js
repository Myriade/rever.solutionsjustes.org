import React from 'react'
import styled from 'styled-components'
import useWixData from '../utils/useWixData'
import { convertImageUrl } from '../utils/utils'

import { media } from '../styles/mixins.js'

const SectionPartenaires = styled.section`
	background: var(--color-bleu-tres-fonce);
	color: white;
	padding-bottom: calc(var(--v-spacer) / 2) !important;
	
	h2 {
		margin-bottom: 0;}
	
	.partenaires {
		align-items: center;
		justify-items: center;
		gap: 0 5vw;
		grid-template-columns: repeat(2, 1fr);}
		
	a {
		display: grid;
		align-items: center;
		justify-items: center;
		border: 2px solid transparent;
		border-radius: var(--border-radius);
		padding: 0 5vw;
		transition: all 0.2s ease-in-out;
		&:hover {
			border-color: var(--color-bleu-tres-pale);
		}}
		
	img {
		display: block;
		max-width: 100%;
		height: auto;}
	
	${media.mediumUp`
		.partenaires {
			grid-template-columns: repeat(3, 1fr);}
	`}
	
`;

const PartenairesLogoList = () => {
	
	const placeholderData = {
		data: {
			logoFichierPng: '/static/logo.jpg',
			title: 'Chargement ...',
			lienVersLeSiteWeb: ''
		}
	}
	
	let content = useWixData(
		'PageRever-Logosdespartenaires', 
		'_manualSort_a321057f-bb59-400f-b0ce-bc8ca9cbb0a1',
		placeholderData
	);
	
	const partenaireArray = content;
	
	return (
		<SectionPartenaires id='plus-loin'>
			<h2>Pour aller plus loin</h2>
			<div className='partenaires grid'>
				{partenaireArray.map( (partenaire, pindex) => { 
					
					let imageSrc = '/logo.jpg';
					if (partenaire.data.logoFichierPng) { imageSrc = convertImageUrl(partenaire.data.logoFichierPng) }
					
					return (
						<a 
							key={pindex}
							href={partenaire.data.lienVersLeSiteWeb} 
							target='_blank'
							title={partenaire.data.title} 
							rel='noreferrer'
						>
							<img 
								src={imageSrc}
								placeholder='dominantColor'
								alt={partenaire.data.title} 
							/>
						</a>
					)
				})}
			</div>
		</SectionPartenaires>
	)
}
	
export default PartenairesLogoList