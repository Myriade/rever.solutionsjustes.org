import React, {useState, useRef, useEffect} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'

import useWixData from '../utils/useWixData'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"
import { DrawSVGPlugin } from 'gsap/DrawSVGPlugin'

import Chapitre from './enracinerChapitre'
import CopyLinkButton from './copyLinkButton'
import DonsImpactTabs from './donsImpactsTabs'

import LierreOrdiDroit from '../images/enraciner/lierre-ordi-droit.js'
import LierreOrdiGauche from '../images/enraciner/lierre-ordi-gauche.js'
import LierreMobileDroit from '../images/enraciner/lierre-mobile-droit.js'
import LierreMobileGauche from '../images/enraciner/lierre-mobile-gauche.js'

const shareUrl = 'https://rever.solutionsjustes.org/enraciner/'

const Banniere = styled.section`
	position: relative;
	z-index: 45;
	width: 100%;
	padding-top: calc(var(--v-spacer) *.5) !important;
	display: grid;
	justify-items: start;
	align-items: start;
	gap: var(--h-spacer);
	min-height: 40vh;
	background: url(/images/enraciner/banniere-enraciner.png) no-repeat center center;
	background-size: cover;
	
	.entete__titre {
		margin-left: var(--h-spacer);
		padding-bottom: var(--v-spacer);
		display: grid;
		align-content: center;
		justify-content: start;
		gap: 1rem;
		h1, p { 
			color: white;
			margin-block: 0;}
		h1 {
			font-size: clamp(25px, 12vw, 150px);
			color: white;
			line-height: 1em;
			text-transform: uppercase;}}
		
	.entete__boutons {
		margin-right: var(--h2-spacer);
		justify-self: end;
		display: grid;
		gap: 1rem;
		align-content: center;
		justify-items: right;
		.button {
			font-weight: normal;
			font-size: 1.12rem;}}
		
	button.fuite {
		background: var(--color-pourpre);
		border: 1px solid transparent;
		border-left: 0;
		border-right: 0;
		&::before, &::after {
			margin-block: -1px;
			background: var(--color-pourpre);}
		&::before {
			border: 1px solid transparent;
			border-right: 0;}
		&::after {
			border: 1px solid transparent;
			border-left: 0;}
		&:hover {
			border-color: var(--color-jaune);
			color: var(--color-jaune);
			&::before, &::after {
				border-color: var(--color-jaune);}}}
		
	button.rapport {
		padding-right: 1.5em;
		&:hover {
			text-shadow: 0.5px 0.5px 0.5px white;}
		
		svg.lucide-chevron-down-icon {
			position: absolute;
			inset: 0.25em 0 auto auto;
			path {
				stroke: white;}}}
	
	${media.desktopUp`
		grid-template-columns: 45% 30%;
		gap: 25%;
		.entete__titre h1 {
			font-size: clamp(50px, 10vh, 120px);}
		button.rapport svg.lucide-chevron-down-icon {
		top: 0.6em;
	`}
`;

const Video = styled.div`
	display: flex;
	margin-bottom: 10vh;	
	position: relative;
	z-index: 45;	
	iframe {
		width: 100%;}
		
	.set-height {
		width: 0;
		padding-top: 56.25%;}
		
	${media.desktopUp`
		width: 60%;
		margin-inline: 10% 30%;
	`};
`;

const Chapitres = styled.section`
	> div {
		margin-inline: 0; 
		max-width: unset;}
		
	${media.desktopUp`
		padding-top: 0 !important;
		.chapitre--modelB {
			margin-inline: 0 !important;}
		.chapitre--modelA {
			margin-inline: auto 0 !important;}
			
		#chapitre6 {
			margin-inline: auto !important;
			margin-top: 7rem;
		}
	`}
`;

