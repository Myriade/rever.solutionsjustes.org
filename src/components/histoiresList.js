import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//import useWixData from '../utils/useWixData'

import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { media } from '../styles/mixins.js'

const Liste = styled.div`
	padding-bottom: 20rem;
	.histoire-unique {
		&__fiche {
			display: grid;
			justify-items: center;
			gap: 1rem;
			margin-bottom: 1rem;
			padding-bottom: 1rem;
			img {
				max-width: 150px;}}
		&:not(.active) .ligne-temps {
			display: none;}
		&.active {
			.histoire-unique__fiche {
				border: 2px solid grey;
				border-radius: 5px;}
			.ligne-temps {
				display: grid;}}
	}
	${media.mediumUp`
		display: grid;
		grid-template-columns: 33% 33% 33%;
	`};
	
`;


const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	
	useEffect(() => {
	})
	
	return (
		<Liste className='histoires-container'>
			{ histoiresArray.map( (item, index) => {
				return (
					<div className={index == activeIndex ? `histoire-unique active` : `histoire-unique`} key={index}>
						<div className='histoire-unique__fiche'>
							<h3>{item.titre}</h3>
							<img src='/portrait-placeholder.gif' alt={item.titre}/>
							<button onClick={() => setActiveIndex(index)} >{item.cta}</button>
						</div>
						<HistoireLigneTemps ligneData={item.ligneTemps} active={activeIndex ? true : false} />
					</div>
				)
			})}
		</Liste>
	)
}
	
export default HistoiresList