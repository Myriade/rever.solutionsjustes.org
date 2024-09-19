import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

import '../styles/globals.scss'
import { media } from '../styles/mixins.js'

import { gsap } from "gsap";
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
      text-decoration: underline;}}
  
  .sj-logo svg {
    width: auto;
    height: 4rem;}
  
`;

const Main = styled.main`
  margin-top: var(--header-height);
`

const Footer = styled.footer`
  height: var(--footer-height);
  padding-block: 0.5rem;
  width: 100%;
  background: var(--color-bleu-tres-fonce);
  color: white;
  text-align: center;
`;

export default function PageLayout({ children }) {
  
  useGSAP(() => {
    //gsap
  });
  
  return (
    <TempProtectLayout>
      <div>
      
        <Header>
          <a 
            href='https://www.solutionsjustes.org/' 
            target='_blank' rel='noreferrer' 
            title='Solutions Justes MCM'
            className='sj-logo'
          >
            <StaticImage 
              src='../images/logo-horizontal.svg'
              placeholder='dominantColor'
              alt='Solutions Justes'
              style={{maxWidth: '120px'}}
            />
          </a>
          <div className='internal-nav'>
            <Link to='/'>Rêver</Link>
            <Link to='/connaitre'>Connaître</Link>
            <Link to='/quiz'>Derrière les statuts</Link>
          </div>
        </Header>
        
        <Main> 
          {children} 
        </Main>
        
        <Footer>
          Bas de page
        </Footer>
        
      </div>
    </TempProtectLayout>
  )
}

export const Head = () => {
  <>
    <html lang="fr" />
  </>
};

