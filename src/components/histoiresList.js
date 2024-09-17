import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'
import { media } from '../styles/mixins.js'

//import useWixData from '../utils/useWixData'
import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Cards = styled.div`
	padding-block: 2vh;
	display: grid;
	gap: 1rem;
	
	.histoire-card {
		display: grid;
		gap: 1rem;
		justify-content: center;
		align-content: space-between;
		border-radius: 15px;
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
			
		&.active .bg-img {
			filter: saturate(1);}}
			
	${media.mediumUp`
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 30vh;
		.histoire-card {
			grid-row-start: 1;
			grid-row-end: 2;}
	`};
`;

const Histoire = styled.div`
	margin-top: 1rem;
	.histoire-scrolljack {
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
			display: flex;
			gap: 2rem;
			flex-wrap: nowrap;
			padding-left: 0;}}
			
	.points-list {
		display: flex;
		justify-content: stretch;
		margin-bottom: 1rem;
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
			top: 14px;
			background: white;
			border: 3px solid var(--color-bleu-tres-fonce);
			border-radius: 50%;
			width: 25px;
			height: 25px;}
			
	}
`;

const HistoiresList = () => {
	// States
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [gsapAnimInstance, setGsapAnimInstance] = useState();
	const [isScrollReady, setIsScrollReady ] = useState(null);
	const [hasNewData, setHasNewData] = useState(false);
	
	// Data fetch
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	// Dom references and variables
	const pinRef = useRef();
	const pinElem = pinRef.current;
	const scrolljackAnime = useRef();
	const scrolljackAnimeElem = scrolljackAnime.current;
	const pointsListRef = useRef();
	const pointsListElem = pointsListRef.current;
	
	// event handlers
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	function histoireSwitchClickHandler(clickedIndex) { 
		setActiveIndex(clickedIndex);
		setHasNewData(true);
		
		pointsListElem.childNodes[0].classList.add('active');
		
		pointsListElem.childNodes.forEach( (item, index) => {
			if (index !== 0) {
				item.classList.remove('active');
			}
		});
	}
	
	// Fonction pour mettre une classe active sur le point correspondant dans la ligne au scroll
	const setActivePoint = (progress, ligneTempsArrayLength) => {
		const progressPercent = Math.round(progress*100);
		const rangActuel = Math.round(((ligneTempsArrayLength - 1) * progressPercent) / 100);
		
		pointsListElem.childNodes[rangActuel].classList.toggle('active');
		pointsListElem.childNodes.forEach( (item, index) => {
			if (index !== rangActuel) {
				item.classList.remove('active');
			}
		});
	}

	// GSAP configs
	gsap.registerPlugin(ScrollTrigger);
	
	useGSAP(() => {
		// initialiser un PIN et un Scroll si le dom est pret et s'il n'y a pas deja d'instance GSAP
		if (isScrollReady && !gsapAnimInstance) {
			const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
			const timelineWidth = scrolljackAnimeElem.scrollWidth;
			
			const myGsap = gsap.to( scrolljackAnimeElem, {
				xPercent: -100 * (ligneTempsArrayLength - 1),
				ease: 'none',
				duration: 5,
				scrollTrigger: {
					pin: pinElem,
					start: 'top 5%',
					end: () => '+=' + timelineWidth,
					scrub: true,
					snap: {
						snapTo: 1 / (ligneTempsArrayLength - 1), 
						duration: 0.5,
						ease: 'sine.inOut'
					},
					fastScrollEnd: true,
					onEnter: () => pointsListElem.childNodes[0].classList.toggle('active'),
					onSnapComplete: ({progress}) => setActivePoint(progress, ligneTempsArrayLength),
					anticipatePin: 1,
					preventOverlaps: true,
					// markers: true,
				}
			});
			setGsapAnimInstance(myGsap);
		}
		
		// Lorsque l'histoire visible change, ramener le scroll au début et invalider l'instance ScrollTrigger
		if ( gsapAnimInstance && hasNewData ) {
			const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
			const timelineWidth = scrolljackAnimeElem.scrollWidth;
			
			gsapAnimInstance.scrollTrigger.scroll(gsapAnimInstance.scrollTrigger.start);
			gsapAnimInstance.scrollTrigger.kill();
			gsapAnimInstance.vars.xPercent = -100 * (ligneTempsArrayLength - 1);
			gsapAnimInstance.invalidate();
			setHasNewData(false);
		}
		
		// Monter à nouveau le composant et une nouvelle instance ScrollTrigger avec les nouveaux calculs
		if ( gsapAnimInstance && !hasNewData ) {
			const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
			const timelineWidth = scrolljackAnimeElem.scrollWidth;
			
			ScrollTrigger.create({
				animation: gsapAnimInstance,
				pin: pinElem,
				start: 'top 5%',
				end: () => '+=' + timelineWidth,
				scrub: true,
				snap: {
					snapTo: 1 / (ligneTempsArrayLength - 1), 
					duration: 0.5,
					ease: 'sine.inOut',
				},
				fastScrollEnd: true,
				onSnapComplete: ({progress}) => setActivePoint(progress, ligneTempsArrayLength),
				anticipatePin: 1,
				preventOverlaps: true,
				// markers: true,
			});
			
			ScrollTrigger.refresh();
		}
		
	}, { dependencies: [isScrollReady, hasNewData], scope: pinRef });

	return (
		<section 
			id='consequences' 
			onMouseEnter={firstHoverTouchHandler} 
			onTouchStart={firstHoverTouchHandler}
			ref={ pinRef }
		>
			<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
			<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			<Cards 
				className='cards' 
			>
				{ histoiresArray.map( (item, index) => {
					return (
						<div 
							className={ index === activeIndex ? `histoire-card active` : `histoire-card` }
							style={{ 
								gridColumnStart: `${index + 1}`,
								gridColumnEnd: `${index + 2}`
							}}
							key={index}
						>
							<div 
								className='bg-img'
								style={{ backgroundImage: 'url(/portrait1.webp)' }} 
								></div>
							<p className='nom'>{item.nom}</p>
							<button
								onClick={() => histoireSwitchClickHandler(index)} 
								className={ index === activeIndex ? `button hidden` : `button` } 
							>
								Lire son histoire
							</button>
						</div>
					)
				})}
			</Cards>
			
			<Histoire className='histoire' >
				<p className='label'>L'histoire de {histoiresArray[activeIndex].nom}</p>
				
				<div className='points-list' ref={pointsListRef} >
					{histoiresArray[activeIndex].ligneTemps.map( (item, index) => {
						return ( 
							<div key={index} className='item' >
								<div className='point'></div>
							</div>
					)})}
				</div>
				
				<div className='histoire-scrolljack' >
					<ul className='histoire-scrolljack__anime' ref={scrolljackAnime}>
						<HistoireLigneTemps data={ histoiresArray[activeIndex].ligneTemps } />
					</ul>
				</div>
			</Histoire>
		</section>	
	)
}
	
export default HistoiresList