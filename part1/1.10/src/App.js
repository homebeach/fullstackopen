import { useState } from 'react'
import Button from 'react-bootstrap/Button'

const Statistics = ({ good, neutral, bad }) => {

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <StatisticLine text="good" value = { good } />
        <StatisticLine text="neutral" value = { neutral } />
        <StatisticLine text="bad" value = { bad } />
        <StatisticLine text="all" value = { good + neutral + bad } />
        <StatisticLine text="avg" value = { (good + neutral + bad) / 3 } />
        <StatisticLine text="positive" value = { good / (good + neutral + bad) } />
      </div>
    )
  }
  return (
    <div>
      <p>No feedback given</p>
    </div>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)


  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => setGood(good + 1)}>good</Button>
      <Button onClick={() => setNeutral(neutral + 1)}>neutral</Button>
      <Button onClick={() => setBad(bad + 1)}>bad</Button>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App