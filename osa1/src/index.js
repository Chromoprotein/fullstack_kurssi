import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack -sovelluskehitys',
    parts: [
      {
        name: 'Reactin perusteet',
        exercises: 10
      },
      {
        name: 'Tiedonvälitys propseilla',
        exercises: 7
      },
      {
        name: 'Komponenttien tila',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header kurssi={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

const Header = (props) => {
    return (
        <h1>
          {props.kurssi}
        </h1>
    )
}

const Content = (props) => {
    const { parts } = props
    return (
      <>
        <Part osa={parts[0].name} tehtavamaara={parts[0].exercises}/>
        <Part osa={parts[1].name} tehtavamaara={parts[1].exercises}/>
        <Part osa={parts[2].name} tehtavamaara={parts[2].exercises}/>
      </>
    )
}

const Total = (props) => {
    const { parts } = props
    return (
        <p>
          yhteensä {parts[0].exercises + parts[1].exercises + parts[2].exercises} tehtävää
        </p>
    )
}

const Part = (props) => {
    return (
        <p>
          {props.osa} {props.tehtavamaara}
        </p>
    )
}

ReactDOM.render(<App />, document.getElementById('root'))