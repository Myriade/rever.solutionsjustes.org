import React from 'react'
import useWixData from '../utils/useWixData'
import StatutImmigrationFiche from './statutImmigrationFiche'

import styled from 'styled-components'

const CarrousselContainer = styled.div`
	display: flex;
	flex-wrap: wrap;
	gap: 1rem;
	overflow: hidden
`;

const StatutsImmigrationList = () => {
	let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	return (
		<CarrousselContainer className='carroussel-container'>
			{ content.map( (item, index) => {
				return (
					<div className='carroussel-item' key={index}>
						<StatutImmigrationFiche ficheData={item.data} />
					</div>
				)
			})}
		</CarrousselContainer>
	)
}
	
export default StatutsImmigrationList