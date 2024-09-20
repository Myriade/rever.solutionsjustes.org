import React, { useState } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import donsImpactsData from '../data/dons-impacts'

const Container = styled.div`
	&.index-0 {
		background: var(--color-bleu-clair);}
	&.index-1 {
		background: var(--color-bleu-aqua);}
	&.index-2 {
		background: var(--color-bleu-gris);}

	.tabs {
		background: var(--color-bleu-tres-pale);
		list-style-type: none;
		padding-left: 0;
		margin-block: 0;
		display: flex;
		width: 100%;
		justify-content: stretch;
		
		li.index-0 {
			button {
				background: var(--color-bleu-clair);}
			&:after {
				background: var(--color-bleu-clair);}
			button:after {
				background: var(--color-bleu-aqua);}}
				
		li.index-1 {
			z-index: 2;
			button {
				background: var(--color-bleu-aqua);}
			&:before {
				background: var(--color-bleu-aqua);}
			button:before {
				background: var(--color-bleu-clair);}
			&:after {
				background: var(--color-bleu-aqua);}
			button:after {
				background: var(--color-bleu-gris);}}
		
		li.index-2 {
			button {
				background: var(--color-bleu-gris);}
			&:before {
				background: var(--color-bleu-gris);}
			button:before {
				background: var(--color-bleu-aqua);}}
		
		li:not(:first-child):before,
		li:not(:last-child):after, 
		li:not(:first-child) button:before, 
		li:not(:last-child) button:after {
			content: '';
			position: absolute;
			bottom: 0;}
		
		li { 
			flex-basis: 33.33%;
			position: relative;
			z-index: 1;
			&:before, 
			&:after {
				width: 10px;
				height: 10px;}
			&:before {
				left: -10px;}
			&:after { 
				right: -10px;}}
			
		button { 
			width: 100%;
			border: 0;
			font-size: 1.5rem;
			color: white;
			text-align: center;
			padding: 0.5em 1rem;
			text-decoration: none;
			border-top-left-radius: 15px;
			border-top-right-radius: 15px;
			&::after, 
			&::before {
				width: 20px; 
				height: 20px;
				border-radius: 10px;
				z-index: 2;}
				
			&::before {
				left: -20px;}
				
			&::after {
				right: -20px;}}
		
		li.active {
			z-index: 5;
			
			&::before, 
			&::after {
				z-index: 1;}}}

	.text {
		padding: 1.35rem var(--h-spacer) 0;
		p {
			color: white;
			height: calc(10 * 1.35rem);
			overflow: hidden;
			padding: 0;}}
	
	.cta {
		padding: calc(var(--v-spacer) / 2) var(--h-spacer);
		text-align: center;
		width: 100%;}
`;

const DonsImpactTabs = () => {
	const [activeIndex, setActiveIndex] = useState(0)
	
	const data = donsImpactsData();
	console.log(data);
	
	function clickHandler(e) {
		const clickedDataIndex = e.target.dataset.index;
		setActiveIndex(clickedDataIndex);}

	return (
		<Container className={`index-${activeIndex}`}>
			<div className='tabs'>
				{data.map( (item, index) => { return (
					<li
						key={index} 
						className={index == activeIndex ? `index-${index} active` : `index-${index}`}
					>
						<button
							onClick={clickHandler}
							data-index={index}
						>
							{data[index].montant}
						</button>
					</li>
				)})}
			</div>
			
			<div className='text' >
				<p>{data[activeIndex].impact}</p>
			</div>
			
			<div className='cta'>
				<a 
					className='button centered' 
					href='https://www.canadahelps.org/en/charities/montreal-city-mission/campaign/just-solutions-20th-anniversary-campaign' 
					target='_blank' 
					rel="nofollow"
				>
					Donner
				</a>
			</div>
		</Container>
	);

}

export default DonsImpactTabs;