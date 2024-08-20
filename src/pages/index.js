import * as React from 'react'
import PageLayout from '../layouts/pageLayout'

const IndexPage = () => {
  return (
    <PageLayout>
      <h1>Rêver à l'essentiel</h1>
      <p>microsite en développement</p>
    </PageLayout>
  )
}

export default IndexPage

export const Head = () => <title>Rêver à l'essentiel | Solutions justes</title>
