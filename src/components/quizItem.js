import React, {useState, useRef} from 'react';
//import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react';

const Item = styled.div`
	h2 {
		font-size: 1rem;
		font-weight: normal;
		margin-bottom:0;}
		
	&:not(:first-child) > .grid {
		height: 0;
		> div {
			overflow: hidden;
			opacity: 0;
			visibility: hidden;}}
			
	${media.desktopUp`
		> .grid {
			grid-template-columns: 1fr 1fr;
			gap: 0;}
		&:first-child .interaction {
			border-top: 2px solid var(--color-bleu-tres-fonce);}
	`};
`;

const Presentation = styled.div`
	background: white;
	color: var(--color-bleu-tres-fonce);
	padding: var(--v-spacer) var(--h2-spacer);
	border-bottom: 2px solid var(--color-bleu-tres-fonce);
	
	p:not(:first-child) {
		font-size: 1rem;}
	
	${media.desktopUp`
	`};
`;

const Interaction = styled.div`
	background: var(--color-bleu-tres-fonce);
	color: white;
	padding: var(--v-spacer) var(--h2-spacer);
	border-bottom: 2px solid var(--color-bleu-tres-fonce);
	
	.question h3 {
		font-size: 1.5rem;}
		
	.resultat {
		display: grid;
		grid-template-rows: 1fr 1fr; 
	}
	
	${media.desktopUp`
	`};
	
`;

const Choix = styled.div`
	fieldset {
		border: 0;
		margin-inline: auto;
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: center;
		justify-items: space-evenly;}
	input {
		visibilty: hidden;
		display: none;}
		
	label {
		display: block;
		color: white;
		background: #777;
		padding: 0.3em 0.8em;
		border-radius: 0.5em;
		border: 3px dashed transparent;
		font-size: 1rem; 
		&:hover {
			cursor: pointer;}
		&:hover {
			background: var(--color-bleu-clair);}}
	
	&.is-answered {
		label:hover {
			background: #777;
			cursor: unset;}}
	
	${media.desktopUp`
	`};
	
`;

gsap.registerPlugin(useGSAP);

const QuizItem = ({ itemData, itemIndex, onQuizItemChange }) => {
	const [selectedChoice, setSelectedChoice] = useState(null);
	const [arrayIsShuffled, setArrayIsShuffled] = useState(false);
	
	const shuffledChoiceArray = useRef();
	const choixRef = useRef();
	const itemRef = useRef();
	
	const rightAnswerIndex = itemData.choix.findIndex( choix => choix.isRightAnswer === true );
	const rightAnswerId = `${itemData.id}-${rightAnswerIndex}`;
	const rightAnswerText = itemData.choix.filter( choix => choix.isRightAnswer === true )[0].text;
	
	if ( !arrayIsShuffled ) {
		shuffledChoiceArray.current = itemData.choix.sort((a, b) => 0.5 - Math.random());
		setArrayIsShuffled(true);
	}
	
	const { contextSafe } = useGSAP({ scope: itemRef });
	
	// event handlers
	const onOptionChange = contextSafe( (clickedChoiceId) => {
		setSelectedChoice(clickedChoiceId);
		
		if (clickedChoiceId === rightAnswerId ) {
			onQuizItemChange('bonne');
		} else {
			onQuizItemChange('mauvaise');
		}
		
		const choixRefElem = choixRef.current;
		const itemRefElem = itemRef.current;
		
		choixRefElem.classList.add('is-answered');
		choixRefElem.querySelector('fieldset').setAttribute('disabled', '');
		
		// Selected wrong answer becomes red
		gsap.to( itemRefElem.querySelector(`label[for=${clickedChoiceId}]:not([for=${rightAnswerId}])`), {
			backgroundColor: 'var(--color-rouge)',
			duration: 0.5
		});
		
		// Right aswwer becomes green
		gsap.to( itemRefElem.querySelector(`label[for=${rightAnswerId}]`), {
			backgroundColor: 'white',
			color: 'var(--color-bleu-tres-fonce)',
			duration: 0.5,
			delay: 0.5
		});
		
		// Explanation text appears
		gsap.from( itemRefElem.querySelectorAll('.resultat p'), {
			autoAlpha: 0,
			duration: 1,
			stagger: 0.5,
			delay: 1
		});
		
	});
	
	return (
		<Item 
			className='quiz-item' 
			id={`quiz-item-${itemData.id}`}
			ref={itemRef}
		>
			<div className='grid'>
				<Presentation className='presentation'>
					<h2><span>{itemIndex + 1} - </span> {itemData.title}</h2>
					<div className='situation'>
						{ itemData.situation.map( (paragraphe, index) => <p key={index}>{paragraphe}</p>)}
					</div>
				</Presentation>
			
				<Interaction className='interaction'>
					<div className='question'>
						<h3>{itemData.question}</h3>
					</div>
					<Choix ref={choixRef}>
						{ arrayIsShuffled === true ? 
							<fieldset id={`input-radio-${itemData.id}`}>
								{ shuffledChoiceArray.current.map( (choix, index) => {
									const choiceId = `${itemData.id}-${index}`;
									return (
										<div key={choiceId} className='choix-unique'>
											<input 
												type='radio' 
												id={choiceId} 
												name='statut' 
												value={choix.text}
												onChange={ () => onOptionChange(choiceId) }
											/>
											<label 
												htmlFor={choiceId}
												className={ choiceId == selectedChoice ? 'selected' : '' }
											>
												{choix.text}
											</label>
										</div>
								)})}
							</fieldset>
						: '...' }
					</Choix>
					<div className='resultat'>
						<p className='answer'>
							{ selectedChoice == rightAnswerId ? 
								`Bien vu ! Cette personne est bien ${rightAnswerText}.`
							: ''} 
							
							{ selectedChoice != rightAnswerId && selectedChoice !== null ?
								`Oups ! En vérité, cette personne est ${rightAnswerText}.`
							: <span>&nbsp;</span> }
						</p>
						
						<p className='explication'>
							{ selectedChoice !== null ? 
								itemData.explications
								: <span>&nbsp;</span> }
						</p>
					</div>
				</Interaction>
			</div>
		</Item>
	);
}
	
export default QuizItem;