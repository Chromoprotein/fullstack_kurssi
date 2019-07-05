import React from 'react'

const Course = ({course}) => {
    return (
        <div>
        <Header kurssi={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({kurssi}) => {
    return (
        <h1>
          {kurssi}
        </h1>
    )
}

const Content = ({parts}) => {

    const rows = () => parts.map((part, index) =>
        <Part key={index}
            osa={part.name}
            tehtavamaara={part.exercises}
        />
    )

    return (
      <>
        {rows()}
      </>
    )
}

const Total = ({parts}) => {

    let exercises = 0
    parts.map(part =>
        exercises = exercises + part.exercises
    )

    return (
        <p>
          yhteensä {exercises} tehtävää
        </p>
    )
}

const Part = ({osa, tehtavamaara}) => {
    return (
        <p>
          {osa} {tehtavamaara}
        </p>
    )
}

export default Course