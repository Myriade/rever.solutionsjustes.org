import React from 'react';
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
	
	${media.desktopUp`
	`};
	
`;

const Resultat = styled.div`
	
	${media.desktopUp`
	`};
	
`;

const QuizItem = ({ itemData }) => {
	
	return (
		<section className='quiz-item' id={`quiz-item-${itemData.id}`}>
			<Situation>
				{ 
					// itemData.loading ? 
					// <div className='placeholder-img'>
					// 	<img src='logo.jpg' />
					// </div>
					// : 
					// <img src={imageSrc} alt="Illustration"/>
				}
				<div>
					<h2>{itemData.title}</h2>
					<p>{itemData.situation}</p>
				</div>
			</Situation>
			
			<Question>
				<h3>{itemData.question}</h3>
			</Question>
			
			<Choix>
				<fieldset id={`input-radio-${itemData.id}`}>
					<legend>Sélectionnez la réponse de votre choix</legend>
					{itemData.choix.map( (choix, index) => { return (
						<div key={`choix-${index}`}>
							<input type='radio' id={`choix-${index}`} name='statut' value={choix.text} />
							<label for={`choix-${index}`}>{choix.text}</label>
						</div>
					)})}
				</fieldset>
			</Choix>
			
			<Resultat>
				<p>La bonne réponse est :</p>
				<h4>{itemData.choix.filter( choix => choix.isRightAnswer === true )[0].text}</h4>
				<p>{itemData.explications}</p>
			</Resultat>
		</section>
	);
}
	
export default QuizItem;