import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'

//import useWixData from '../utils/useWixData'
import histoiresData from '../data/histoires'
import HistoireLigneTemps from './histoireLigneTemps'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

const Liste = styled.div`
	position: relative;
	.histoire-unique {
		padding-block: 5vh 2vh;
		&__fiche {
			display: grid;
			gap: 1rem;
			justify-content: center;
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
				transition: opacity 0.4s ease-in-out;}
			.nom {
				color: white;
				font-weight: bold;
				text-align: center;
				font-size: 2rem;
				margin-block: 0;}
			button {
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
		height: 80vh;
		.histoire-unique {
			position: absolute;
			height: 80vh;
			display: grid;
			gap: 1rem;
			grid-template-columns: 33% 33% 33%;
			grid-template-rows: 300px 250px;
			&__fiche {
				grid-row-start: 1;
				grid-row-end: 2;
				z-index: 20;
				gap: 200px;}
			&.active {
				z-index: -1;
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
	
	const wrapperRef = useRef(null);
	const elemRef = useRef(null);
	
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	
	function histoireSwitchClickHandler( clickedIndex ) {
		setActiveIndex(clickedIndex);
		ScrollTrigger.killAll();
	}
	
	useGSAP(() => {
		if (isScrollReady) {
			gsap.registerPlugin(ScrollTrigger);
			const myWrapperRef = wrapperRef.current;
			const scrollTriggerWrapper = elemRef.current;
			let allTimeList = gsap.utils.toArray(scrollTriggerWrapper.querySelectorAll('li.time-list__item'));
			
			console.log(scrollTriggerWrapper);
			console.log(allTimeList);
			
			gsap.to(allTimeList, {
				xPercent: -100 * (allTimeList.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: myWrapperRef,
					start: 'bottom bottom',
					end: () => '+=' + scrollTriggerWrapper.offsetWidth,
					pin: true,
					pinSapincing: false,
					scrub: true,
					snap: 1 / (allTimeList.length - 1),
					toggleClasse: 'is-active',
					markers: true,
				}
			});
			
		}
		
	}, { dependencies: [isScrollReady, activeIndex] });

	return (
		<Liste
			className='histoires-container' 
			onMouseEnter={firstHoverTouchHandler} 
			onTouchStart={firstHoverTouchHandler}
			ref={wrapperRef}
		>
			{ histoiresArray.map( (item, index) => {
				return (
					<div 
						key={index}
						className={index === activeIndex ? `histoire-unique active` : `histoire-unique`}
						ref={ index === activeIndex ? elemRef : null } 
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
						/>
					</div>
				)
			})}
		</Liste>
	)
}
	
export default HistoiresList