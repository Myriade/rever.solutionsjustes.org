import React, {useState, useRef} from "react"
import { StaticImage } from "gatsby-plugin-image"
import { Link } from 'gatsby'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react'
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

import StatutsImmigrationList from './statutsImmigrationList'
import HistoiresList from './histoiresList'
import PartenairesLogoList from './partenairesLogoList'
import DonsImpactTabs from './donsImpactsTabs'
import CopyLinkButton from './copyLinkButton'

const Section1Hero = styled.div`
	width: 100%;
	padding: initial !important;
	display: grid;
	
 .bg-image, .overlay-text {
		height: calc(40vh - var(--header-height));
		grid-area: 1/1/2/2;
		width: 100%;}
		
	.bg-image {
		height: calc(40vh - var(--header-height));}
		
	.overlay-text {
		position: relative;}
	
	h1 {
		height: calc(40vh - var(--header-height));
		font-size: calc( (40vh - var(--header-height) - 10vh) / 3 );
		color: white;
		line-height: 1em;
		text-transform: uppercase;
		margin: 0 var(--h-spacer);
		display: grid;
		align-items: center;
		
		span {
			display: block;
			&.right {
				text-align: right;}}}
	
	${media.mediumUp`
		.bg-image {
			height: calc(95vh - var(--header-height));}
		h1 {
			height: calc(95vh - var(--header-height));
			font-size: clamp(25px, 12vw, 22vh);
		}
	`};
`;

const Section2Intro = styled.section`
	.grid {
		gap: var(--v-h2-spacer);}
		
	h2, p {
		margin-block: 0;}
		
	h2 {
		font-size: clamp(22px, 1.75vw, 1.75rem);
		max-width: 21ch;
		font-weight: 600;
		line-height: 1.12;
		text-transform: initial;}
		
	${media.mediumUp`
		.grid {
			grid-template-columns: 1fr 1fr;}
		
		h2 {
			max-width: 30ch;}
	`};
	
	.button {
		margin-top: var(--v-spacer);}
`;

const Section3Statuts = styled.section`
	background: var(--color-bleu-tres-pale);
	
	h2, p {
	margin-block: 0;}
		
	.grid {
		gap: var(--v-h2-spacer);}
	
	${media.mediumUp`
		.grid {
			grid-template-columns: 1fr 1fr;}
		
		h2 {
			max-width: initial;}
	`};
	
	p {
		font-size: 1.2rem;
		line-height: 1.35;}
`;

const Section5Video = styled.section`
	background: var(--color-bleu-clair);
	h2 {
		color: white;
		max-width: 35ch;}
	p {
		color: white;}
		
	iframe {
		width: 100%;
		height: 51vw;}
	
	${media.mediumUp`
		iframe {
			height: 70vh;}
	`}
`;

const Section6Agir = styled.section`
	.grid {
		display: grid;
		gap: calc(var(--v-spacer) / 2) var(--h-spacer);
		margin-inline: -1vw;
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

const Section8Apropos = styled.section`
	.grid {
		gap: var(--v-h2-spacer);}
	 
	h2 {
		margin-block: 0 var(--h-spacer);}
	
	p {
		margin-block: 1rem;
		max-width: 39ch;}
	
	${media.mediumUp`
		.grid {
			grid-template-columns: 1fr 1fr;}
	`}
`;

const localisedText = {
	fr: {
		partager: 'Partager',
		ou: 'ou partager par'
	},
	en: {
		partager: 'Share',
		ou: 'or share by'
	}
}

const Accueil = ({lang, textData}) => {
	const [shareTooltipOn, setShareTooltipOn] = useState(false);
	
	const gsapContainerRef = useRef();
	const { contextSafe } = useGSAP({ scope: gsapContainerRef });
	gsap.registerPlugin(useGSAP);
	gsap.registerPlugin(ScrollToPlugin);
	
	const shortcutClickHandler = contextSafe(() => {
		gsap.to( window, { duration: 1, scrollTo: '#agir' });
	});
	
	const shareClickHandler = contextSafe(() => {
		if (!shareTooltipOn) {
			gsap.to( '.tooltip', { duration: 0.5, opacity: 1, height: 'auto' });
			setShareTooltipOn(true);
		} else {
			gsap.to( '.tooltip', { duration: 0.5, opacity: 0, height: 0 });
			setShareTooltipOn(false);
		}
	});
	
	const shareUrl = 'https://rever.solutionsjustes.org'
	
	return (
		<div ref={gsapContainerRef} id='gsap-container'>
			<Section1Hero>
				<StaticImage 
					className='bg-image'
					src='../images/grand-portrait-Said.webp'
					layout='fullWidth'
					alt='portrait de Said'
					placeholder='blurred'
					quality={100}
				/>
				<div className='overlay-text'>
					<h1 dangerouslySetInnerHTML={{ __html: textData.t1 }} />
				</div>
			</Section1Hero>
			
			<Section2Intro>
				<div className='grid'>
					<h2>{textData.t2}</h2>
					<div>
						<p>{textData.p2}</p>
						<button 
							className='button soutenir'
							onClick={shortcutClickHandler}
						>
							{textData.b2}
						</button>
					</div>
				</div>
			</Section2Intro>
			
			<Section3Statuts>
				<div className='grid'>
					<h2>{textData.t3}</h2>
					<p>{textData.p3}</p>
				</div>
				<StatutsImmigrationList lang={lang}/>
			</Section3Statuts>
			
			<HistoiresList textData={textData} lang={lang} />
			
			<Section5Video id='video'>
				<div>
					<h2>{textData.t5}</h2>
					<div className="video">
						<iframe
							src='https://www.youtube-nocookie.com/embed/yL-fwv2Z3rE?si=HFvBzDUZJMr3zBiu&rel=0' 
							title='De toi à moi: témoignage d’une personne sans statut d’immigration.'
							width="1120" height="630" 
							allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
							frameBorder="0"
							webkitallowfullscreen="true"
							mozallowfullscreen="true"
							allowFullScreen
							referrerPolicy='strict-origin-when-cross-origin'
						/>
					</div>
				</div>
			</Section5Video>
			
			<Section6Agir id='agir'>
				<h2>{textData.t6}</h2>
				<div className='grid'>
					<div className='donner'>
						<div className='intro'>
							<h3>1. {textData.t6a}</h3>
							<p>{textData.p6a}</p>
						</div>
						<DonsImpactTabs textData={textData} />
					</div>
					
					<div className='sensibiliser'>
						<h3>2. {textData.t6b}</h3>
						<p>{textData.p6b}</p>
						<Link to={lang === 'f' ? '/connaitre' : '/en/learn'} className='button centered'>
							{textData.b6b}
						</Link>
					</div>
					
					<div className='partager'>
						<h3>3. {textData.t6c}</h3>
						<p>{textData.p6c}</p>
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
								{textData.b6c}
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
			</Section6Agir>
			
			<PartenairesLogoList titre={textData.t7}/>
			
			<Section8Apropos id='a-propos' className='grid'>
				<div className='grid'>
					<div>
						<h2>{textData.t8}</h2>
						<p>{textData.p8a}</p>
						<p dangerouslySetInnerHTML={{ __html: textData.p8b }} />
					</div>
					<div>
						<StaticImage 
							src='../images/MCM_Visuel-Histoire.png'
							placeholder='dominantColor'
							alt='MCM portrait d\u2019archive, équipe'
							style={{borderRadius: 'var(--border-radius)'}}
						/>
					</div>  
				</div>
			</Section8Apropos>
		</div>
	)
}

export default Accueil
