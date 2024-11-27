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

app.get('/api/info', (req, res) => {
  const currentTime = new Date();
  const response = `<p>Phonebook has info for ${persons.length} people</p><p>${currentTime}</p>`;
  res.send(response);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});