import React, { useState } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const LigneTempsItemLi = styled.li`
	min-width: 100%;
	display: grid;
	gap: 1em;
	color: navy;
	p {
		margin-block: 0;}
	.list__item__date {
		font-weight: bold;}
		
	.list__item__texte {
		max-width: 75ch;
	}
`;

const HistoireLigneTemps = ({ data }) => {
	
	return (
		<>
			{data.map( (item, index) => {
				return (
					<LigneTempsItemLi className="list__item" key={index}>
						<p className='list__item__date'>{item.date}</p>
						<p className='list__item__texte'>{item.texte}</p>
					</LigneTempsItemLi>
			)})}
		</>
	);
}
	
export default HistoireLigneTemps;