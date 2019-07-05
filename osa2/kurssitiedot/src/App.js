import React from 'react';
import Course from './components/Course'

const App = ({courses}) => {

  const rows = () => courses.map((course, index) =>
      <Course key={index} course={course} />
  )

  return (
      <div>
          {rows()}
      </div>
  )
}

export default App;
