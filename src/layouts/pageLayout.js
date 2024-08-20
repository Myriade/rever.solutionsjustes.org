import React from 'react'
import { Link } from 'gatsby'
// import styled from 'styled-components'

import '../styles/globals.css'
//import '../styles/globals.scss'
//import { media } from '../styles/mixins.js'

import TempProtectLayout from './TempProtectLayout.js';

export default function PageLayout({ children }) {
  return (
    <TempProtectLayout>
      <div>
      
        <header
          style={{
            position: 'fixed',
            top: '0',
            height: '1.5rem',
            width: '100%',
            background: 'white',
            textAlign: 'center'
          }}
        >
          <p><Link to='/'>Landing</Link> <Link to='/connaitre'>Connaître</Link> <Link to='/quiz'>Quiz</Link></p>
        </header>
        
        <main
          style={{
            marginTop: '5rem',
            paddingInline: '10vw',
          }}
        > 
          {children} 
        </main>
        
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

