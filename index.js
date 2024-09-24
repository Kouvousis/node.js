const { default: mongoose } = require("mongoose")
const express = require('express')
const app = express()
const port = 3000

mongoose.connect(process.env.MONGODB_URI)
    .then(
        () => {console.log('Connection to MongoDB established')},
        err => {console.log('Failed to connect to MongoDB') }
    )

app.listen (port, () => {
    console.log("Server is running")
})

app.use(express.json())

const user = require('./routes/user.routes')
app.use('/api/user', user)

const product = require('./routes/product.routes')
app.use('/api/products', product)