const ScrollCtnr = styled.section`
	position: relative;
	
	&::before {
		content: "";
		background: url("/images/enraciner/fond-texture-gris.png") no-repeat;
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		background-size: 100% 100%;
		background-position: center bottom;
		z-index: -1;}
	
	.vecteurs {
		opacity: 0;
		position: absolute;
		width: 100%;
		top: 5vh;
		right: 0;
		bottom: 20vh;
		left: 0;
		margin: auto;
		padding-top: 0 !important;
		display: flex;
		justify-content: space-between;
		align-items: stretch;}
		
	button.shortcut {
		padding-right: 1.5em;}
		
	svg.lucide-chevron-down-icon {
		position: absolute;
		inset: 0.65em 0 auto auto;
		path {
			stroke: white;}}
		
	.vecteurs svg {
		position: absolute;
		inset: 0;}
	
	path {
		fill: none;
		stroke-miterlimit: 10;}
	
	.large-only {
		display: none;}
		
	.small-only {
		position: relative;
		width: 15%;
				
		&.vecteur--droite {
			svg {
				height: 90vh;}}}
	
	${media.mediumUp`
		&::before {
			background-size: 100% auto;}
	`}
		
	${media.desktopUp`
		.vecteurs {
			top: 20vh;}
			
		.small-only {
			display: none;}
			
		.large-only {
			display: block;
			position: relative;
			
			&.vecteur--gauche {
				width: 35%;}
			&.vecteur--droite {
				width: 35%;
				z-index: 40;}}
		
		button.shortcut {
			position: absolute;
			z-index: 46;
			top: 30rem;
			right: 10rem;
			left: auto;
			text-transform: uppercase;
			display: inline;
			max-width: fit-content;}
	`}
`

const Cta = styled.section`
	.grid {
		display: grid;
		gap: calc(var(--v-spacer) / 2) var(--h-spacer);
		> div {
			padding: calc(var(--v-spacer) / 2) 1.5rem;
			background: var(--color-bleu-tres-pale);
			border-radius: var(--border-radius);
			display: grid;
			gap: 1.5rem;
			justify-items: left;
			align-content: space-between;
			overflow: hidden;}
			
		h3, p {
			margin-block: 0;}
			
		h3 {
			font-weight: 600;}
		
		.button {
			padding-inline: 3vw;}
		
		${media.mediumUp`
			grid-template-columns: 1fr 1fr;
		`}
		
		${media.largeUp`
			grid-template-columns: 1fr 1fr 1fr;
		`}
		
		.donner {
			padding: 0;
			gap: 0;
			.intro {
				padding: calc(var(--v-spacer) / 2) 1.5rem}}
	
	.partager .cta {
		position: relative;
		width: 100%;
		display: grid;
		justify-items; center;}
		
	.tooltip {
		opacity: 0;
		height: 0;
		overflow: hidden;
		position: absolute;
		top: -150px;
		right: 0;
		background: var(--color-bleu-clair);
		color: white;
		padding: 0.5rem 1.5rem;
		border-radius: var(--border-radius);
		border-bottom-left-radius: 0;
		z-index: 30;
		display: grid;
		gap: 0.75rem;
		padding-block: 1.25rem;
		ul {
			list-style-type: none;
			padding-left: 0;
			display: flex;
			gap: 1rem;
			margin-block:0;}
		a, .copylink {
			text-align: center;
			border: 1px solid white;
			border-radius: 4px;
			padding: 0.25em;
			font-weight: bold;
			&:hover {
				cursor: pointer;
				border-color: var(--color-bleu-tres-fonce);
			}
		}
		p {
			margin-block: 0;
			text-align: center;
		}
	}
	
`;

