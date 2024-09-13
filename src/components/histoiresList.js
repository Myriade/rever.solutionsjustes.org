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
	padding-block: 5vh 2vh;
	
	.histoire-unique {
		&__fiche {
			display: grid;
			justify-items: center;
			gap: 1rem;
			margin-bottom: 1rem;
			padding-block: 1rem;
			img {
				max-width: 150px;}
			button {
				transition: opacity 0.4s ease-in-out;
				&.hidden {
				opacity: 0;	}}}
			
		&.active {
			.histoire-unique__fiche {
				background: rgb(230, 230, 230);
				border-radius: 20px;}}
		h3 {
			font-family: sans-serif;
			margin-block: 0 0.5em;
			max-width: 30ch;
			font-weight: normal;}}
			
	${media.mediumUp`
		display: grid;
		grid-template-columns: 33% 33% 33%;
		grid-template-rows: 1fr 1fr;
	`};
`;

const HistoiresList = () => {
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [isScrollReady, setIsScrollReady] = useState(null);
	const [scrollProgress, setScrollProgress] = useState(0)
	
	const wrapperRef = useRef(null);
	const activeElemRef = useRef(null);
	
	function firstHoverTouchHandler() { setIsScrollReady(true) }
	
	function histoireSwitchClickHandler( clickedIndex ) {
		setActiveIndex(clickedIndex);
		ScrollTrigger.killAll();
	}
	
	useGSAP(() => {
		if (isScrollReady) {
			const scrollTriggerWrapper = wrapperRef.current;
			const scrollActiveElem = activeElemRef.current;
			console.log(scrollActiveElem);
			
			gsap.registerPlugin(ScrollTrigger);
			let sections = gsap.utils.toArray(scrollActiveElem.querySelectorAll('li.time-list__item'));
			
			gsap.to(sections, {
				xPercent: -100 * (sections.length - 1),
				ease: 'none',
				scrollTrigger: {
					trigger: scrollTriggerWrapper,
					start: 'bottom bottom',
					end: () => '+=' + scrollTriggerWrapper.offsetWidth,
					pin: true,
					pinSapincing: false,
					scrub: true,
					snap: 1 / (sections.length - 1),
					toggleClasse: 'is-active',
					markers: true,
					onUpdate: (self) => console.log("progress:", self.progress),
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
					<React.Fragment key={index}>
						<div 
							className={index === activeIndex ? `histoire-unique active` : `histoire-unique`}
						>
							<div className='histoire-unique__fiche'>
								<div className='text-centered'>
									<p className='label'>{item.nom}</p>
									<h3>{item.titre}</h3>
								</div>
								<img src='/portrait-placeholder.gif' alt={item.titre}/>
								<button 
									onClick={() => histoireSwitchClickHandler(index)} 
									className={ index === activeIndex ? `hidden` : `` } 
								>
									Lire son histoire
								</button>
							</div>
						</div>
						
						<HistoireLigneTemps 
							ligneData={item.ligneTemps} 
							prenom={item.nom} 
							active={activeIndex === index ? true : false}
							ref={activeElemRef} 
						/>
					</React.Fragment>
				)
			})}
		</Liste>
	)
}
	
export default HistoiresList