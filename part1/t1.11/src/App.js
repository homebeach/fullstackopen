import { useState } from 'react'
import Button from 'react-bootstrap/Button';

const Statistics = ({ good, neutral, bad }) => {

  if (good > 0 || neutral > 0 || bad > 0) {
    return (
      <table>
        <thead>
          <tr>
            <th>Feedback type</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Good</td>
            <td>{ good }</td>
          </tr>
          <tr>
            <td>Neutral</td>
            <td>{ neutral }</td>
          </tr>
          <tr>
            <td>Bad</td>
            <td>{ bad }</td>
          </tr>
          <tr>
            <td>All</td>
            <td>{ good + neutral + bad }</td>
          </tr>
          <tr>
            <td>Avg</td>
            <td>{ (good + neutral + bad) / 3 }</td>
          </tr>
          <tr>
            <td>Positive</td>
            <td>{ good / (good + neutral + bad) }</td>
          </tr>
        </tbody>
      </table>
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