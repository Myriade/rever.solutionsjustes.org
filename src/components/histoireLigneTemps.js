import React, { useState, useEffect } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const Ligne = styled.div`
	.point-temporel {
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
		<Ligne>
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