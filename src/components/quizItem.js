import React, {useState, useEffect, useRef} from 'react';
import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';

const Item = styled.div`
	h2 {
		font-size: 1rem;
		font-weight: normal;
		margin-bottom:0;}
		
	li p {
		margin-block: 0;
		font-size: inherit;
		&:first-child {
			font-weight: inherit;}
	}
		
	&:not(:first-child) > .grid {
		height: 0;
		> div {
			overflow: hidden;
			opacity: 0;
			visibility: hidden;}}
			
	${media.desktopUp`
		background: linear-gradient(to right, white, white 50%, var(--color-bleu-tres-fonce) 50%, var(--color-bleu-tres-fonce) 100%);
		> .grid {
			grid-template-columns: 1fr 1fr;
			gap: 0;}
		.interaction {
			display: grid;
			align-content: center;
		}
		&:first-child .interaction {
			border-top: 2px solid var(--color-bleu-tres-pale);}
	`};
`;

const Presentation = styled.div`
	background: white;
	color: var(--color-bleu-tres-fonce);
	padding: var(--v-spacer) var(--h2-spacer);
	border-bottom: 2px solid var(--color-bleu-tres-pale);
	
	.grid {
		grid-template-columns: min-content auto;
		align-items: center;
		gap: var(--h-spacer);
		.cercle {
			border: 1px solid var(--color-bleu-clair);
			border-radius: 50%;
			width: 96px;
			height: 96px;
			display: grid;
			justify-items: center;
			align-items: center;
			position: relative;}
		.number {
			position: absolute;
			top: -4px;
			left: 0;
			color: var(--color-bleu-clair);
			font-size: 1.5rem;
			padding-inline: 0.25em;
			background: white;
			border-radius: 50%;}
		img {
			width: 48px;}}
	
	h2 {
		text-transform: uppercase;
		font-size: clamp(25px, 4vw, 2.5rem);
		line-height: 1.12;
		font-weight: 600;}
	
	p {
		line-height: 1.6;
		&:first-child {
			font-weight: 600;
			b, strong {
				font-weight: 800;}}
		&:not(:first-child) {
			font-size: 1rem;}}
	
	${media.desktopUp`
	`};
`;

const Interaction = styled.div`
	background: var(--color-bleu-tres-fonce);
	color: white;
	padding: var(--v-spacer) var(--h2-spacer);
	border-bottom: 2px solid var(--color-bleu-tres-pale);
	
	.question h3 {
		font-size: 1.2rem;
		text-align: center;
		line-height: 1.6;}
		
	.resultat {
		height: 0;
		overflow: hidden;
		text-align: center;
		margin-top: 1rem;
		color: var(--color-bleu-tres-fonce);
		border-radius: var(--border-radius);
		padding: 1rem 2rem;
		grid-template-rows: 1fr 1fr;}
	
	.answer p {
		margin-block: 0;
		font-weight: 600;
		&:first-child {
			font-size: 1.75rem;}}
			
	.explication {
		p:not(:first-child) {
			font-size: 1rem;}
		a {
			background: var(--color-bleu-tres-pale);
			border-radius: calc(var(--border-radius) / 2);
			padding: 0.25em 0.5em;
		}
	}
	
	${media.desktopUp`
	`};
	
`;

const Choix = styled.div`
	fieldset {
		border: 0;
		margin-inline: auto;
		display: grid;
		gap: 1rem;
		justify-content: center;}
	input {
		visibilty: hidden;
		display: none;}
		
	label {
		display: block;
		background: white;
		color: var(--color-bleu-tres-fonce);
		padding: 0.3em 1.5em;
		border-radius: 0.5em;
		font-size: 1rem; 
		font-weight: 600;
		display: flex;
		gap: 1.75rem;
		align-items: center;
		span {
			flex-shrink: 0;
			background: var(--color-bleu-clair);
			color: white;
			font-weight: 800;
			border-radius: 50%;
			width: 40px;
			height: 40px;
			display: grid;
			justify-items: center;
			align-items: center;}
		&:hover {
			cursor: pointer;
			background: var(--color-bleu-clair);
			color: white;
			span {
				background: white;
				color: var(--color-bleu-clair);}}}
	
	&.is-answered {
		label:hover {
			cursor: unset;
			background: white;
			color: var(--color-bleu-tres-fonce);
			span {
				background: var(--color-bleu-clair);
				color: white;
			}
		}
	}
	
	${media.desktopUp`
	`};
	
`;

gsap.registerPlugin(useGSAP);

