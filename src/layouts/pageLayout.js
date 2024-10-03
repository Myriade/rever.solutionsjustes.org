import React, { useState, useEffect } from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import { media } from '../styles/mixins.js'

import '../styles/globals.scss'

import TempProtectLayout from './TempProtectLayout.js';

const Header = styled.header`
  position: fixed;
  top: 0;
  height: var(--header-height);
  width: 100%;
  background: var(--color-bleu-tres-fonce);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
  z-index: 50;
  padding-inline: 3vw;
  
  .internal-nav {
    display: flex;
    gap: 1rem;}
  
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;}
    &.active {
      font-weight: 300;
      &:hover {
        text-decoration: none;
        cursor: default;
      }
    }}
  
`;

const Main = styled.main`
  overflow: hidden;
  margin-top: var(--header-height);
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

export default function PageLayout({ children }) {
  const [isConsentOk, setIsConsentOk] = useState(null);
  
  useEffect( () => {
    let localConsent = localStorage.getItem('cookiesConsent');
    
    if ( !localConsent && !isConsentOk ) {
      // if there is no local value stored and the state is false, set the local value to 'false' (string)
      localStorage.setItem('cookiesConsent', 'false'); 
    } else if ( localConsent === 'false' && isConsentOk ) { 
      // if the local stored value is 'false' but the state is true, set the local value to 'true'
      localStorage.setItem('cookiesConsent', 'true');
    } else if ( localConsent === 'true' ) {
      // if the local stored value is 'true', set the state to true (user had already visited the site)
      setIsConsentOk(true);
    }
  }, [isConsentOk]);
  
  return (
    <TempProtectLayout>
      <Header>
        <a 
          href='https://www.solutionsjustes.org/'
          title='Solutions Justes MCM'
          className='sj-logo'
        >
          <StaticImage 
            src='../images/logo-horizontal.svg'
            placeholder='#282560'
            alt='Solutions Justes'
            style={{maxWidth: '180px'}}
          />
        </a>
        <div className='internal-nav'>
          <Link to='/' activeClassName='active'>Rêver</Link>
          <Link to='/connaitre' activeClassName='active'>Connaître</Link>
        </div>
      </Header>
      
      <Main> 
        {children} 
      </Main>
      
      <Footer>
        <p>Numéro d'organisme de bienfaisance enregistré : 107718868 RR 0001</p>
        <p>Copyright © 2024 <a href='https://www.solutionsjustes.org/'>Solutions Justes</a></p>
      </Footer>
      
      { !isConsentOk ? 
        <Consentement>
          <p>Nous utilisons des cookies pour comprendre comment vous interagissez avec notre site. En poursuivant, vous consentez à notre utilisation de ces cookies. <a href='https://www.solutionsjustes.org/politique-confidentialite' target='_blank' rel='noreferrer'>Voir notre politique de confidentialité</a></p>
          <div>
            <button
              className='button'
              aria-label='fermer l\u2019avis'
              onClick={ () => { setIsConsentOk(true) } }
            >J'ai compris</button>
          </div>
        </Consentement>
        : ''
      }
        
    </TempProtectLayout>
  )
}

export const Head = () => {
  <>
    <html lang="fr" />
  </>
};

