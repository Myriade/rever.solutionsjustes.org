import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'
import { media } from '../styles/mixins.js'
import '../styles/globals.scss'

import CookieConsent from '../components/cookieConsent'

import { gsap } from 'gsap'
import { useGSAP } from '@gsap/react'

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
    text-transform: uppercase;
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

export default function PageLayout({ children }) {
  return (
    <>
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
        <div className='loading-placeholder'>
          <img src='/logo.jpg' />
        </div>
      </Main>
      
      <Footer>
        <p>Numéro d'organisme de bienfaisance enregistré : 107718868 RR 0001</p>
        <p>Copyright © 2024 <a href='https://www.solutionsjustes.org/'>Solutions Justes</a></p>
      </Footer>
      
      <CookieConsent />
      
    </>
  )
}

export const Head = () => {
  <>
    <html lang="fr" />
  </>
};

