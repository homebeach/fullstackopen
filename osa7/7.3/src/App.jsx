import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, Link, useParams, useNavigate} from 'react-router-dom';

const Menu = ({ setPage }) => {

  const toPage = (page) => (event) => {
    event.preventDefault()
    setPage(page)
  }

  const padding = {
    paddingRight: 5
  }
  return (
    <div>
      <Link style={padding} to="/anecdotes">anecdotes</Link>
      <Link style={padding} to="/create">create new</Link>
      <Link style={padding} to="/about">about</Link>
    </div>
  );
}

const AnecdoteList = ({ anecdotes, message, setMessage }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage('');
    }, 5000);

    return () => clearTimeout(timer); // Clear the timer when the component unmounts or when setMessage is called again

  }, [message, setMessage]);

  return (
    <div>
      <p>{message}</p>
      <h2>Anecdotes</h2>
      <ul>
        {anecdotes.map(anecdote => (
          <li key={anecdote.id}>
            <Link to={`/anecdote/${anecdote.id}`}>{anecdote.content}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
const Anecdote = ({ anecdotes }) => {
  const id = useParams().id;
  const anecdote = anecdotes.find(n => n.id === Number(id));

  if (!anecdote) {
    // Handle case where anecdote is not found
    return <p>Anecdote not found</p>;
  }

  return (
    <div>
      <h2>{anecdote.content}</h2>
      <ul>
        <li>has {anecdote.votes} votes</li>
        <li>for more info see {anecdote.info}</li>
      </ul>
    </div>
  );
};

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://fullstackopen.com/'>Full Stack Open</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const [content, setContent] = useState('')
  const [author, setAuthor] = useState('')
  const [info, setInfo] = useState('')
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    props.setMessage(`A new anecdote "${content}" created!`); // Use backticks for template literals
    navigate('/anecdotes');
  }

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name='content' value={content} onChange={(e) => setContent(e.target.value)} />
        </div>
        <div>
          author
          <input name='author' value={author} onChange={(e) => setAuthor(e.target.value)} />
        </div>
        <div>
          url for more info
          <input name='info' value={info} onChange={(e)=> setInfo(e.target.value)} />
        </div>
        <button>create</button>
      </form>
    </div>
  )

}

const App = () => {
  const [message, setMessage] = useState('');

  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const [page, setPage] = useState('home')

  return (
    <Router>
      <div>
        <h1>Software anecdotes</h1>
        <Menu setPage={setPage} />
        <Routes>
          <Route path="/anecdotes" element={<AnecdoteList anecdotes={anecdotes} message={message} setMessage={setMessage}/>} />
          <Route path="/anecdote/:id" element={<Anecdote anecdotes={anecdotes} />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreateNew addNew={addNew} setMessage={setMessage} />} />
          <Route path="/" element={<p>Welcome to the home page!</p>} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
  
  
}

export default App
