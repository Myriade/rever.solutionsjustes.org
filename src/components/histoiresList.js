import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
//import useWixData from '../utils/useWixData'

import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { media } from '../styles/mixins.js'

const Liste = styled.div`
	.histoire-unique {
		&__fiche {
			
		}
		&__ligne-temps-cntnr {
			
		}
	}
`;


const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	
	useEffect(() => {
	})
	
	return (
		<Liste className='histoires-container'>
			{ histoiresArray.map( (item, index) => {
				return (
					<div className='histoire-unique' key={index}>
						<div className='histoire-unique__fiche'>
							<h3>{item.titre}</h3>
						</div>
						<HistoireLigneTemps className='histoire-unique__ligne-temps-cntnr' ligneData={item.ligneTemps}/>
					</div>
				)
			})}
		</Liste>
	)
}
	
export default HistoiresList