import React from 'react'
import { Link } from 'gatsby'
import { StaticImage } from 'gatsby-plugin-image'
import styled from 'styled-components'

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
  
  .sj-logo svg {
    background: var(--color-bleu-tres-fonce)
    width: auto;
    height: 4rem;}
  
`;

const Main = styled.main`
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

export default function PageLayout({ children }) {
  
  return (
    <TempProtectLayout>
      <div>
      
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
              style={{maxWidth: '120px'}}
            />
          </a>
          <div className='internal-nav'>
            <Link to='/' activeClassName='active'>Rêver</Link>
            <Link to='/connaitre' activeClassName='active'>Connaître</Link>
            <Link to='/quiz' activeClassName='active'>Derrière les statuts</Link>
          </div>
        </Header>
        
        <Main> 
          {children} 
        </Main>
        
        <Footer>
          <p>Numéro d'organisme de bienfaisance enregistré : 107718868 RR 0001</p>
          <p>Copyright © 2024 <a href='https://www.solutionsjustes.org/'>Solutions Justes</a></p>
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

