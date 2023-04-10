require('dotenv').config()
const express = require('express')
const auth = require('./routes/routes.js')
const _var = process.env
var cors = require('cors')
const app = express()

app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(express.json())
app.use(auth)

app.listen(_var.PORT, (err) => {
    if (err) throw err
    console.log(`server funcionando en ${_var.URL+_var.PORT}`)
})
