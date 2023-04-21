const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
var app = express()

app.use(cors())
connectToMongo();

const port = 5000;

app.use(express.json())

// available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send(req.body)
})

app.listen(port, () => {
    console.log(`iNotebook backend listening on port ${port}`);
})
