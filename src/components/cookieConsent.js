import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
// import { gsap } from 'gsap'
// import { useGSAP } from '@gsap/react'

const Consentement = styled.section`
	position: fixed;
	display: grid;
	gap: 1rem;
	align-items: center;
	z-index: 300;
	bottom: 0;
	right: 10vw;
	left: 10vw;
	background: var(--color-bleu-tres-fonce);
	color: white;
	padding: 0.5rem var(--h-spacer);
	p, .button {
		font-size: 0.9rem;}
	.button {
		display: block;
		background-color: white;
		color: var(--color-bleu-tres-fonce);
		float: right;
		margin-right: 5em;
		&:after, &:before {
			background-color: white;}}
			
	a {
		text-decoration: underline;
		font-weight: normal;
		&:hover {
			text-decoration-thickness: 2px;
		}
	}
			
	${media.mediumUp`
		grid-template-columns: auto auto;
		.button {
			float: none;
			margin-right: 2em;
		}
	`}
	
`;

export default function CookieConsent() {
	const [isConsentOk, setIsConsentOk] = useState(true);
	
	// event handler
	const onConsentClick = () => {
		setIsConsentOk(true);
		localStorage.setItem('cookiesConsent', 'true');
		console.log('Cookie consent clicked');
	}
	
	// The isConsentOk state is assumed to be true up until the local storage is set to false
	useEffect( () => {
		// wait a few seconds to update the state and show the banner
		setTimeout( () => { 
			// verify if there is a local consent already, and store its value in the localConsent state
			const localConsentValue = localStorage.getItem('cookiesConsent');
			// if there is no local value or the local value is false (string) 
			if ( !localConsentValue || localConsentValue === 'false' ) {
				localStorage.setItem('cookiesConsent', 'false');
				setIsConsentOk(false);
			}
		}, 3500 );
		
	}, [isConsentOk]);
	
	if (!isConsentOk) {
		return (
			<Consentement>
				<p>Nous utilisons des cookies pour comprendre comment vous interagissez avec notre site. En poursuivant la visite de ce site web, vous consentez à notre utilisation de ces cookies. <a href='https://www.solutionsjustes.org/politique-confidentialite' target='_blank' rel='noreferrer'>Voir notre politique de confidentialité</a></p>
				<div>
					<button
						className='button'
						aria-label='fermer l\u2019avis'
						onClick={onConsentClick}
					>J'ai compris</button>
				</div>
			</Consentement>
		);
	} else {
		return null ;
	}
}