const localisedText = {
	fr: {
		chargement: 'chargement',
		banniereTitre: 'Enraciner',
		banniereSousTitre: 'Lorem ipsum color sit amet, consectetur adipisicing architecto colorem',
		exitBouton: 'Quitter rapidement le site',
		rapportBouton: "Lire le rapport d'activité",
		recitBouton: 'Lire le récit de Hana',
		rapportTitre: 'Rapport titre lorem ipsum ...',
		rapportParagraphe: 'Paragraphe Lorem ipsum color sit amet, consectetur adipisicing elit. Colorem coloremque libero cupiditate architecto ab possimus rem similique, recusandae eos soluta numquam quod maxime quidem repellendus qui vero voluptatibus et consectetur...',
		rapportTelecharger: 'Télécharger le PDF',
		partager: 'Partager',
		ou: 'ou partager par'
	},
	en: {
		chargement: 'loading',
		banniereTitre: 'Enrooted',
		banniereSousTitre: 'Lorem ipsum color sit amet, consectetur adipisicing architecto colorem',
		exitBouton: 'Quicky leave this website',
		rapportBouton: 'Read ...',
		recitBouton: "Read Hana's story",
		rapportTitre: 'Rapport title lorem ipsum ...',
		rapportParagraphe: 'Paragraph english Lorem ipsum color sit amet, consectetur adipisicing elit. Colorem coloremque libero cupiditate architecto ab possimus rem similique, recusandae eos soluta numquam quod maxime quidem repellendus qui vero voluptatibus et consectetur...',
		rapportTelecharger: 'Download PDF',
		partager: 'Share',
		ou: 'or share by'
	}
}

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollToPlugin, DrawSVGPlugin);

