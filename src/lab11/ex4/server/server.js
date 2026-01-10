const express = require('express')
const cors = require('cors')
const Sequelize = require('sequelize')
const path = require('path')

const sequelize = new Sequelize(process.env.DATABASE_URL || 'sqlite::memory:', {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  fullName: Sequelize.STRING,
  email: Sequelize.STRING,
  job: Sequelize.STRING,
  bio: Sequelize.STRING
})

const app = express()
app.use(cors())
app.use(express.static(path.join(__dirname, 'build')))

app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll()
    res.status(200).json(users)
  } catch (e) {
    res.status(500).json({ message: 'server error' })
  }
})

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'))
})

const port = process.env.PORT || 8080
app.listen(port, async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ force: true })
    await User.bulkCreate([
      {
        username: 'popescu_i',
        fullName: 'Ion Popescu',
        email: 'ion@test.com',
        job: 'Programator Junior',
        bio: 'Pasionat de React si Node.js'
      },
      {
        username: 'ionescu_m',
        fullName: 'Maria Ionescu',
        email: 'maria@test.com',
        job: 'Designer UX/UI',
        bio: 'Ii place sa deseneze interfete moderne.'
      },
      {
        username: 'radulescu_d',
        fullName: 'Dan Radulescu',
        email: 'dan@test.com',
        job: 'Project Manager',
        bio: 'Expert in organizarea echipelor.'
      }
    ])
  } catch (e) {
    console.warn(e)
  }
})