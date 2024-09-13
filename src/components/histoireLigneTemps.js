import React, { useState, useEffect, forwardRef } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const LigneTemps = styled.div`
	opacity: 0;
	transition: opacity 0.7s ease-in-out;
	margin-top: 2rem;
	z-index: 1;
	
	&.active {
		opacity: 1;
		z-index: 10;}
		
	.ligne-temps__scrolljack {
		overflow-x: hidden;}
	
	${media.mediumUp`
		grid-column-start: 1;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	`};
	
	.time-list {
		background-color: lavender;
		height: 100%;
		display: flex;
		flex-wrap: nowrap;}
		
	.time-list__item {
		min-width: 80%;
		display: grid;
		background : pink;
		border: 1px solid navy;
		color: navy;
		padding: 1rem;
		margin: 1rem;
		&__date {
			font-weight: bold;
		}
		&__texte {
			
		}}
`;

const HistoireLigneTemps = forwardRef( function HistoireLigneTemps(props, ref) {
	const { ligneData, active, prenom } = props;
	const [ligneArray, setLigneArray] = useState(ligneData);
	
	return (
		<LigneTemps 
			className={ active ? `ligne-temps active` : `ligne-temps`} 
			ref={ active ? ref : null }
		>
			<p className='label'>L'histoire de {prenom}</p>
			<div className='ligne-temps__scrolljack'>
				<ul className="time-list">
					{ligneArray.map( (item, index) => {
						return (
							<li className="time-list__item" key={index}>
								<p className='time-list__item__date'>{index + 1}. {item.date}</p>
								<p className='time-list__item__texte'>{item.texte}</p>
							</li>
					)})}
				</ul>
			</div>
		</LigneTemps>
	);
})
	
export default HistoireLigneTemps;