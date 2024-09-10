import React, { useState } from 'react'
import styled from 'styled-components'
//import useWixData from '../utils/useWixData'

import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { media } from '../styles/mixins.js'

const Liste = styled.div`
	padding-block: 5vh 2vh;
	
	.histoire-unique {
		&__fiche {
			display: grid;
			justify-items: center;
			gap: 1rem;
			margin-bottom: 1rem;
			padding-block: 1rem;
			img {
				max-width: 150px;}
			button {
				transition: opacity 0.4s ease-in-out;
				&.hidden {
				opacity: 0;	}}}
			
		&.active {
			.histoire-unique__fiche {
				background: rgb(230, 230, 230);
				border-radius: 20px;}}
		h3 {
			font-family: sans-serif;
			margin-block: 0 0.5em;
			max-width: 30ch;
			font-weight: normal;}}
			
	${media.mediumUp`
		display: grid;
		grid-template-columns: 33% 33% 33%;
		grid-template-rows: 1fr 1fr;
	`};
`;

const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	
	return (
		<Liste className='histoires-container'>
			{ histoiresArray.map( (item, index) => {
				return (
					<React.Fragment key={index}>
						<div className={index === activeIndex ? `histoire-unique active` : `histoire-unique`}>
							<div className='histoire-unique__fiche'>
								<div className='text-centered'>
									<p className='label'>{item.nom}</p>
									<h3>{item.titre}</h3>
								</div>
								<img src='/portrait-placeholder.gif' alt={item.titre}/>
								<button 
									onClick={() => setActiveIndex(index)} 
									className={ index === activeIndex ? `hidden` : `` } 
								>
									Lire son histoire
								</button>
							</div>
						</div>
						
						<HistoireLigneTemps 
							ligneData={item.ligneTemps} 
							prenom={item.nom} 
							active={activeIndex === index ? true : false} 
						/>
					</React.Fragment>
				)
			})}
		</Liste>
	)
}
	
export default HistoiresList