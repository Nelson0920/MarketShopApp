import dotenv from 'dotenv'
dotenv.config()

// SERVER
const PORT    = process.env.PORT
const URL     = process.env.URL_DEV

// ROOT
const ROOT    = process.env.ROOT
const ADDUSER = process.env.ADDUSER
const GETUSER = process.env.GETUSER

// POSTGRESQL
const PG_HOST = process.env.POST_HOST
const PG_USER = process.env.POST_USER
const PG_PASS = process.env.POST_PASS
const PG_NAME = process.env.POST_NAME


export{
    PORT,URL,
    ROOT,ADDUSER,GETUSER,
    PG_HOST,PG_NAME,PG_PASS,PG_USER
}