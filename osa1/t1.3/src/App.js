const App = () => {

  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }  
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }  
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }  

  const Header = (props) => (
    <div>
      <h1>{props.course}</h1>
    </div>
  )

  const Part = (props) => (
    <p>
      {props.part.name} {props.part.exercises}
    </p>
  )

  const Content = () => (
    <div>
      <Part part={part1}/>
      <Part part={part2}/>
      <Part part={part3}/>
    </div>
  )

  const Total = (props) => (
    <div>
      <p>Number of exercises {props.exercises1 + props.exercises2 + props.exercises3}</p>
    </div>
  )  

  return (
    <div>
      <Header course={course}/>
      <Content/>
      <Total exercises1={part1.exercises} exercises2={part2.exercises} exercises3={part3.exercises}/>
    </div>
  )
}

export default App