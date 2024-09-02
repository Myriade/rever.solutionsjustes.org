import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import '../styles/globals.scss'
import { media } from '../styles/mixins.js'

import TempProtectLayout from './TempProtectLayout.js';

const Header = styled.header`
  position: fixed;
  top: 0;
  height: 4rem;
  width: 100%;
  background: #3d728d;
  padding: 1.5rem 2vw;
  display: flex;
  justify-content: space-between;
  gap: 2rem;
  
  .internal-nav {
    display: flex;
    gap: 1rem;}
  
  a {
    color: white;
    text-decoration: none;
    &:hover {
      text-decoration: underline;}
  }
`;

const Main = styled.main`
  margin-top: 4rem;
`

export default function PageLayout({ children }) {
  return (
    <TempProtectLayout>
      <div>
      
        <Header>
          <a  href='https://www.solutionsjustes.org/' target='_blank' rel='noreferrer'>
            Solutions Justes
          </a>
          <div className='internal-nav'>
            <Link to='/'>Rêver</Link>
            <Link to='/connaitre'>Connaître</Link>
            <Link to='/quiz'>Quiz</Link>
          </div>
        </Header>
        
        <Main> 
          {children} 
        </Main>
        
        <footer
          style={{
            position: 'fixed',
            bottom: '0',
            width: '100%',
            background: 'white',
            textAlign: 'center'
          }}
        >
          <p>Bas de page</p>
        </footer>
        
      </div>
    </TempProtectLayout>
  )
}

export const Head = () => {
  <>
    <html lang="fr" />
  </>
};

