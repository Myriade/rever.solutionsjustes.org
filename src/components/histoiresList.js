import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

//import useWixData from '../utils/useWixData'
import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
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
			filter: saturate(0);}
		.nom {
			color: white;
			font-weight: bold;
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
		grid-template-columns: repeat(3, 340px);
		grid-template-rows: clamp(80px, 30vh, 340px);
		.histoire-card {
			grid-row-start: 1;
			grid-row-end: 2;}
	`};
`;

const Histoire = styled.div`
	display: grid;
	overflow: hidden;

	.histoire {
		grid-area: 1 / 1 / 2 / 2;
		visibility: hidden;
		margin-top: 1vh;}
	
	.histoire-gsap {
		max-width: 65ch;
		overflow: hidden;
		position: relative;
		right: 5ch;
		&::before, &::after {
			content: '';
			display: block;
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
		&__anime {
			margin-top: 0;
			display: flex;
			flex-wrap: nowrap;
			padding-left: 0;}}
			
	.points-list {
		display: flex;
		justify-content: stretch;
		margin-block: 1vh 3vh;
		.item {
			flex-grow: 1;
			position: relative;
			padding-inline: 3vw;
			border-bottom: 3px solid var(--color-bleu-tres-fonce);
			&:first-child {
				padding-inline: 0 3vw;}
			&:last-child {
				padding-inline: 3vw 0;
				flex-grow: initial;}
			&.active .point {
				background: var(--color-bleu-tres-fonce);}}
				
		.point {
			position: relative;
			top: 1.5vh;
			background: white;
			border: 3px solid var(--color-bleu-tres-fonce);
			border-radius: 50%;
			width: 3vh;
			height: 3vh;}}
`;

gsap.registerPlugin(useGSAP);

const HistoiresList = () => {
	// States
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isScrollReady, setIsScrollReady ] = useState(null);
	const [hasNewData, setHasNewData] = useState(null);
	const [screenType, setScreenType] = useState(null);
	
	// Data fetch
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	// Dom references and variables
	const interactiveContentRef = useRef();
	const interactiveContentElem = interactiveContentRef.current;
	const gsapAnime = useRef();
	const gsapAnimeElem = gsapAnime.current;
	const pointsListRef = useRef();
	const pointsListElem = pointsListRef.current;
	const glideInstance = useRef(null);
	
	const { contextSafe } = useGSAP({ scope: interactiveContentRef });
	
	// event handlers
	function firstHoverTouchHandler() {
		// Detect computer mouse or touch screen 
		if (!screenType) {
			if (window.matchMedia('(hover: hover)').matches) {
				console.log('Device has a mouse or touchpad events');
				setScreenType('mouse');
				gsapAnimations();
			} else {
				console.log('Device has no mouse, so has touch events');
				setScreenType('touch');
			}
		}
	}
	
	const histoireSwitchClickHandler = contextSafe( (clickedIndex) => {
		const clickedId = histoiresArray[clickedIndex].idUnique;
		setActiveIndex(clickedIndex);
		
		let histoireSwitchTl = gsap.timeline();
		
		// Toutes les histoires disparaissent à droite
		histoireSwitchTl.to( interactiveContentElem.querySelectorAll('.histoire') , {
			autoAlpha: 0,
			xPercent: 20,
			duration: 0.5
		});
		
		/// À faire! !!
		histoireSwitchTl.to( interactiveContentElem.querySelector(`.histoire-card active`), {
			filter: 'saturate(1)',
			duration: 0.5
		})
		
		// L'histoire active apparaît de la droite
		histoireSwitchTl.to( interactiveContentElem.querySelector(`#histoire-${clickedId}`) , {
			autoAlpha: 1,
			xPercent: 0,
			duration: 0.5
		});
	
	})
	
	// mettre une classe active sur le point correspondant dans la ligne au scroll
	const setActivePoint = (origin, progress, ligneTempsArrayLength) => {
		let rangActuel = 0;
		if (origin === 'gsap' && ligneTempsArrayLength) { // GSAP pour desktop 
			// const progressPercent = Math.round(progress*100);
			// rangActuel = Math.round(((ligneTempsArrayLength - 1) * progressPercent) / 100);
		} else if (glideInstance.current) { // touch screen seulement, glide.js
			rangActuel = glideInstance.current.index;
			//console.log('setactivepoint origin = glide, index = ', rangActuel);
		}
		
		pointsListElem.childNodes[rangActuel].classList.toggle('active');
		pointsListElem.childNodes.forEach( (item, index) => {
			if (index !== rangActuel) {
				item.classList.remove('active');
			}
		});
	}

	// Desktop seulement: GSAP configs, ligne du temps défilement horizontal déclanché par clics
	
	const gsapAnimations = contextSafe(() => {
		if (screenType === 'mouse') {
			// initialiser un PIN et un Scroll si le dom est pret et s'il n'y a pas deja d'instance GSAP
			if (isScrollReady) {
				const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
				const timelineWidth = gsapAnimeElem.scrollWidth;
				
				console.log('isScrollReady and is not touch');
				
			}
		}
	}, { dependencies: [isScrollReady, screenType, hasNewData], scope: interactiveContentRef });
	
	// Écrans Touch seulement : Slider Glide configs pour défilement ligne du temps en slide touch
	useEffect(() => {
		if (screenType === 'touch') {
			
			// rendre le premier point témoin actif
			pointsListElem.childNodes[0].classList.toggle('active');
			
			// premiere initialisation
			if(isScrollReady && !glideInstance.current && hasNewData === null) {
				glideInstance.current =  new Glide('.histoire-glide', {
					type: 'slider',
					perView: 1,
					gap: 10,
				}).on('run', setActivePoint).mount() 
			}
			
			// Lorsque l'histoire change, refaire une nouvelle instance de glide.
			if (isScrollReady && glideInstance.current && hasNewData) {
				glideInstance.current.destroy();
				glideInstance.current = new Glide('.histoire-glide', {
					type: 'slider',
					perView: 1,
					gap: 10,
				}).on('run', setActivePoint).mount();
				setHasNewData(false);
			}
		}
	}, [screenType, isScrollReady, hasNewData]);

	return (
		<section 
			id='consequences' 
			onMouseEnter={firstHoverTouchHandler} 
			onTouchStart={firstHoverTouchHandler}
		>
			<Intro className='grid'>
				<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
				<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			</Intro>
			
			<div 
				ref={interactiveContentRef} 
				style={{marginTop: 'calc(var(--v-spacer) / 1.5)'}}
			>
				<Cards className='cards' >
					{ histoiresArray.map( (item, index) => { return (
						<div 
							className={ index === activeIndex ? `histoire-card active` : `histoire-card` }
							key={index}
						>
							<div 
								className='bg-img'
								style={{ backgroundImage: `url(/images/${item.fichierImage}.webp)` }} 
								></div>
							<p className='nom'>{item.nom}</p>
							<button
								onClick={() => histoireSwitchClickHandler(index)} 
								className={ index === activeIndex ? `button hidden` : `button` } 
							>
								Lire son histoire
							</button>
						</div>
					)})}
				</Cards>
				
				<Histoire className='histoires'>
					{ histoiresArray.map( (histoireItem, histoireIndex) => { return (
						<div className='histoire' id={`histoire-${histoireItem.idUnique}`} key={histoireIndex}>
							<h3>L'histoire de {histoireItem.nom}</h3>
							<p>{histoireItem.titre}</p>
							
							<div className='points-list' ref={pointsListRef} >
								{histoiresArray[histoireIndex].ligneTemps.map( (item, index) => {
									return ( 
										<div key={index} className='item' >
											<div className='point'></div>
										</div>
								)})}
							</div>
							
							<div className='histoire-glide'>
								<div 
									className={ screenType === 'mouse' ? 'histoire-gsap' : 'glide__track' } 
									data-glide-el={ screenType === 'touch' ? 'track' : null }
								>
									<ul 
										className={ screenType === 'mouse' ? 'histoire-gsap__anime' : 'glide__slides' }  
										ref={gsapAnime}
									>
										<HistoireLigneTemps 
											data={ histoireItem.ligneTemps } 
											screenType={screenType}
										/>
									</ul>
								</div>
							</div>
						</div>
					)})}
				</Histoire>
			</div>
		</section>	
	)
}
	
export default HistoiresList