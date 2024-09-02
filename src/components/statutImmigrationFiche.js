import React from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const SatutFiche = styled.div`
	display: grid;
	img {
		width: auto;
		height: 200px;
	}
`;

const StatutImmigrationFiche = ({ ficheData }) => {
	//console.log(ficheData);
	
	let imageSrc = '/logo.jpg';
	if (ficheData.ilustration) {
		imageSrc = convertImageUrl(ficheData.ilustration);
	}
	
	return (
		<SatutFiche>
			<img src={imageSrc} alt="Illustration" />
			<h3>{ficheData.title}</h3>
			<div>{ficheData.texteSimple}</div>
		</SatutFiche>
	);
}
	
export default StatutImmigrationFiche;