import express from 'express';
const app = express();

let persons = [
  {
    id: 1,
    content: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: 2,
    content: "Ada Lovelace",
    number: "39-44-532523"
  },
  {
    id: 3,
    content: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: 4,
    content: "Mary Poppendick",
    number: "39-23-6423122"
  }
];

  const isNameAlreadyExists = (name) => {
    return persons.find((person) => person.name === name);
  };


app.get('/', (req, res) => {
  res.send('<h1>Hello World!</h1>');
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  const filteredPersons = persons.filter(person => person.id !== id);

  if (persons.length > filteredPersons.length) {
    persons = filteredPersons;
    response.json(filteredPersons)
  } else {
    response.status(404).end()
  }
});

app.use(express.json());

app.post('/api/persons/', (request, response) => {
  const newPerson = request.body;

if (newPerson.content === null || newPerson.content.trim() === '') {
  response.json({ error: 'name is null or empty' });
} else if (newPerson.number === null || newPerson.number.trim() === '') {
  response.json({ error: 'number is null or empty' });
} else if (isNameAlreadyExists(newPerson.name)) {
  response.json({ error: 'name must be unique' });
}
else {
  const maxId = Math.max(...persons.map(person => person.id));
  newPerson.id = maxId + 1;
  const newPersons = [...persons, newPerson];
  persons = newPersons;
  response.json(newPersons);
}
});

app.get('/api/info', (req, res) => {
  const currentTime = new Date();
  const response = `<p>Phonebook has info for ${persons.length} people</p><p>${currentTime}</p>`;
  res.send(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});