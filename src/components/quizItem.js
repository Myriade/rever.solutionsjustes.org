import React, {useState, useRef} from 'react';
//import { convertImageUrl } from '../utils/utils'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

const Situation = styled.div`
	
	${media.desktopUp`
	`};
	
`;

const Question = styled.div`
	
	${media.desktopUp`
	`};
	
`;

const Choix = styled.div`
	fieldset {
		border: 0;
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
		background: var(--color-bleu-tres-fonce);
		padding: 0.5em 1em;
		border-radius: 0.5em;
		font-size: 1.5rem; 
		&:hover {
			cursor: pointer;}
		&:hover, &.selected {
			background: var(--color-bleu-clair);}
	}
	
	${media.desktopUp`
	`};
	
`;

const Resultat = styled.div`
	
	${media.desktopUp`
	`};
	
`;

const QuizItem = ({ itemData }) => {
	const [selectedChoice, setSelectedChoice] = useState(null)
	const rightAnswerIndex = itemData.choix.findIndex( choix => choix.isRightAnswer === true );
	const rightAnswerId = `${itemData.id}-${rightAnswerIndex}`;
	const rightAnswerText = itemData.choix.filter( choix => choix.isRightAnswer === true )[0].text;
	const shuffledChoiceArray = useRef();
	const [arrayIsShuffled, setArrayIsShuffled] = useState(false);
	
	
	if ( !arrayIsShuffled ) {
		shuffledChoiceArray.current = itemData.choix.sort((a, b) => 0.5 - Math.random());
		setArrayIsShuffled(true);
	}
	
	// event handlers
	const onOptionChange = (clickedChoiceId) => {
		setSelectedChoice(clickedChoiceId);
	}
	
	return (
		<section className='quiz-item' id={`quiz-item-${itemData.id}`}>
			<Situation>
				<div>
					<h2>{itemData.title}</h2>
					<p>{itemData.situation}</p>
				</div>
			</Situation>
			
			<Question>
				<h3>{itemData.question}</h3>
			</Question>
			
			<Choix>
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
			
			<Resultat>
				{ selectedChoice == rightAnswerId ? 
					<p>Bien vu ! Cette personne est bien ...</p>
				: '' }
				
				{ selectedChoice != rightAnswerId && selectedChoice !== null ?
					<p>Oups ! En vérité, cette personne est {rightAnswerText}.</p> 
				: '' }
				
				{ selectedChoice !== null ? 
					<p>{itemData.explications}</p>
					: ''
				}
			</Resultat>
		</section>
	);
}
	
export default QuizItem;