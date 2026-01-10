const express = require('express')
const Sequelize = require('sequelize')
const cors = require('cors')

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'sample.db',
  define: {
    timestamps: false
  }
})

const Note = sequelize.define('note', {
  content: Sequelize.STRING
})

const app = express()
app.use(cors())
app.use(express.json())

app.get('/notes', async (req, res) => {
  try {
    const notes = await Note.findAll()
    res.status(200).json(notes)
  } catch (e) {
    res.status(500).json({ message: 'server error' })
  }
})

app.post('/notes', async (req, res) => {
  try {
    await Note.create(req.body)
    res.status(201).json({ message: 'created' })
  } catch (e) {
    res.status(500).json({ message: 'server error' })
  }
})

app.delete('/notes/:id', async (req, res) => {
  try {
    const note = await Note.findByPk(req.params.id)
    if (note) {
      await note.destroy()
      res.status(202).json({ message: 'accepted' })
    } else {
      res.status(404).json({ message: 'not found' })
    }
  } catch (e) {
    res.status(500).json({ message: 'server error' })
  }
})

app.listen(8080, async () => {
  try {
    await sequelize.sync({ alter: true })
    const sample = ['Cumparaturi', 'Facturi', 'Proiect WebTech']
    sample.forEach(async (e) => {
      await Note.create({ content: e })
    })
  } catch (err) {
    console.warn(err)
  }
})