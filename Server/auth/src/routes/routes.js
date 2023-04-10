const { Router } = require('express')
const controller = require('../controllers/auth.controller.js')
const router = Router()
const _var = process.env

router.get(_var.ROOT, (req, res) => {
    res.send('Auth API is working...')
})

router.get(_var.GETUSER, async (req, res) =>{
    const { email } = req.params
    const user = await controller.getUser(email)
    res.status(user.code).json(user)
})

router.get('/getUsersInfo', async (req, res) =>{

    const user = await controller.getUsersInfo()
    res.status(user.code).json(user)
})

router.post('/signin', async (req, res) =>{
    const { email, password } = req.body
    let user = await controller.login(email, password)
    res.status(user.code).json(user)
    user = 0
})

router.post('/signup', async (req, res) =>{
    const { name, username, email, password } = req.body
    let user = await controller.getUser(email)
    if (!user.status){
        user = await controller.register(name, username, email, password)
        res.status(user.code).json(user)
    }else if(user.status){
        res.status(500).json({message: "User already registered", status: false})
    }

})

module.exports = router 