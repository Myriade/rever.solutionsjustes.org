import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

import useWixData from '../utils/useWixData'
import histoiresImgData from '../data/histoires-img-data'
import HistoireLigneTemps from './histoireLigneTemps'

import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react';
import Glide from '@glidejs/glide'

const Intro = styled.div`
	gap: var(--v-h2-spacer);
	
	h2, p {
		margin-block: 0;}
	
	${media.mediumUp`
		grid-template-columns: 1fr 1fr;
	`}
`;

const Cards = styled.div`
	padding-block: 2vh;
	display: grid;
	grid-template-columns: 1fr;
	gap: 1rem;
	justify-content: space-around;
	
	.histoire-card {
		display: grid;
		gap: 1rem;
		justify-content: center;
		align-content: space-between;
		border-radius: var(--border-radius);
		padding-block: 1rem;
		position: relative;
		overflow: hidden;
		.bg-img {
			background-size: cover;
			background-position: center 35%;
			position: absolute;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: -1;
			filter: grayscale(100%);}
		.nom {
			color: white;
			font-weight: 600;
			text-align: center;
			font-size: 2rem;
			margin-block: 0;}
		.button {
			left: 0;
			opacity: 1;
			&.hidden {
				opacity: 0;}}
		}
			
	${media.mediumUp`
		grid-template-columns: repeat(3, 1fr);
		grid-template-rows: clamp(80px, 30vw, 440px);
		.histoire-card {
			grid-row-start: 1;
			grid-row-end: 2;}
	`};
`;

const Histoire = styled.div`
	display: grid;
	margin-top: calc(var(--v-spacer) / 2);
	overflow: visible;

	.histoire {
		grid-area: 1 / 1 / 2 / 2;
		visibility: hidden;
		margin-top: 1vh;
		
		&.glide--swipeable:hover {
			cursor: initial;
		}
		
		&__titre {
			margin-bottom: 0.5em;}
		&__resume {
			margin-top: 0.5em;}}
			
	.glide__track {
		max-width: 85vw;
		&:hover {
			cursor: grab;}}
			
	.all-controls {
		display: grid;
		grid-template-columns: auto 1fr auto;
		gap: 1rem;
		align-items: center;
		margin-bottom: 5vh;}
		
	.glide__bullets.points-list {
		display: flex;
		justify-content: stretch;
		margin-bottom: 1.25rem;
		position: unset;
		transform: unset;
		border-bottom: 3px solid var(--color-bleu-tres-fonce);
		
		button.list-item {
			display: block;
			border: 0;
			border-radius: 0;
			background-color: transparent;
			box-shadow: none;
			margin: 0;
			height: 1.5rem;
			flex-grow: 1;
			position: relative;
			top: 0.75rem;
			padding-inline: 3vw;
			
			&.glide__bullet--active {
				.point {
					background: var(--color-bleu-tres-fonce);}
				&:hover {
					cursor: unset;}}
			
			&:hover:not(.glide__bullet--active) .point {
				background-color: var(--color-bleu-clair); 
				border-color: var(--color-bleu-clair);}
				
			&:first-child {
				padding-inline: 0 3vw;}
			&:last-child {
				padding-inline: 3vw 1.5rem;
				flex-grow: initial;}}
				
		.point {
			background: white;
			border: 3px solid var(--color-bleu-tres-fonce);
			border-radius: 50%;
			width: 1.5rem;
			height: 1.5rem;}}
			
	.control-arrows {
		button {
			color: var(--color-bleu-tres-fonce);
			border-radius: 4px;
			background: white;
			border: 0;
			padding: 0 0.25rem;
			font-size: 2.5rem;
			line-height: 0.75;
			font-family: sans;
			&:hover {
				cursor: pointer;
				background-color: var(--color-bleu-tres-fonce);
				color: white;}}}
			
	${media.mediumUp`
		.glide__track {
			position: relative;
			right: 5ch;
			max-width: 65ch;
			&::before, &::after {
				content: '';
				z-index: 25;
				width: 5ch;
				position: absolute;
				top: 0;
				bottom: 0;}
			&::before {
				background-image: linear-gradient(to right, rgba(255,255,255,1) , rgba(255,255,255,0));}
			&::after {
				background-image: linear-gradient(to left, rgba(255,255,255,1) , rgba(255,255,255,0));
				right: 0;}
			&:hover {
				&::before, &::after {
					cursor: initial;}}}
		
		.glide__slides {
			position: relative;
			left: 5ch;}
	`}
`;

gsap.registerPlugin(useGSAP, ScrollTrigger);

// Loading placeholder data
const placeholderPersonne = {
	'data': {
		'idUnique': 'placeholder',
		'title': '...',
		'titre': '(chargement)',
	},
	'_id': 'placeholdercard',
}

