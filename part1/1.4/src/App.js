const App = () => {
  const course = 'Half Stack application development';

  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10,
    },
    {
      name: 'Using props to pass data',
      exercises: 7,
    },
    {
      name: 'State of a component',
      exercises: 14,
    },
  ];

  const Header = ({ course }) => (
    <div>
      <h1>{course}</h1>
    </div>
  );

  const Part = ({ name, exercises }) => (
    <p>
      {name} {exercises}
    </p>
  );

  const Content = ({ parts }) => (
    <div>
      {parts.map((part, index) => (
        <Part key={index} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );

  const Total = ({ parts }) => (
    <div>
      <p>Number of exercises {parts.reduce((sum, part) => sum + part.exercises, 0)}</p>
    </div>
  );

  return (
    <div>
      <Header course={course} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;