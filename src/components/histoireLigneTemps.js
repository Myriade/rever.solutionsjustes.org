import React, { useState, useEffect } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const Ligne = styled.div`
	opacity: 0;
	transition: opacity 0.7s ease-in-out;
	margin-top: 2rem;
	z-index: 1;
	
	&.active {
		opacity: 1;
		z-index: 10;}
	
	${media.mediumUp`
		grid-column-start: 1;
		grid-column-end: 4;
		grid-row-start: 2;
		grid-row-end: 3;
	`};
	
	.horizontal-scroll {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 320px));
		gap: 10px;
		grid-auto-flow: column;
		overflow-x: auto;
		border-top: 2px dashed grey;
		margin-top: 0.5rem;
		padding-block: 0.5rem;}
	
	.point-temporel {
		width: 300px;
		&__date {
			font-weight: bold;
		}
		&__texte {
			
		}
	}
`;

const HistoireLigneTemps = ({ ligneData, active, prenom }) => {
	const [ligneArray, setLigneArray] = useState(ligneData);
	
	return (
		<Ligne className={ active ? `ligne-temps active` : `ligne-temps`} >
			<p className='label'>L'histoire de {prenom}</p>
			<div className='horizontal-scroll'>
				{ligneArray.map( (item, index) => {
					return (
						<div className='point-temporel' key={index}>
							<p className='point-temporel__date'>{item.date}</p>
							<p className='point-temporel__texte'>{item.texte}</p>
						</div>
				)})}
			</div>
		</Ligne>
	);
}
	
export default HistoireLigneTemps;