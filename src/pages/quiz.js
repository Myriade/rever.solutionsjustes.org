import React from 'react'
import PageLayout from '../layouts/pageLayout'

const QuizPage = () => {
  return (
    <PageLayout>
      <h1>Quiz</h1>
      <p>Testez vos connaissances à propos des status d'immigration</p>
    </PageLayout>
  )
}

export default QuizPage

export const Head = () => <title>Quiz | Solutions justes</title>
