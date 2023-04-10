require('dotenv').config()
const _var = process.env
const express = require('express')
const mysql = require("mysql")
const myconn = require('express-myconnection')
const path = require("path")
var cors = require('cors')
const auth = require('./routers/routess.js')
const app = express()

app.use(cors({
    origin: 'http://localhost:8080'
}))
app.use(express.json())
app.use(express.static(path.join(__dirname, "dbimages")))


app.use(myconn(mysql,{
    host: _var.PG_HOST,
    port: 3306,
    user: _var.PG_USER ,
    password: _var.PG_PASS,
    database: _var.PG_NAME
}))


app.use(auth)

app.listen(_var.PORT, (err) => {
    if (err) throw err
    console.log(`server funcionando en ${_var.URL+_var.PORT}`)
})