const QuizItem = ({ itemData, itemIndex, onQuizItemChange }) => {
	const [selectedChoice, setSelectedChoice] = useState(null);
	const [arrayIsShuffled, setArrayIsShuffled] = useState(false);
	const [choixArray, setChoixArray] = useState(null);
	
	const shuffledChoiceArray = useRef();
	const choixRef = useRef();
	const itemRef = useRef();
	let rightAnswerId = useRef();
	let rightAnswerText = useRef();
	
	function extractLisTags(htmlString) {
			// Create a DOM parser to parse the HTML string
			const parser = new DOMParser();
			
			// Parse the HTML string into a document object
			const doc = parser.parseFromString(htmlString, 'text/html');
			
			// Find all li elements
			const listElems = doc.querySelectorAll('li');
			
			// Map over the paragraphs and return their text content
			return Array.from(listElems).map( (li, index) => { 
				const liString = li.innerHTML;
				const strippedHtmlTagsString = liString.replace(/(<([^>]+)>)/gi, "");
				return {
					text: strippedHtmlTagsString,
					originalIndex: index
				};
			});
	}
	
	useEffect( () => {
		if (!choixArray) { 
			const parsedChoixList = extractLisTags(itemData.choixDeRponses);
			setChoixArray(parsedChoixList) 
		}
		
		if ( !arrayIsShuffled && choixArray ) {
			const rightAnswerIndex = itemData.bonneRponse - 1;
			rightAnswerId.current = `question${itemIndex + 1}-reponse${itemData.bonneRponse}`;
			rightAnswerText.current = choixArray[rightAnswerIndex].text;
			
			shuffledChoiceArray.current = choixArray.sort((a, b) => 0.5 - Math.random());
			setArrayIsShuffled(true);
		}
	}, [choixArray, arrayIsShuffled]);
	
	const { contextSafe } = useGSAP({ scope: itemRef });
	
	// event handlers
	const onOptionChange = contextSafe( (clickedChoiceId) => {
		setSelectedChoice(clickedChoiceId);
		
		if (clickedChoiceId === rightAnswerId.current ) {
			onQuizItemChange('bonne');
		} else {
			onQuizItemChange('mauvaise');
		}
		
		const choixRefElem = choixRef.current;
		const itemRefElem = itemRef.current;
		
		choixRefElem.classList.add('is-answered');
		choixRefElem.querySelector('fieldset').setAttribute('disabled', '');
		
		let tl = gsap.timeline();
		
		// Selected wrong answer becomes red
		tl.to( itemRefElem.querySelector(`label[for=${clickedChoiceId}]:not([for=${rightAnswerId.current}])`), {
			backgroundColor: '#F15959',
			duration: 0.5
		});
		
		// Right answer becomes bleu
		tl.to( itemRefElem.querySelector(`label[for=${rightAnswerId.current}]`), {
			backgroundColor: '#1e8ed2',
			color: 'white',
			duration: 0.5,
		}, '<');
		
		tl.to( itemRefElem.querySelector(`label[for=${rightAnswerId.current}] span`), {
			backgroundColor: 'white',
			color: '#1e8ed2',
			duration: 0.5,
		}, '<');
		
		// Explanation text appears
		tl.to( itemRefElem.querySelectorAll('.resultat'), {
			height: 'auto',
			backgroundColor: 'white',
			duration: 1.5,		
		});
		
	});
	
	// Image url extraction
	let imageSrc = '/logo.jpg';
	if (itemData.illustration) { 
		imageSrc = convertImageUrl(itemData.illustration) 
	}
	
	return (
		<Item 
			className='quiz-item' 
			id={`quiz-item-${itemIndex}`}
			ref={itemRef}
		>
			<div className='grid'>
				<Presentation className='presentation'>
					<div className='grid'>
						<div className='cercle'>
							<div className='number'>{itemIndex + 1}</div>
							<img src={imageSrc} alt='Illustration portrait' />
						</div>
						<h2>{itemData.title}</h2>
					</div>
					<div className='situation' dangerouslySetInnerHTML={{ __html: itemData.texteDeLaSituation }} />
				</Presentation>
			
				<Interaction className='interaction'>
					<div className='question'>
						<h3>Selon vous,<br/> cette personne est dans quelle situation&nbsp;?</h3>
					</div>
					
					<Choix ref={choixRef} className='choix'>
						{ arrayIsShuffled === true ? 
							<fieldset id={`input-radio-${itemData._id}`}>
								{ shuffledChoiceArray.current.map( (choix, index) => {
									const choiceId = `question${itemIndex + 1}-reponse${choix.originalIndex + 1}`;
									return (
										<div key={choiceId} className='choix-unique'>
											<input 
												type='radio' 
												id={choiceId} 
												name='statut' 
												value={choix.originalIndex}
												onChange={ () => onOptionChange(choiceId) }
											/>
											<label 
												htmlFor={choiceId}
												className={ choiceId == selectedChoice ? 'selected' : '' }
											>
												<span>{index === 0 && 'A'}{index === 1 && 'B'}{index === 2 && 'C'}</span> Elle {choix.text}.
											</label>
										</div>
								)})}
							</fieldset>
						: '...' }
					</Choix>
					<div className='resultat'>
						<div className='answer'>
							{ selectedChoice == rightAnswerId.current ? 
								(<>
									<p>Effectivement&nbsp;!</p> 
									<p>Cette personne <span className='lowercase'>{rightAnswerText.current}</span>.</p>
								</>)
							: ''} 
							
							{ selectedChoice != rightAnswerId.current && selectedChoice !== null ?
								(<>
									<p>Oups !</p>
									<p>En vérité, cette personne <span className='lowercase'>{rightAnswerText.current}</span>.</p>
								</>)
							: '' }
						</div>
						
						{ selectedChoice !== null ? 
							<div className='explication' dangerouslySetInnerHTML={{ __html: itemData.explications }} />
						: <span>&nbsp;</span> }

					</div>
				</Interaction>
			</div>
		</Item>
	);
}
	
export default QuizItem;