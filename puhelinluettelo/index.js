const express = require('express')

const morgan = require('morgan')

const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors())

morgan.token('person', (req) => {
  return JSON.stringify({
    name: req.body.name,
    number: req.body.number
  })
})

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

let persons = [
      {
        "name": "Arto Hellas",
        "number": "040-123456",
        "id": 1
      },
      {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
      },
      {
        "name": "Dan Abramov",
        "number": "12-43-234345",
        "id": 3
      },
      {
        "name": "Mary Poppendieck",
        "number": "39-23-6423122",
        "id": 4
      }
    ]
app.get('/', (req, res) => {
    res.send()
  })

app.get('/api/persons',(req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    if (person) {
        res.json(person)
    } else {
        res.status(404).end()
    }
  })

app.get('/info', (req, res) => {
    const date = new Date().toUTCString()
    res.send(
        `<div>Phonebook has info for ${persons.length}</div>
        <div>${date}</div>`)
  })

app.post('/api/persons', (req, res) => {
    const body = req.body

    const id = Math.floor(Math.random() * 100)

    let nameDuplicate = false
    if (persons.filter(person => person.name === body.name).length > 0) {
      nameDuplicate = true
    }

    if (!(body.name) || !(body.number)) {
      return res.status(400).json({
        error: 'missing name or number'
      })
    }
    else if (nameDuplicate === true) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
    const person = {
        name: body.name,
        number: body.number,
        id: id
    }

    persons = persons.concat(person)

    res.json(person)


})

app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.filter(person => person.id !== id)
    if (person) {
        res.json(person)
        res.status(204).end()
    } else {
        res.status(404).end()
    }
  })

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })