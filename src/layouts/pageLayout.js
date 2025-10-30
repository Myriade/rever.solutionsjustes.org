import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import '../styles/globals.scss'
import CookieConsent from '../components/cookieConsent'

const localisedText = [
  {
    fr: {
      to: '/',
      texte: 'Rêver',
      title: "Rêver à l'essentiel"
    },
    en: {
      to: '/en',
      texte: 'Rêver',
      title: "Rêver à l'essentiel"
    }
  },
  {
    fr: {
      to: '/connaitre',
      texte: 'Connaître',
      title: "Connaître l'essentiel"
    },
    en: {
      to: '/en/learn',
      texte: 'Learn',
      title: 'Learn the essentials'
    }
  },
  {
    fr: {
      to: '/quiz',
      texte: 'Quiz',
      title: 'Testez vos connaissances'
    },
    en: {
      to: '/en/quiz',
      texte: 'Quiz',
      title: 'Test your knowledge'
    }
  },
  {
    fr: {
      to: '/en',
      texte: 'En',
      title: 'english'
    },
    en: {
      to: '/',
      texte: 'Fr',
      title: 'français'
    }
  },
  {
    fr: "Numéro d'organisme de bienfaisance enregistré",
    en: "Registered Charity Number"
  }
]

const Header = styled.header`
  position: fixed;
  top: 0;
  height: var(--header-height);
  width: 100%;
  background: var(--color-bleu-tres-fonce);
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  align-items: center;
  gap: 0.3rem 2rem;
  z-index: 50;
  padding-inline: 3vw;
  
  .internal-nav {
    display: flex;
    margin-inline: auto;
    gap: 1rem;}
  
  a {
    color: white;
    text-decoration: none;
    text-transform: uppercase;
    &:hover {
      text-decoration: underline;}
    &.active {
        text-decoration: underline;}}}
        
  ${media.onlySmall`
    .sj-logo {
      max-width: 120px;}
    .internal-nav {
      min-width: 75vw;}
  `}
        
  ${media.mediumUp`
    .sj-logo {
      max-width: 180px;}
    .mirror {
      width: 180px;
      text-align: right;}
  `}
  
`;

const Main = styled.main`
  overflow: hidden;
  margin-top: var(--header-height);
  position: relative;
  
  @keyframes placeholder-animation {
    from { transform: rotate(0deg) }
    to { transform: rotate(360deg) }
  }
  
  .loading-placeholder {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    padding-top: 50px;
    z-index: -1;
    display: grid;
    justify-items: center;
    align-items: bottom;
    
    img {
      width: 10vh;
      height: 10vh;
      animation-name: placeholder-animation;
      animation-duration: 15s;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  }
  
  ${media.mediumUp`
    .loading-placeholder {
      height: calc(95vh - var(--header-height));}
  `}
  
`;

const Footer = styled.footer`
  padding: calc(var(--v-spacer) / 2 ) var(--h-spacer);
  width: 100%;
  background: var(--color-bleu-tres-fonce);
  color: white;
  display: flex;
  gap: 1rem 2rem;
  justify-content: center;
  flex-wrap: wrap;
  p {
    text-align: center;
    margin-block: 0;
    font-size: 0.8rem;}
`;

export default function PageLayout({ children, lang, i18nLink, bgColor }) {
  
  return (
    <>
      <Header>
        <a 
          href='https://www.solutionsjustes.org/'
          title='Site principal de Solutions Justes MCM'
          className='sj-logo'
        >
          <StaticImage 
            src='../images/logo-horizontal.svg'
            placeholder='#282560'
            alt='Solutions Justes'
            layout='constrained'
          />
        </a>
        <nav className='internal-nav'>
          <Link 
            activeClassName='active' 
            to={lang === 'fr' ? localisedText[0].fr.to : localisedText[0].en.to}
            title={lang === 'fr' ? localisedText[0].fr.title : localisedText[0].en.title}
          >
            {lang === 'fr' ? localisedText[0].fr.texte : localisedText[0].en.texte}
          </Link>
          <Link 
            activeClassName='active'
            to={lang === 'fr' ? localisedText[1].fr.to : localisedText[1].en.to}
            title={lang === 'fr' ? localisedText[1].fr.title : localisedText[1].en.title}
          >
            {lang === 'fr' ? localisedText[1].fr.texte : localisedText[1].en.texte}
          </Link>
          <Link 
            activeClassName='active'
            to={lang === 'fr' ? localisedText[2].fr.to : localisedText[2].en.to}
            title={lang === 'fr' ? localisedText[2].fr.title : localisedText[2].en.title}
          >
            {lang === 'fr' ? localisedText[2].fr.texte : localisedText[2].en.texte}
          </Link>
        </nav>
        <div className='mirror'>
          <Link 
            to={i18nLink}
            title={lang === 'fr' ? localisedText[3].fr.title : localisedText[3].en.title}
          >
            {lang === 'fr' ? localisedText[3].fr.texte : localisedText[3].en.texte}
          </Link>
        </div>
      </Header>
      
      <Main
        style={ bgColor ? {background: bgColor} : {background: 'transparent'}}
      >
        {children}
        <div className='loading-placeholder'>
          <img src='/logo.jpg' alt='Solutions Justes, logo' />
        </div>
      </Main>
      
      <Footer>
        <p>{lang === 'fr' ? localisedText[4].fr : localisedText[4].en} : 107718868 RR 0001</p>
        <p>Copyright © 2024 <a href='https://www.solutionsjustes.org/'>Solutions Justes</a></p>
      </Footer>
      
      <CookieConsent lang={lang} />
      
    </>
  )
}

