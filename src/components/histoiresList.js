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
	position: relative;
	z-index: 25;
	
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
			filter: saturate(0);
			transition: all 0.4s ease-in-out;}
		.nom {
			color: white;
			font-weight: bold;
			text-align: center;
			font-size: 2rem;
			margin-block: 0;}
		.button {
			opacity: 1;
			transition: opacity 0.4s ease-in-out;
			&.hidden {
				opacity: 0;}}
			
		&.active .bg-img {
			filter: saturate(1);}}
			
	${media.mediumUp`
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 30vh;
		.histoire-card {
			grid-row-start: 1;
			grid-row-end: 2;}
	`};
`;

const Histoire = styled.div`
	.histoire-scrolljack {
		margin-top: 1rem;
		overflow: hidden;
		&__anime {
			display: flex;
			flex-wrap: nowrap;
			padding-left: 0;
		}
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
	
	// Dom references
	const pinRef = useRef(null);
	const pinElem = pinRef.current;
	const scrolljackAnime = useRef();
	const scrolljackAnimeElem = scrolljackAnime.current;
	
	// event handlers
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	function histoireSwitchClickHandler(clickedIndex) { 
		setActiveIndex(clickedIndex);
		setHasNewData(true);
	}

	// GSAP configs
	gsap.registerPlugin(ScrollTrigger);
	
	useGSAP(() => {
		// initialiser un PIN et un Scroll si le dom est pret et s'il n'y a pas deja d'instance GSAP
		if (isScrollReady && !gsapAnimInstance) {
			const myGsap = gsap.to( scrolljackAnimeElem, {
				xPercent: -100 * (histoiresArray[activeIndex].ligneTemps.length - 1),
				ease: 'none',
				scrollTrigger: {
					pin: pinElem,
					start: 'top 5%',
					end: () => '+=' + scrolljackAnimeElem.scrollWidth,
					scrub: true,
					snap: 1 / (histoiresArray[activeIndex].ligneTemps.length - 1),
					markers: true,
				}
			});
			setGsapAnimInstance(myGsap);
			console.log('1er if hasNewData = ', hasNewData);
			console.log(scrolljackAnimeElem.scrollWidth);
		}
		
		// Mettre à jour le Pin et le ScrollTrigger lorsque les données changent
		if ( gsapAnimInstance && hasNewData ) {
			const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
			
			console.log('2e if hasNewData = ', hasNewData);
			console.log(scrolljackAnimeElem.scrollWidth);
			
			// Bring the animation scrolls to the start position
			gsapAnimInstance.scrollTrigger.scroll(gsapAnimInstance.scrollTrigger.start);
			gsapAnimInstance.scrollTrigger.kill();
			gsapAnimInstance.vars.xPercent = -100 * (ligneTempsArrayLength - 1);
			gsapAnimInstance.invalidate();
			setHasNewData(false);
		}
		
		if ( gsapAnimInstance && !hasNewData ) {
			const timelineWidth = scrolljackAnimeElem.scrollWidth;
			const ligneTempsArrayLength = histoiresArray[activeIndex].ligneTemps.length;
			
			console.log('3e if hasNewData = ', hasNewData);
			console.log(scrolljackAnimeElem.scrollWidth);
			
			ScrollTrigger.create({
				animation: gsapAnimInstance,
				pin: pinElem,
				start: 'top 5%',
				end: () => '+=' + scrolljackAnimeElem.scrollWidth,
				scrub: true,
				snap: 1 / (histoiresArray[activeIndex].ligneTemps.length - 1),
				markers: true,
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