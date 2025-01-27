import React, { useEffect } from 'react'
import styled from 'styled-components'
import useWixData from '../utils/useWixData'
import StatutImmigrationFiche from './statutImmigrationFiche'

import Glide from '@glidejs/glide'

import { media } from '../styles/mixins.js'

const CarrousselContainer = styled.div`
	margin-top: var(--v-spacer);
	
	.glide__slides {
		align-items: stretch;}
	
	.glide__slide {
		padding: calc( var(--v-spacer) / 2 );
		background: white;
		border-radius: var(--border-radius);
		height: auto;}
		
	${media.mediumUp`
		.glide__track {
			&::after {
				content: '';
				display: block;
				z-index: 25;
				width: 7vw;
				position: absolute;
				top: 0;
				bottom: 0;
				background-image: linear-gradient(to left, var(--color-bleu-tres-pale) , rgba(255,255,255,0));
				right: 0;}}
		.glide__slide {
			padding: var(--v-spacer);}
	`};
`;

const BulletsControls = styled.div`
	display: grid;
	justify-items: center;
	padding-top: calc(var(--v-spacer) / 2);	
	position: relative;
	
	.glide__bullets {
		transform: unset;
		position: initial;}

	.glide__bullet {
		width: 15px;
		height: 15px;
		box-shadow: none;
		&--active, &:focus {
			background: black;
			border-color: black;}}
`;

const placeholderData = {
	'data': {
		'texteSimple': '...',
		'title': 'Chargement',
		'loading' : true
	},
	'_id': 'placeholder',
}

const StatutsImmigrationList = () => {
	let content = useWixData(
		'Import691', 
		'_manualSort_a4b23ee5-c1a8-41bc-a4e2-0ff853a347ec',
		placeholderData
	);
	
	useEffect(() => {
		const statutsGlide = new Glide('.glide', {
			type: 'slider',
			perView: 1.2,
			gap: 20,
			bound: true,
			swipeThreshold: 50,
			rewind: false,
			breakpoints: {
				768: {
					perView: 1,
				},
			}
		}).mount()
	}, [content]);
	
	return (
		<>
			<CarrousselContainer className='carroussel-container glide'>
				<div className='glide__track' data-glide-el="track">
					<div className='glide__slides'>
						{ content.map( (item, index) => {
							return (
								<div className='carroussel-item glide__slide' key={`fiche-${index}`}>
									<StatutImmigrationFiche ficheData={item.data} />
								</div>
							)
						})}
					</div>
				</div>
				<BulletsControls>
					<div className="glide__bullets" data-glide-el="controls[nav]">
						{ content.map( (item, index) => {
							return (
								<button 
									className='glide__bullet' 
									key={`point-${index}`}
									data-glide-dir={`=${index}`} 
									aria-label={`Aller à la fiche ${index + 1}`}
								></button>
							)
						})}
					</div>
				</BulletsControls>
			</CarrousselContainer>
		</>
	)
}
	
export default StatutsImmigrationList