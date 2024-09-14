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

const Liste = styled.div`
	.histoire-unique {
		padding-block: 5vh 2vh;
		&__fiche {
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
					opacity: 0;}}}
			
		&.active .bg-img {
			filter: saturate(1);}
		
		h3 {
			font-family: sans-serif;
			margin-block: 0 0.5em;
			max-width: 30ch;
			font-weight: normal;}}
			
	${media.mediumUp`
		display: grid;
		.histoire-unique {
			grid-area: 1 / 1 / 2 / 2;
			display: grid;
			gap: 1rem;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-rows: 370px 250px;
			&__fiche {
				grid-row-start: 1;
				grid-row-end: 2;
				z-index: 20;}
			&.active {
				&_fiche {
					z-index: -1;
				}
			}
		}
	`};
`;

const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isScrollReady, setIsScrollReady] = useState(null);
	
	const pinRef = useRef();
	const scrollRef = useRef(null);
	
	let gsapAnimInstance = {};
	const pinElem = pinRef.current;
	const scrollElemRef = scrollRef.current;
	
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	
	function histoireSwitchClickHandler( clickedIndex ) {
		setActiveIndex(clickedIndex);
			ScrollTrigger.killAll();
		// gsapAnimInstance.scrollTrigger.trigger = scrollElemRef;
		// gsapAnimInstance.scrollTrigger.end = () => '+=' + scrollElemRef.offsetWidth;
		// gsapAnimInstance.scrollTrigger.scroll(0);
	}
	
	// useGSAP(() => {
	// 	if (isScrollReady) {
	// 		gsap.registerPlugin(ScrollTrigger);
	// 		
	// 		let allTimeList = gsap.utils.toArray(scrollElemRef.querySelectorAll('li.time-list__item'));
	// 		
	// 		// gsap.to(pinElem, {
	// 		// 	scrollTrigger: {
	// 		// 		pin: pinElem,
	// 		// 		pinSapincing: false,
	// 		// 	}
	// 		// });
	// 		
	// 		gsapAnimInstance = gsap.to(allTimeList, {
	// 			xPercent: -100 * (allTimeList.length - 1),
	// 			ease: 'none',
	// 			scrollTrigger: {
	// 			  trigger: scrollElemRef,
	// 				start: 'bottom 90%',
	// 				end: () => '+=' + scrollElemRef.offsetWidth,
	// 				//end: 'top 10%',
	// 				pin: true,
	// 				pinSapincing: false,
	// 				scrub: true,
	// 				//snap: 1 / (allTimeList.length - 1),
	// 				//toggleClasse: 'is-active',
	// 				markers: true,
	// 			}
	// 		});
	// 	}
	// 	
	// }, { dependencies: [isScrollReady, activeIndex] });

	return (
		<section 
			id='consequences' 
			onMouseEnter={firstHoverTouchHandler} 
			onTouchStart={firstHoverTouchHandler}
			ref={pinRef}
		>
			<h2>Les conséquences de statuts d'immigration absents ou précaires</h2>
			<p>En plus de faire face à une charge mentale excessive, une personne im·migrante sans statut ou à statut précaire peut ressentir les conséquences de sa situation migratoire sur sa santé mentale, ses conditions d'emploi et sa situation familiale.</p>
			<Liste className='histoires-container' >
				{ histoiresArray.map( (item, index) => {
					return (
						<div 
							key={index}
							className={index === activeIndex ? `histoire-unique active` : `histoire-unique`}
						>
							<div className='histoire-unique__fiche' 
								style={{ 
									gridColumnStart: `${index + 1}`,
									gridColumnEnd: `${index + 2}`
								}}
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
							
							<HistoireLigneTemps 
								ligneData={item.ligneTemps} 
								prenom={item.nom} 
								active={activeIndex === index ? true : false}
								ref={scrollRef} 
							/>
						</div>
					)
				})}
			</Liste>
		</section>	
	)
}
	
export default HistoiresList