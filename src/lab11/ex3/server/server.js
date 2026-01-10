const express = require('express')
const cors = require('cors')

const app = express()
app.use(cors())

const users = [
  {
    id: 1,
    username: 'popescu_i',
    fullName: 'Ion Popescu',
    type: 'student'
  },
  {
    id: 2,
    username: 'ionescu_m',
    fullName: 'Maria Ionescu',
    type: 'professor'
  },
  {
    id: 3,
    username: 'radulescu_d',
    fullName: 'Dan Radulescu',
    type: 'student'
  }
]

app.get('/users', (req, res) => {
  res.status(200).json(users)
})

app.listen(8080, () => {
  console.log('Server is running on port 8080')
})