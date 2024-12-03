

const Course = ({ name, parts }) => {

  const listedparts = parts?.map(part =>
    <li key={part.id}>
      {part.name} {part.exercises}
    </li>)

  let total = parts?.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  )

  return (
    <div>
    <h1>{name}</h1>
    {listedparts}
    <br/>
    <b>total of {total} exercises</b>
    </div>
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const listedcourses = courses?.map(course =>
       <Course name={course.name} parts={course.parts}/>
    )

  return (
    <div>
          {listedcourses}
    </div>
  )
}

export default App