import React, { useState, useEffect } from 'react';
import { convertImageUrl } from '../utils/utils'

import styled from 'styled-components'

const SatutFiche = styled.div`
	width: 455px;
	padding: 1rem;
	border: 1px solid black;
	border-radius: 4px;
	img {
		width: auto;
		height: 200px;
	}
`;

const StatutImmigrationFiche = ({ ficheData }) => {
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