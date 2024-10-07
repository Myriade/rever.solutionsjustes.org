import React from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const SatutFiche = styled.div`
	display: grid;
	justify-items: center;
	
	@keyframes placeholder-animation {
		from { transform: rotate(0deg) }
		to { transform: rotate(360deg) }
	}
	
	img, .placeholder-img {
		width: 200px;
		height: 200px;}
		
	h3 {
		margin-top: 0.5em;}
	
	.placeholder-img {
		display: grid;
		justify-items: center;
		align-items: center;
		img {
			width: 150px;
			height: auto;
			animation-name: placeholder-animation;
			animation-duration: 15s;
			animation-iteration-count: infinite;
			animation-timing-function: linear;
		}
	}
	
	${media.desktopUp`
		grid-template-columns: 1fr 1.5fr;
		justify-items: initial;
		img, .placeholder-img {
			width: 500px;
			height: 500px;}
	`};
	
`;

const StatutImmigrationFiche = ({ ficheData }) => {
	//console.log(ficheData);
	
	let imageSrc = '/logo.jpg';
	if (ficheData.ilustration) {
		imageSrc = convertImageUrl(ficheData.ilustration);
	}
	
	return (
		<SatutFiche>
			{ ficheData.loading ? 
				<div className='placeholder-img'>
					<img src='logo.jpg' />
				</div>
				: 
				<img src={imageSrc} alt="Illustration"/>
			}
			<div>
				<h3>{ficheData.title}</h3>
				<div>{ficheData.texteSimple}</div>
			</div>
		</SatutFiche>
	);
}
	
export default StatutImmigrationFiche;