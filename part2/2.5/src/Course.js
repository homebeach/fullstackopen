function Course({ name, parts }) {
  
    const listedparts = parts?.map(part =>
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
      {listedparts}
      <br/>
      <b>total of {total} exercises</b>
      </div>
    )
  }

  export default Course;