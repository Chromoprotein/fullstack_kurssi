import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Statistic = ({ text, value }) => <p>{text} {value}</p>

const Statistics = ({ good, neutral, bad}) => {

    const totalFeedback = () => good + neutral + bad
    const averageFeedback = () => (good - bad)/totalFeedback()
    const goodPercentage = () => good/totalFeedback()*100 + ' %'

    if (totalFeedback() === 0) {
        return (
            <div>
                <h1>Statistiikka</h1>
                <p>Ei yhtään palautetta annettu</p>
            </div>
        )
    }
    else {
        return (
            <div>
                <h1>Statistiikka</h1>
                <Statistic text="Hyvä" value={good}/>
                <Statistic text="Neutraali" value={neutral}/>
                <Statistic text="Huono" value={bad}/>
                <Statistic text="Yhteensä" value={totalFeedback()}/>
                <Statistic text="Keskiarvo" value={averageFeedback()}/>
                <Statistic text="Positiivisia" value={goodPercentage()}/>
            </div>
    
        )
    }

}

const Button = ({ handleClick, text }) => <button onClick={handleClick}>{text}</button>

const App = () => {

    const [feedback, setFeedback] = useState({
        good: 0, neutral: 0, bad: 0
    })

    const handleGood = () => {
        setFeedback({ ...feedback, good: feedback.good +1})
    }

    const handleNeutral = () => {
        setFeedback({ ...feedback, neutral: feedback.neutral +1})
    }

    const handleBad = () => {
        setFeedback({ ...feedback, bad: feedback.bad +1})
    }

  return (
    <div>
        <h1>Anna palautetta</h1>
        
        <Button handleClick={handleGood} text='Hyvä' />
        <Button handleClick={handleNeutral} text='Neutraali' />
        <Button handleClick={handleBad} text='Huono' />

        <Statistics good={feedback.good} neutral={feedback.neutral} bad={feedback.bad} />

    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)