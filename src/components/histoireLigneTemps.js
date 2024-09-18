import React, { useState } from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const LigneTempsItemLi = styled.li`
	min-width: 100%;
	display: grid;
	gap: 1em;
	color: var(--color-bleu-tres-fonce);
	align-content: start;
	position: relative;
	padding-inline: 5ch;

	p.list__item__texte {
		margin-block: 0;
		max-width: 45ch;}
`;

const HistoireLigneTemps = ({ data }) => {
	
	return (
		<>
			{data.map( (item, index) => {
				return (
					<LigneTempsItemLi className="list__item" key={index}>
						<h3 className='list__item__date'>{item.date}</h3>
						<p className='list__item__texte'>{item.texte}</p>
					</LigneTempsItemLi>
			)})}
		</>
	);
}
	
export default HistoireLigneTemps;