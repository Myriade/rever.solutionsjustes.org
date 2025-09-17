import React, {useState, useRef} from "react"
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'

const Section1Hero = styled.div`
	width: 100%;
	padding: initial !important;
	display: grid;
	
	${media.mediumUp``};
`;

const localisedText = {
	fr: {
	},
	en: {
	}
}

const PEnracinee = ({lang, texts}) => {
	const [shareTooltipOn, setShareTooltipOn] = useState(false);
	const gsapContainerRef = useRef();
	
	return (
		<div ref={gsapContainerRef} id='gsap-container'>
			<Section1Hero>
				<h1>Bannière</h1>
				<p>image, titre, bouton sortie rapide</p>
			</Section1Hero>
			<div>
				<h2>{texts.bloc1.titre}</h2>
			</div>
			<div>
				<h2>{texts.bloc2.titre}</h2>
			</div>
		</div>
	)
}

export default PEnracinee
