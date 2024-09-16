import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useWixData from '../utils/useWixData'
import StatutImmigrationFiche from './statutImmigrationFiche'

import Glide from '@glidejs/glide'

import { media } from '../styles/mixins.js'

const CarrousselContainer = styled.div`
	margin-top: var(--v-spacer);
	.glide__slides {
		align-items: stretch;
	}
	.glide__slide {
		padding: var(--v-spacer);
		background: white;
		border-radius: 30px;
		height: auto;
	}
	.glide__arrow {
		top: 40%;
		color: var(--color-bleu-tres-fonce);
		font-size: 3rem;
		background: rgba(255,255,255, 0.75);
		border: none;
		&--left {
			left: 0.5em;
		}
		&--right {
			right: 0.5em;
		}}
`;

const BulletsControls = styled.div`
	display: grid;
	justify-items: center;
	padding-top: var(--v-spacer);
	position: relative;
	
	.glide__bullets {
		position: initial;
	}
	
	.glide__bullet {
		width: 15px;
		height: 15px;
		box-shadow: none;
		&--active, &:focus {
			background: black;
			border-color: black;
		}
	}
`;

const StatutsImmigrationList = () => {
	let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	useEffect(() => {
		new Glide('.glide', {
			type: 'slider',
			bound: true,
			perView: 1,
			peek: { before: 0, after: 175 },
			breakpoints: {
				768: {
					perView: 1,
					peek: { before: 0, after: 0 },
				},
				992: {
					perView: 1,
					peek: { before: 0, after: 100 },
				}
			}
		}).mount()
	})
	
	return (
		<>
			<CarrousselContainer className='carroussel-container glide'>
				<div className='glide__track' data-glide-el="track">
					<div className='glide__slides'>
						{ content.map( (item, index) => {
							return (
								<div className='carroussel-item glide__slide' key={index}>
									<StatutImmigrationFiche ficheData={item.data} />
								</div>
							)
						})}
					</div>
				</div>
				{/* <div className="glide__arrows" data-glide-el="controls">
					<button className="glide__arrow glide__arrow--left" data-glide-dir="<">&#8249;</button>
					<button className="glide__arrow glide__arrow--right" data-glide-dir=">">&#8250;</button>
				</div> */}
				<BulletsControls>
					<div class="glide__bullets" data-glide-el="controls[nav]">
						{ content.map( (item, index) => {
							return (
								<button class="glide__bullet" data-glide-dir={`=${index}`}></button>
							)
						})}
					</div>
				</BulletsControls>
			</CarrousselContainer>
		</>
	)
}
	
export default StatutsImmigrationList