const PEnraciner = ({lang, ctaTexts}) => {
	const [wixData, setWixData] = useState()
	const [chapitreRendered, setChapitreRendered] = useState();
	const [shareTooltipOn, setShareTooltipOn] = useState(false)
	
	const vecteursScopeRef = useRef()
	const contentRef = useRef()
	const ctaRef = useRef()
	
	/******** Fetch Wix data *********/
	const placeholderData = {
		data: {
			title: localisedText[lang].chargement,
		}
	}
	
	let collection = null;
	let manualSort = null;
	
	if (lang === 'fr') {
		collection = 'Import692'
		manualSort = '_manualSort_609e1759-a61d-4150-b9d9-25754c3777a3'
	}
	
	if (lang === 'en') {
		collection = 'Enracinee-En'
		manualSort = '_manualSort_c53c7168-c1f4-4f95-bf5d-b132894b6c31'
	}
	
	const fetchedData = useWixData(collection, manualSort, placeholderData);
	
	if (!wixData) {
		if (fetchedData && fetchedData.length > 1) {
			setWixData(fetchedData)
		}
	}
	
	// Event Handler
	const { contextSafe } = useGSAP({ scope: vecteursScopeRef });
	const shortcutClickHandler = contextSafe( (destination, offset) => {
		gsap.to( window, { duration: 4, scrollTo: { y: destination, offsetY: offset }});
	});
	
	const quitterLeSite = () => {
		window.open("https://ici.radio-canada.ca/","_newtab");
		window.location.replace('https://www.google.ca/search')
	}
	
	const { contextSafe: ctaContextSafe } = useGSAP({ scope: ctaRef });
	const shareClickHandler = ctaContextSafe(() => {
		if (!shareTooltipOn) {
			gsap.to( '.tooltip', { duration: 0.5, opacity: 1, height: 'auto' });
			setShareTooltipOn(true);
		} else {
			gsap.to( '.tooltip', { duration: 0.5, opacity: 0, height: 0 });
			setShareTooltipOn(false);
		}
	});
	
	// GSAP Setup de depart
	useGSAP(() => {
		if (wixData && wixData.length >= 6 && chapitreRendered ) {
			
			// Tous
			gsap.to(".vecteurs", {
				opacity: 1,
				duration: 2
			});
			gsap.set(".vecteurs path", {
				opacity: 0
			});
			
			// ordi gauche	
			gsap.set(".large-only.vecteur--gauche path", {drawSVG: "0%"});
			gsap.set("#lg-1", {drawSVG: "20%", autoAlpha: 1});
			
			gsap.set("#lg-2", {drawSVG: "3%", autoAlpha: 1});
			gsap.set("#lg-3", {drawSVG: "5%", autoAlpha: 1});
			
			gsap.set("#lg-4", {drawSVG: "15%", autoAlpha: 1});
			gsap.set("#lg-5", {drawSVG: "25%", autoAlpha: 1});
			
			// ordi droite
			gsap.set(".large-only.vecteur--droite path", {drawSVG: "0%"});
			gsap.set("#ld-1", {drawSVG: "3%", autoAlpha: 1});
			gsap.set("#ld-2", {drawSVG: "2.8%", autoAlpha: 1});
			
			// Mobile gauche
			gsap.set(".small-only.vecteur--gauche path", {drawSVG: "0%"});
			gsap.set(".mg-1", {drawSVG: "3%", autoAlpha: 1});
			gsap.set(".mg-2", {drawSVG: "3.5%", autoAlpha: 1});
			gsap.set("#mg-3", {drawSVG: "5%", autoAlpha: 1});
			
			// Mobile droite
			gsap.set(".small-only.vecteur--droite", {zIndex: 20});
			gsap.set(".small-only.vecteur--droite path", {autoAlpha: 1});
			
		}
	},{ scope: vecteursScopeRef, dependencies: [wixData, chapitreRendered] });
	
	// Animation vecteurs au scroll
	useGSAP(() => {
		if (wixData && wixData.length >= 6 && chapitreRendered) {
			
			const enterTween = { autoAlpha: 1, duration: 0.5, ease: 'none' }
			const leaveBackTween = { autoAlpha: 0, duration: 0.5, ease: 'none' }
			
			// ordi gauche	
			gsap.to("#lg-1", {
				drawSVG: "100%", ease: "none",
				scrollTrigger: { trigger: "#lg-1", start: "top 20%", end: "bottom 35%", scrub: 1}
			});
			
			gsap.to("#lg-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-2", start: "top 20%", end: "bottom 65%", scrub: 1}
			}); 
			gsap.to("#lg-3", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-3", start: "top 20%", end: "bottom 45%", scrub: 1}
			});
			
			gsap.to("#lg-4", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-4", start: "top 10%", end: "bottom 75%", scrub: 1}
			}); 
			gsap.to("#lg-5", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { trigger: "#lg-5", start: "top 10%", end: "bottom 80%", scrub: 1}
			});
			
			gsap.to("#lg-6", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-6", start: "top 30%", end: "top 10%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-7", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-7", start: "top 20%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-8-9", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-8", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-10", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-10", start: "top 20%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-11-12", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-11", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-13", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-13", start: "top 20%", end: "bottom 95%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-14", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-14", start: "top 20%", end: "bottom 65%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to(".lg-15-16", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-15", start: "top 20%", end: "bottom 75%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-17", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-17", start: "top 20%", end: "bottom 55%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-18", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-18", start: "top 20%", end: "bottom 55%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-19", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-19", start: "top 75%", end: "top 50%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#lg-20", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#lg-20", start: "top 75%", end: "top 30%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			// ordi droite	
			gsap.to("#ld-1", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-1", start: "top 20%", end: "bottom 65%", scrub: 1, 
				}
			}); 
			
			gsap.to("#ld-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-2", start: "top 30%", end: "bottom 70%", scrub: 1,
				}
			});
			
			gsap.to("#ld-3", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-3", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-4", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-4", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-5", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-5", start: "top 30%", end: "bottom 40%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-6", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-6", start: "top 30%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			gsap.to("#ld-7", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-6", start: "top 30%", end: "bottom 75%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-8", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-8", start: "top 33%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-9", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-9", start: "top 40%", end: "bottom 70%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-10", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-10", start: "top 35%", end: "bottom 80%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-11", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-11", start: "top 35%", end: "bottom 80%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-12", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-12", start: "top 30%", end: "bottom 80%", scrub: 1, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#ld-13", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#ld-13", start: "top 40%", end: "bottom 70%", scrub: true, 
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			// mobile gauche
			gsap.to(".vecteur--gauche.small-only .mg-1", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: {
					trigger: ".vecteurs", start: "top 30%", end: "bottom 75%", scrub: 1,
				}
			});
			
			gsap.to(".vecteur--gauche.small-only .mg-2", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: {
					trigger: ".vecteurs", start: "top 20%", end: "bottom 85%", scrub: true,
				}
			});
			
			gsap.to(".vecteur--gauche.small-only #mg-3", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: {
					trigger: ".vecteurs", start: "top 10%", end: "bottom 75%", scrub: 1,
				}
			});
			
			gsap.to("#mg-4", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#mg-4", start: "top 50%", end: "bottom 50%", scrub: 1,
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#mg-5", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#mg-5", start: "top 50%", end: "bottom 50%", scrub: true,
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#mg-6", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#mg-6", start: "top 50%", end: "bottom 50%", scrub: 1,
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#mg-7", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#mg-7", start: "top 50%", end: "bottom 50%", scrub: true,
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			gsap.to("#mg-8", {
				drawSVG: "100%", ease: "none", 
				scrollTrigger: { 
					trigger: "#mg-8", start: "top 50%", end: "bottom 70%", scrub: true,
					onEnter: self => gsap.to(self.trigger, enterTween),
					onLeaveBack: self => gsap.to(self.trigger, leaveBackTween)
				}
			});
			
			// mobile droite
			gsap.to(".vecteur--droite.small-only svg", {
				scrollTrigger: {
					id: 'vecteur-droite-mobile',
					trigger: '.vecteur--droite.small-only',
					start: "top 10%",
					end: "bottom bottom",
					pin: true,
					pinSpacing: false,
					scrub: 1
				}
			});
		}
	}, { scope: vecteursScopeRef, dependencies: [wixData, chapitreRendered], })
	
	return (
		<>
			<Banniere className='entete'>
				<div className='entete__titre'>
					<h1>{localisedText[lang].banniereTitre}</h1>
					<p>{localisedText[lang].banniereSousTitre}</p>
				</div>
				<div className='entete__boutons'>
					<div><button 
						className='button fuite' 
						id="quitter" 
						onClick={quitterLeSite}
					>
							{localisedText[lang].exitBouton} →
						</button></div>
					<div><button 
						className='button rapport'
						onClick={ () => shortcutClickHandler('#agir', -50) }
					>
						{localisedText[lang].rapportBouton}
						<svg mlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="#000000" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" className='lucide lucide-chevron-down-icon lucide-chevron-down'><path d="m6 9 6 6 6-6"/></svg>
					</button></div>
				</div>
			</Banniere>
			
			<ScrollCtnr id='recit' ref={vecteursScopeRef}>
			
				<button
					className='shortcut button large-only'
					onClick={ () => shortcutClickHandler('#recit', -750) }
				>
					{localisedText[lang].recitBouton} 
					<svg mlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className='lucide lucide-chevron-down-icon lucide-chevron-down'><path d="m6 9 6 6 6-6"/></svg>
				</button>
			
				<div className='vecteurs'>
					<div className='large-only vecteur--gauche'><LierreOrdiGauche /></div>
					<div className='small-only vecteur--gauche'><LierreMobileGauche /></div>
					<div className='large-only vecteur--droite'><LierreOrdiDroit /></div>
					<div className='small-only vecteur--droite'><LierreMobileDroit /></div>
				</div>
			
				<Chapitres id='chapitres' ref={contentRef}>
					<div>
						<Video>
							<div className='set-height'></div>
							<iframe
								src='https://www.youtube-nocookie.com/embed/yL-fwv2Z3rE?si=HFvBzDUZJMr3zBiu&rel=0' 
								title='De toi à moi: témoignage d’une personne sans statut d’immigration.'
								width="720" height="405" 
								allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
								frameBorder="0"
								webkitallowfullscreen="true"
								mozallowfullscreen="true"
								allowFullScreen
								referrerPolicy='strict-origin-when-cross-origin'
							/>
						</Video>
						
						{ wixData && wixData.length >= 6 ? <>
							<Chapitre
								id='chapitre1'
								readMoreId='chapitre2' 
								lang={lang}
								imgFile='chapitre1'
								texts={wixData[0].data}
								model='right' 
								rendered={0}
							/>
								
							<Chapitre
								id='chapitre2'
								readMoreId='chapitre3' 
								lang={lang}
								imgFile='chapitre2'
								texts={wixData[1].data}
								model='left' 
								rendered={1}
							/>
							
							<Chapitre
								id='chapitre3'
								readMoreId='chapitre4' 
								lang={lang}
								imgFile='chapitre3'
								texts={wixData[2].data}
								model='right' 
								rendered={2}
							/>
							
							<Chapitre
								id='chapitre4'
								readMoreId='chapitre5' 
								lang={lang}
								imgFile='chapitre4'
								texts={wixData[3].data}
								model='left' 
								rendered={3}
							/>
							
							<Chapitre
								id='chapitre5'
								readMoreId='chapitre6' 
								lang={lang}
								imgFile='chapitre5'
								texts={wixData[4].data}
								model='right' 
								rendered={4}
							/>
							
							<Chapitre
								id='chapitre6'
								lang={lang}
								imgFile='chapitre6'
								texts={wixData[5].data}
								model='left'
								rendered={5}
								onRenderChange={setChapitreRendered}
							/>
						</> : <p>... {localisedText[lang].chargement}</p>}
					</div>
				</Chapitres>
				
			</ScrollCtnr>
			
			<Cta id='agir' ref={ctaRef}>
				{ ctaTexts ? <>
					<div className='grid'>
						<div className='rapport'>
							<h3>{localisedText[lang].rapportTitre}</h3>
							<p>{localisedText[lang].rapportParagraphe}</p>
							<a href='#' className='button centered'>
								{localisedText[lang].rapportTelecharger}
							</a>
						</div>
					
						<div className='donner'>
							<div className='intro'>
								<h3>{ctaTexts.t6a}</h3>
								<p>{ctaTexts.p6a}</p>
							</div>
							<DonsImpactTabs textData={ctaTexts} />
						</div>
						
						<div className='partager'>
							<h3>{ctaTexts.t6c}</h3>
							<p>{ctaTexts.p6c}</p>
							<StaticImage
								src='../images/rever-a-l-essentiel-MCM.webp'
								placeholder='dominantColor'
								alt='Je rêvais de contribuer à la société québécoise, je rêve maintenant d\u2019être payé pour mon travail' 
								style={{width: '180px', marginInline: 'auto'}}
							/>
							<div className='cta'>
								<button 
									className='button centered'
									onClick={shareClickHandler}
								>
									{ctaTexts.b6c}
								</button>
								<div className='tooltip'>
									<CopyLinkButton 
										lang={lang} 
										url={shareUrl}
									/>
									<p>{lang === 'fr' ? localisedText.fr.ou : ''}{lang === 'en' ? localisedText.en.ou : ''}</p>
									<ul>
										<li><a 
											href={`mailto:?subject=Ensemble%20pour%20ne%20pas%20r%C3%AAver%20qu'%C3%A0%20l'essentiel%20%F0%9F%92%AD%F0%9F%8C%9F&body=Bonjour%2C%0A%0AJ'esp%C3%A8re%20que%20tu%20vas%20bien.%20Je%20voulais%20te%20parler%20d'une%20campagne%20importante%20sur%20l'immigration%20humanitaire%2C%20qui%20met%20en%20lumi%C3%A8re%20les%20statuts%20d%E2%80%99immigration%2C%20l%E2%80%99absence%20de%20statut%20et%20leurs%20impacts%20sur%20la%20vie%20des%20personnes.%0A%0A${shareUrl}%2F%0A%0AChaque%20histoire%20m%C3%A9rite%20d'%C3%AAtre%20entendue.%20Ensemble%2C%20nous%20pouvons%20faire%20la%20diff%C3%A9rence%20en%20apprenant%20cette%20r%C3%A9alit%C3%A9%20et%20soutenir%20ces%20voix.%20Je%20t'invite%20%C3%A0%20d%C3%A9couvrir%20la%20campagne%20et%20%C3%A0%20partager%20tes%20r%C3%A9flexions.%0A%0AMerci%20de%20ton%20soutien%20!%0A%0ACordialement%2C`}
											target='_blank'
											rel='noreferrer'
											>Courriel</a></li>
										<li><a 
											href={`https://www.facebook.com/dialog/share?app_id=2315665215432948&display=popup&href=${shareUrl}`}
											target='_blank'
											rel='noreferrer'
											>Facebook</a></li>
										<li><a
											href={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}
											target='_blank'
											rel='noreferrer'
											>LinkedIn</a></li>
										<li>
											<a
												href={`https://twitter.com/intent/tweet?text=${shareUrl}`}
												target='_blank'
												rel='noreferrer'
												>
											X</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
					</div>
				</> : '...'}
			</Cta>
		
		</>
	)
}

export default PEnraciner
