import React from 'react'
import { Link } from 'gatsby'
// import styled from 'styled-components'

//import '../styles/globals.scss'
//import { media } from '../styles/mixins.js'

import TempProtectLayout from './TempProtectLayout.js';

export default function PageLayout({ children }) {
  return (
    <TempProtectLayout>
      <div>
      
        <header>
          <p><Link to='/'>Landing</Link> <Link to='/connaitre'>Connaître</Link> <Link to='/quiz'>Quiz</Link></p>
        </header>
        
        <main> {children} </main>
        
        <footer>
          <p>Bas de page</p>
        </footer>
        
      </div>
    </TempProtectLayout>
  )
}

export const Head = () => <html lang="fr" />;

