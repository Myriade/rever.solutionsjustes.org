import React, { useState, useEffect } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const Ligne = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fill, minmax(300px, 320px));
	gap: 10px;
	grid-auto-flow: column;
	overflow-x: auto;
	
	${media.mediumUp`
		position: relative;
		width: 90vw;
		z-index: 40;
	`};
	
	.point-temporel {
		width: 300px;
		&__date {
			font-weight: bold;
		}
		&__texte {
			
		}
	}
`;

const HistoireLigneTemps = ({ ligneData }) => {
	const [ligneArray, setLigneArray] = useState(ligneData);
	console.log(ligneArray);
	
	return (
		<Ligne className='ligne-temps'>
			{ligneArray.map( (item, index) => {
				return (
					<div className='point-temporel'>
						<p className='point-temporel__date'>{item.date}</p>
						<p className='point-temporel__texte'>{item.texte}</p>
					</div>
			)})}
		</Ligne>
	);
}
	
export default HistoireLigneTemps;