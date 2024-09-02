import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import useWixData from '../utils/useWixData'
import StatutImmigrationFiche from './statutImmigrationFiche'

import Glide from '@glidejs/glide'

import { media } from '../styles/mixins.js'

const CarrousselContainer = styled.div`
	.glide__slides {
		align-items: stretch;
	}
	.glide__slide {
		padding: 1rem;
		border: 1px solid black;
		border-radius: 4px;
		height: auto;
	}
	.glide__arrow {
		top: 10%;
		color: #3d728d;
		font-size: 3rem;
		background: rgba(255,255,255, 0.75);
		&--left {
			left: 0.5em;
		}
		&--right {
			right: 0.5em;
		}}
`;

const StatutsImmigrationList = () => {
	let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	useEffect(() => {
		new Glide('.glide', {
			type: 'slider',
			bound: true,
			perView: 2,
			peek: { before: 0, after: 150 },
			breakpoints: {
				768: {
					perView: 1,
					peek: { before: 0, after: 0 },
				},
				992: {
					perView: 1,
					peek: { before: 0, after: 75 },
				}
			}
		}).mount()
	})
	
	return (
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
			<div className="glide__arrows" data-glide-el="controls">
				<button className="glide__arrow glide__arrow--left" data-glide-dir="<">&#8249;</button>
				<button className="glide__arrow glide__arrow--right" data-glide-dir=">">&#8250;</button>
			</div>
		</CarrousselContainer>
	)
}
	
export default StatutsImmigrationList