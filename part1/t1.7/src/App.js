import { useState } from 'react'
import Button from 'react-bootstrap/Button';

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
      <h1>statistics</h1>
      <p>good { good }</p>
      <p>neutral { neutral }</p>
      <p>bad { bad }</p>
      <p>all { good + neutral + bad }</p>
      <p>avg { (good + neutral + bad) / 3 }</p>
      <p>positive { good / (good + neutral + bad) }</p>

    </div>
  )
}

export default App