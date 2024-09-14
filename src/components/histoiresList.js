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
			filter: saturate(1);}
		
		h3 {
			font-family: sans-serif;
			margin-block: 0 0.5em;
			max-width: 30ch;
			font-weight: normal;}}
			
	${media.mediumUp`
		display: grid;
		gap: 1rem;
		grid-template-columns: 1fr 1fr 1fr;
		grid-template-rows: 370px;
		.histoire-card {
			grid-row-start: 1;
			grid-row-end: 2;
			z-index: 20;
			&.active {
			z-index: -1;}}
	`};
`;

const Histoires = styled.div`
	.histoires__lignes {
		display: grid;
		> * {
			grid-area: 1 / 1 / 2 / 2;}}
`;

const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isScrollReady, setIsScrollReady] = useState(null);
	
	const pinRef = useRef(null);
	const histoiresBufferRef = useRef(null);
	const scrollRef = useRef(null);
	
	let cardsPin = {};
	let histoiresBufferAnim = {};
	let timelineAnim = {};
	
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	
	function histoireSwitchClickHandler( clickedIndex ) {
		setActiveIndex(clickedIndex);
		ScrollTrigger.killAll();
	}
	
	useGSAP(() => {
		if (isScrollReady) {
			gsap.registerPlugin(ScrollTrigger);
			
			const pinElem = pinRef.current;
			const histoiresBufferElem = histoiresBufferRef.current;
			const scrollElem = scrollRef.current;
			
			const allTimeList = gsap.utils.toArray(scrollElem.querySelectorAll('.ligne-temps.active li.time-list__item'));
			const totalHeight = pinElem.offsetHeight + scrollElem.offsetHeight;
			console.log(allTimeList[0].querySelector('.time-list__item__date').innerText);
			
			cardsPin = gsap.to(pinElem, {
				scrollTrigger: {
					pin: pinElem,
					pinSpacing: false,
					start: 'top 10%',
					end: 'bottom 10%',
					// markers: true,
				}
			});
			
			//  Todo : positionner ce buffer pour créer l'effet de slide depuis la droite
			histoiresBufferAnim = gsap.from(histoiresBufferElem, {
				marginLeft: 100, 
				duration: 1,
			});
			
			timelineAnim = timelineAnim = gsap.to(allTimeList, {
				xPercent: -100 * (allTimeList.length - 1),
				ease: 'none',
				scrollTrigger: {
				  trigger: scrollElem,
					start: 'bottom 90%',
					//end: () => '+=' + scrollElem.offsetWidth,
					end: 'top 10%',
					pin: true,
					//pinSpacing: false,
					scrub: true,
					//snap: 1 / (allTimeList.length - 1),
					//toggleClasse: 'is-active',
					markers: true,
				}
			});
			
			// Todo : utiliser un state pour remettre le progress à 0
			if (cardsPin.scrollTrigger) {
				console.log(cardsPin.scrollTrigger);
				if (cardsPin.scrollTrigger.progress > 0) {
					cardsPin.scrollTrigger.progress(0);
				}
			}
			
		}
		
	}, { dependencies: [isScrollReady, activeIndex] });

	return (
		<section 
			id='consequences' 
			onMouseEnter={firstHoverTouchHandler} 
			onTouchStart={firstHoverTouchHandler}
		>
			<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
			<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			<Cards 
				className='cards' 
				ref={ pinRef }
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
				
			<Histoires className='histoires' >
				<div ref={histoiresBufferRef} className='histoires__buffer'></div>
				<div ref={scrollRef} className='histoires__lignes'>
					{ histoiresArray.map( (item, index) => {
						return (
							<React.Fragment key={`histoire-ligne-${index}`}>
								<HistoireLigneTemps 
									ligneData={item.ligneTemps} 
									prenom={item.nom} 
									active={activeIndex === index ? true : false}
								/>
							</React.Fragment >
						)
					})}
				</div>
			</Histoires>
		</section>	
	)
}
	
export default HistoiresList