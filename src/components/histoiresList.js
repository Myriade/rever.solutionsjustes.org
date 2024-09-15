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
	// States
	const [histoiresArray, setHistoiresArray] = useState(histoiresData);
	const [activeIndex, setActiveIndex] = useState(0);
	const [gsapAnimInstance, setGsapAnimInstance] = useState();
	const [isScrollReady, setIsScrollReady ] = useState(null);
	
	// Data fetch
	//let content = useWixData('TestsRever-Statutsmigratoires', '_manualSort_559b8e96-44f9-4841-a096-af53431ff141');
	
	// Dom referennces
	const pinRef = useRef(null);
	const pinElem = pinRef.current;
	
	// event handlers
	function histoireSwitchClickHandler(clickedIndex) { setActiveIndex(clickedIndex) }
	function firstHoverTouchHandler() { setIsScrollReady(true) }

	// initialiser une instance GSAP et la storer dans un state
	gsap.registerPlugin(ScrollTrigger);
	useGSAP(() => {
		if (isScrollReady && !gsapAnimInstance) {
			const myGsap = gsap.to(pinElem, {
				x: 100,
				scrollTrigger: {
					pin: pinElem,
					start: 'top 5%',
					end: 'bottom 5%',
					scrub: true,
					markers: true,
				}
			});
			setGsapAnimInstance(myGsap);
		}
		
		// remettre le premier point temporel en vue lors du changement d'histoire 
		if (gsapAnimInstance) {
			gsapAnimInstance.scrollTrigger.scroll(gsapAnimInstance.scrollTrigger.start);
		}
		
	}, { dependencies: [isScrollReady, activeIndex], scope: pinRef });

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
				
			<Histoires className='histoires' >
				<div 
					//ref={histoiresBufferRef} 
					className='histoires__buffer'></div>
				<div 
					//ref={scrollRef} 
					className='histoires__lignes'>
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