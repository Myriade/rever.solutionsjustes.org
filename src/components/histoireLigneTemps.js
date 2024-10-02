import React from 'react';
import styled from 'styled-components'

const LigneTempsItemLi = styled.li`
	display: grid;
	gap: 1vh;
	color: var(--color-bleu-tres-fonce);
	align-content: start;

	p {
		margin-block: 0;
		max-width: 45ch;}
`;

const HistoireLigneTemps = ({ data }) => {
	
	return (
		<>
			{data.map( (item, index) => {
				return (
					<LigneTempsItemLi className='glide__slide' key={index}>
						<h3>{item.date}</h3>
						<p>{item.texte}</p>
					</LigneTempsItemLi>
			)})}
		</>
	);
}
	
export default HistoireLigneTemps;