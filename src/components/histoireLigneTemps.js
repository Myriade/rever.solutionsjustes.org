import React from 'react';
import styled from 'styled-components'

const LigneTempsItemLi = styled.li`
	display: grid;
	gap: 1vh;
	color: var(--color-bleu-tres-fonce);
	align-content: start;
	
	h3 {
		margin-bottom: 1rem;}

	p {
		margin-block: 0;
		max-width: 45ch;}
`;

const HistoireLigneTemps = ({ data }) => {
	//console.log('ligne data = ', data);
	
	return (
		<>
			{data.map( (item, index) => {
				return (
					<LigneTempsItemLi className='glide__slide' key={index}>
						
					</LigneTempsItemLi>
			)})}
		</>
	);
}
	
export default HistoireLigneTemps;