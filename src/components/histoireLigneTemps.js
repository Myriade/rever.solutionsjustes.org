import React from 'react';
import styled from 'styled-components'

const LigneTempsItemLi = styled.li`
	display: grid;
	gap: 1vh;
	color: var(--color-bleu-tres-fonce);
	align-content: start;
	position: relative;
	
	&.list__item {
		min-width: 100%;
		padding-inline: 5ch;}

	p.list__item__texte {
		margin-block: 0;
		max-width: 45ch;}
`;

const HistoireLigneTemps = ({ data, screenType }) => {
	
	return (
		<>
			{data.map( (item, index) => {
				return (
					<LigneTempsItemLi 
						className={ screenType === 'mouse' ? 'list__item' : 'glide__slide' }  
						key={index}
					>
						<h3 className='list__item__date'>{item.date}</h3>
						<p className='list__item__texte'>{item.texte}</p>
					</LigneTempsItemLi>
			)})}
		</>
	);
}
	
export default HistoireLigneTemps;