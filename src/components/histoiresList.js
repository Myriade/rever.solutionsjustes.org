import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

//import useWixData from '../utils/useWixData'
import histoiresData from '../data/histoires'
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

const HistoiresList = () => {
	// States
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [screenType, setScreenType] = useState(null);
	
	// Data fetch
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	// Dom references and variables
	const gsapScopeRef = useRef();
	const gsapScopeElem = gsapScopeRef.current;
	const { contextSafe } = useGSAP({ scope: gsapScopeRef });
	
	// GSAP first animation
	const gsapFirstAnimations = contextSafe(() => {
		
		const scrollTriggerObj = {
			trigger: '.histoires',
			scroller: window,
			start: 'top 35%',
		}
		
		// Cache les histoires qui ne sont pas la premiere
		gsap.to( '.histoire:not(:first-child)', {
			autoAlpha: 0,
			duration: 0,
		})
		
		// Active la 1ere carte
		gsap.to( '.histoire-card:first-child .bg-img', { 
			filter: 'grayscale(0%)',
			duration: 0.5,
			scrollTrigger: scrollTriggerObj,
		});
		
		// Désactive le 1er bouton
		gsap.to( '.histoire-card:first-child .button', {
			autoAlpha: 0,
			duration: 0.5,
			scrollTrigger: scrollTriggerObj,
		})
		
		// Active la 1ere histoire
		gsap.to( '.histoire:first-child', {
			autoAlpha: 1,
			duration: 0.5,
			scrollTrigger: scrollTriggerObj,
		})
		
		gsap.from( '.histoire:first-child', {
			xPercent: -20,
			duration: 0.5,
			scrollTrigger: scrollTriggerObj,
		})
	}, { dependencies: [screenType], scope: gsapScopeRef });
	
	// Screen type check and proper animations trigger
	useEffect( () => {
		if (!screenType) {
			if (window.matchMedia('(hover: hover)').matches) {
				console.log('Device has a mouse or touchpad events (firstHoverTouchHandler)');
				setScreenType('mouse');
			} else {
				console.log('Device has no mouse, so has touch events (firstHoverTouchHandler)');
				setScreenType('touch');
			}
			gsapFirstAnimations();
		}
	}, []);
	
	// event handlers
	const histoireSwitchClickHandler = contextSafe( (clickedIndex) => {
		const clickedId = histoiresArray[clickedIndex].idUnique;
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
	
	// Lignes du temps : Slider Glide configs pour défilement mouse drag ou slide touch
	useEffect(() => {
		if (screenType) {
			const histoiresElems = gsapScopeElem.querySelectorAll('.histoire--glide');
			
			// Glide.js initialisation
			histoiresElems.forEach( (item) => {
				const thisGlide = new Glide( item, {
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
	}, [screenType, gsapScopeElem]);

	return (
		<section id='consequences'>
			<Intro className='grid'>
				<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
				<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			</Intro>
			
			<div ref={gsapScopeRef} style={{marginTop: 'calc(var(--v-spacer) / 1.5)'}}>
				<Cards className='cards' >
					{ histoiresArray.map( (cardItem, cardIndex) => { return (
						<div 
							id={`card-${cardItem.idUnique}`}
							className='histoire-card'
							key={cardIndex}
						>
							<div 
								className='bg-img'
								style={{ backgroundImage: `url(/images/${cardItem.fichierImage}.webp)` }} 
								></div>
							<p className='nom'>{cardItem.nom}</p>
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
				
					{ histoiresArray.map( (histoireItem, histoireIndex) => { return (
						<div 
							className='histoire histoire--glide' 
							id={`histoire-${histoireItem.idUnique}`} 
							key={histoireIndex}
						>
							<h3 className='histoire__titre'>L'histoire de {histoireItem.nom}</h3>
							<p className='histoire__resume'>{histoireItem.titre}</p>
							
							<div className='all-controls'>
								<div className='control-arrows' data-glide-el='controls[nav]'>
									<button data-glide-dir="<" title='Précédent'> &#8249; </button>
								</div>
								<div className='glide__bullets points-list' data-glide-el='controls[nav]'>
									{histoiresArray[histoireIndex].ligneTemps.map( (item, index) => { return (
										<button 
											className='glide__bullet list-item' 
											key={index} 
											data-glide-dir={`=${index}`}
											aria-label={`Aller à la fiche ${index + 1}`}
										>
											<div className='point'></div>
										</button>
									)})}
								</div>
								<div className='control-arrows' data-glide-el='controls[nav]'>
									<button data-glide-dir=">" title='Suivant'> &#8250; </button>
								</div>
							</div>
							
							<div className='glide__track' data-glide-el='track'>
								<ul className='glide__slides'>
									<HistoireLigneTemps 
										data={ histoireItem.ligneTemps }
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