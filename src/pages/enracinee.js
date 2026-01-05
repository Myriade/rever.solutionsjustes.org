import React, {useState} from 'react'
import PageLayout from '../layouts/pageLayout'
import PEnraciner from '../components/pEnraciner'

const Page = () => {
  
  return (
    <PageLayout>
      <p 
        className='text-centered'
        style={{paddingBlock: '3rem', background: 'white'}}
      ><a href='/enraciner'>Voir la page Enraciner</a></p>
    </PageLayout>
  )
}

export default Page
