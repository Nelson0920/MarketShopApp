require('dotenv').config()
const { Pool } = require('pg')
const _var = process.env

const config = {
    user: _var.PG_USER,
    host: _var.PG_HOST,
    database: _var.PG_NAME,
    password: _var.PG_PASS
}
const pool = new Pool(config)

module.exports = { pool }