const placeholderLigneTemps = [
	[
		{
			date: '...',
			texte: 'chargement'
		}, 
	]
]

// Function to create array of target associated data grouped by associated Id
const transformData = ( (inputArray, targetArray, associatedId) => {
		
		let associatedInputItems = [];
		
		targetArray.forEach( (personne, pIndex) => {
			associatedInputItems = inputArray.filter( ligneTempsItem => ligneTempsItem.data.histoireAssocie === associatedId);
		});
		
		//console.log('associatedInputItems = ', associatedInputItems);
		
		const purifiedInputItems = associatedInputItems.map( item => {
			return {'date': item.data.title, 'texte': item.data.texte}
		});
		//console.log('purifiedInputItems = ', purifiedInputItems);
		
		return purifiedInputItems;
		
});

const HistoiresList = () => {
	// State
	const [contentPersonnes, setContentPersonnes] = useState([placeholderPersonne]);
	const [contentLignesTemps, setContentLignesTemps] = useState([placeholderLigneTemps]);
	const [isDataReady, setIsDataReady] = useState(false);
	const [screenType, setScreenType] = useState(null);
	
	// Dom references and variables
	const gsapScopeRef = useRef();
	const gsapScopeElem = gsapScopeRef.current;
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	// Data fetch
	const histoiresImgArray = histoiresImgData(); // Temp hardcoded 
	const wixPersonnesData = useWixData(
		'PageRever-Histoireconsequence', 
		'_manualSort_adbe7ddc-ef0d-4bb5-94b7-deac5047fa94',
		placeholderPersonne
	);
	useEffect(() => {
		if (wixPersonnesData) {
			setContentPersonnes(wixPersonnesData);
			//console.log('wixPersonnesData = ', wixPersonnesData);
		}
	}, [wixPersonnesData]);
	
	const wixLigneTempsData = useWixData(
		'PageReverLignesdutemps', 
		'_manualSort_660ea147-5f5d-41b4-a4a9-61a8ef2634e5',
		placeholderLigneTemps
	);
	
	// Data concatenation from 2 Wix data collections
	useEffect(() => {
		//console.log('contentLignesTemps = ', contentLignesTemps);
		if (wixLigneTempsData.length > 1 && contentPersonnes.length > 1 ) {
				
			contentPersonnes.forEach( (personne, i) => {
				
				const transformedData = transformData(wixLigneTempsData, wixPersonnesData, personne._id);
				//console.log('transformedData ', personne.data.idUnique, ', = ', transformedData);
				setContentLignesTemps(prevState => {
					const newState = [...prevState];
					newState[i] = { ...newState[i], transformedData };
					return newState;
				});
				setIsDataReady(true);
				
			});
			
			//console.log('contentLignesTemps = ', contentLignesTemps);
			
		}
	}, [wixLigneTempsData, wixPersonnesData, contentPersonnes]);
		
	// Screen type check
	useEffect( () => {
		if (!screenType) {
			if (window.matchMedia('(hover: hover)').matches) {
				console.log('Device has a mouse or touchpad events');
				setScreenType('mouse');
			} else {
				console.log('Device has no mouse, so has touch events');
				setScreenType('touch');
			}
		}
	}, []);
	
	// GSAP First animations
	const gsapFirstAnimations = contextSafe(() => {
		
		const scrollTriggerObj = (stId) => { return {
			id: stId,
			trigger: '.histoires',
			scroller: window,
			start: 'top 60%',
			//markers: true,
		}}
		
		// Cache les histoires qui ne sont pas la premiere
		if (contentPersonnes.lenght > 1 ) {
			gsap.to( '.histoire:not(:first-child)', {
				autoAlpha: 0,
				duration: 0,
			})
		}
		
		// Active la 1ere carte
		gsap.to( '.histoire-card:first-child .bg-img', { 
			filter: 'grayscale(0%)',
			duration: 0.5,
			scrollTrigger: scrollTriggerObj(1),
		});
		
		// Désactive le 1er bouton
		gsap.to( '.histoire-card:first-child .button', {
			autoAlpha: 0,
			duration: 0.5,
			scrollTrigger: scrollTriggerObj(2),
		})
		
		// Active la 1ere histoire
		gsap.from( '.histoire:first-child', {
			autoAlpha: 0,
			xPercent: -20,
			duration: 0.5,
			scrollTrigger: scrollTriggerObj(3),
		})
		
	}, { dependencies: [screenType, contentPersonnes], scope: gsapScopeRef });
	
	useEffect( () => {
		if ( screenType ) {
			gsapFirstAnimations()
		}
	}, [screenType]);
		
	// Slider Glide configs
	useEffect(() => {
		if (screenType && isDataReady) {
			const histoiresElems = gsapScopeElem.querySelectorAll('.histoire--glide');
			
			// Glide.js initialisation
			histoiresElems.forEach( (item) => {
				const histoiresGlide = new Glide( item, {
					type: 'slider',
					perView: 1.25,
					gap: 50,
					bound: true,
					swipeThreshold: 50,
					rewind: false,
					breakpoints: {
						768: {
							perView: 1,
						},
					}
				}).mount() 
			});
		}
	}, [screenType, isDataReady, gsapScopeElem]);

	// event handlers
	const histoireSwitchClickHandler = contextSafe( (clickedIndex) => {
		const clickedId = contentPersonnes[clickedIndex].data.idUnique;
		const activeCard = gsapScopeElem.querySelector(`#card-${clickedId}`);
		const nonActiveCardsImg = gsap.utils.toArray(`.histoire-card:not(#card-${clickedId}) .bg-img`);
		const nonActiveCardsBtn = gsap.utils.toArray(`.histoire-card:not(#card-${clickedId}) .button`);
		
		let histoireSwitchTl = gsap.timeline();
		
		// La carte active se colore
		histoireSwitchTl.to( activeCard.querySelector(`.bg-img`), {
			filter: 'grayscale(0%)',
			duration: 0.5
		})
		
		// Les cartes inactives se décolorent
		histoireSwitchTl.to( nonActiveCardsImg, {
			filter: 'grayscale(100%)',
			duration: 0.5
		}, '<')
		
		// Le bouton de la carte active disparait
		histoireSwitchTl.to( activeCard.querySelector(`.button`), {
			autoAlpha: 0,
			duration: 0.5
		},'<')
		
		// Le bouton des cartes inactives apparaissent
		histoireSwitchTl.to( nonActiveCardsBtn, {
			autoAlpha: 1,
			duration: 0.5
		},'<')
		
		// Toutes les histoires disparaissent à droite
		histoireSwitchTl.to( gsapScopeElem.querySelectorAll('.histoire') , {
			autoAlpha: 0,
			xPercent: 20,
			duration: 0.5,
			delay: 0.25
		},'<');
		
		// L'histoire active apparaît de la droite
		histoireSwitchTl.to( gsapScopeElem.querySelector(`#histoire-${clickedId}`) , {
			autoAlpha: 1,
			xPercent: 0,
			duration: 0.5
		});
	})

	return (
		<section id='consequences'>
			<Intro className='grid'>
				<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
				<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			</Intro>
			
			<div ref={gsapScopeRef} style={{marginTop: 'calc(var(--v-spacer) / 1.5)'}}>
				<Cards className='cards' >
					{ contentPersonnes.map( (cardItem, cardIndex) => { return (
						<div 
							id={`card-${cardItem.data.idUnique}`}
							className='histoire-card'
							key={cardIndex}
						>
							<div 
								className='bg-img'
								style={{ backgroundImage: `url(/images/${histoiresImgArray[cardIndex].fichierImage}.webp)` }} 
								></div>
							<p className='nom'>{cardItem.data.title}</p>
							<button
								onClick={() => histoireSwitchClickHandler(cardIndex)} 
								className='button' 
							>
								Lire son histoire
							</button>
						</div>
					)})}
				</Cards>
				
				<Histoire className='histoires'>
				
					{ contentPersonnes.map( (histoireItem, histoireIndex) => { return (
						<div 
							className='histoire histoire--glide' 
							id={`histoire-${histoireItem.data.idUnique}`} 
							key={histoireIndex}
						>
							<h3 className='histoire__titre'>L'histoire de {histoireItem.data.title}</h3>
							<p className='histoire__resume'>{histoireItem.data.titre}</p>
							
							<div className='all-controls'>
								<div className='control-arrows' data-glide-el='controls[nav]'>
									<button data-glide-dir="<" title='Précédent'> &#8249; </button>
								</div>
								<div className='glide__bullets points-list' data-glide-el='controls[nav]'>
									
									{ isDataReady === true ? contentLignesTemps[histoireIndex].transformedData.map( (item, index) => { return (
										<button 
											className='glide__bullet list-item' 
											key={index} 
											data-glide-dir={`=${index}`}
											aria-label={`Aller à la fiche ${index + 1}`}
										>
											<div className='point'></div>
										</button>
									)}) : '...'}
									
								</div>
								<div className='control-arrows' data-glide-el='controls[nav]'>
									<button data-glide-dir=">" title='Suivant'> &#8250; </button>
								</div>
							</div>
							
							<div className='glide__track' data-glide-el='track'>
								<ul className='glide__slides'>
									
									<HistoireLigneTemps 
										data={ isDataReady === true ? contentLignesTemps[histoireIndex].transformedData : null }
									/>
									
								</ul>
							</div>
						</div>
					)})}
					
				</Histoire>
			</div>
		</section>	
	)
}
	
export default HistoiresList