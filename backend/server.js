const express = require('express')
const path = require('path')
const colors = require('colors')
const dotenv = require('dotenv').config()
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./config/db')
const cors = require('cors')

const PORT = process.env.PORT || 8000

// connect to database
connectDB()

const app = express()
app.use(express.json())
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(
  cors({
    origin: ['http://localhost:3000/', 'https://mern-stack-app.onrender.com'],
  })
)

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to the MERN stack' })
})

// Routes
app.use('/api/users', require('./routes/userRouters'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use(errorHandler)

// serve frontend
if (process.env.NODE_ENV === 'production') {
  // set build folder as static
  app.use(express.static(path.join(__dirname, '../frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(__dirname, '../', 'frontend', 'build', 'index.html')
  )
} else {
  app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to the MERN stack' })
  })
}

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`))
