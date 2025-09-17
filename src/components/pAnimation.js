import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

const Styled = styled.section`
		
	${media.mediumUp`
		
	`}
	
`;

export default function PAnimation() {
	return (
		<Styled>
			<p>Test d'animation</p>
		</Styled>
	);
}