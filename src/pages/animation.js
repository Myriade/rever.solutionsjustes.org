import React from 'react'
import PageLayout from '../layouts/pageLayout'
import Animation from '../components/pAnimation'

const Page = () => {
  return (
    <PageLayout lang='fr'>
      
      <div>
        <div>
          <h2>Page juste pour tester une animation vectorielle</h2>
          <h3>Défiler vers le bas 👇 👇</h3>
          <Animation />
        </div>
      </div>
      
    </PageLayout>
  )
}

export default Page