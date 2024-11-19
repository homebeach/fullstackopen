

const Course = ({ name, parts }) => {
  
  const newparts = parts?.map(part =>
    <li key={part.id}>
      {part.name} {part.exercises}
    </li>);

  let total = parts?.reduce(
    (accumulator, part) => accumulator + part.exercises,
    0
  );

  return (
    <div>
    <h1>{name}</h1>
    {newparts}
    <br/>
    <b>total of {total} exercises</b>
    </div>
  )
}

const App = () => {
  const course = {
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
      }
    ]
  }

  return (
    <div>
      <Course name={course.name} parts={course.parts}/>
    </div>
  )
}

export default App