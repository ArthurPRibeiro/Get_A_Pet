const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())

app.use(cors({credential: true, origin: 'http://localhost:3000'}))

app.use(express.static('public'))

const UserRoutes = require('./routes/UserRoutes')
const PetRoutes = require('./routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

// upload (multer) errors would otherwise reach the client as an HTML page
app.use((err, req, res, next) => {
    if (err.status === 422 || err.name === 'MulterError') {
        return res.status(422).json({ message: err.message })
    }
    res.status(500).json({ message: 'Erro interno do servidor' })
})

app.listen(5000)

