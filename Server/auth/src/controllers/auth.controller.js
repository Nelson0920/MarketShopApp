const { pool } = require('../model/postgresql.connect.js')

let msg = {
    status: false,
    message: 'Error',
    data: [],
    code: 500
}

async function getUser(email) {
    let sql = `SELECT COUNT(id_usr) FROM users WHERE ema_usr = '${email}';`
    const user = await pool.query(sql)
    let access = user.rows[0].count
    if(access == 1){
        msg = {
            status: true,
            message: 'Success',
            data: access,
            code: 200
        }
    }else{
        msg = {
            status: false,
            message: 'User not found',
            code: 200
        }
    }
    return msg
}

async function getUsersInfo() {
    let sql = `SELECT * FROM users;`
    const user = await pool.query(sql)
    if(user.rows[0]?.id_usr){
        delete user.rows[0].pass_usr
        msg = {
            status: true,
            message: "Success",
            data: user.rows,
            code: 200
        }

    }else{
        msg = {
            status: false,
            message: "User not found",
            code: 200
        }
    }
    return msg
}

async function login(email, password) {
    let sql = `SELECT * FROM users WHERE ema_usr = '${email}' AND pass_usr = '${password}';`
    const user = await pool.query(sql)
    if (user.rows[0]?.id_usr){
        delete user.rows[0].pass_usr
        msg = {
            status: true,
            message: "User found successfully",
            data: user.rows,
            code: 200
        }
    }else{
        msg = {
            status: false,
            message: "User not found",
            code: 200
        }
    }
    return msg
}

async function register( name, username, email, password ) {
    let sql = `INSERT INTO public.users(name, nam_usr, ema_usr, pass_usr, niv_acc) VALUES('${name}', '${username}', '${email}', '${password}', 'user');`
    const user = await pool.query(sql)

    if(user.rowCount > 0){
        msg = {
            status: true,
            message: "User registered successfully",
            code: 200
        }
    }else{
        msg = {
            status: false,
            message: "User not registered",
            code: 500
        }
    }
    return msg
}

module.exports = { getUser, login, register, getUsersInfo }