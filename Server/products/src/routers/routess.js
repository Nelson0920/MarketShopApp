const { Router } = require('express')
const path = require('path')
const router = Router()
const fs = require("fs")
const multer = require('multer')


const storage = multer.diskStorage({
    destination: path.join(__dirname, '../uploads'),
    filename:(req, body, cb) =>{
        const ext = body.originalname.split('.').pop()
        cb(null, `${Date.now()}.${ext}`)
    },
})

const fileUpload = multer({
    storage
}).single('image')


router.post('/upload', fileUpload,(req, res) =>{

    req.getConnection((err, conexion_db) => {
        if(err) return res.status(500).send("Error DataBase")

        conexion_db.query('INSERT INTO product set ?', [{nam_prd:req.body.data, prc_prd:req.body.data1, num_prd:req.body.data2, cat_prd:req.body.data3}], (err, rows) =>{
            if(err) throw err
            
            const typ_img = req.file.mimetype
            const nam_img = req.file.originalname
            const dat_img = fs.readFileSync(path.join(__dirname, `../uploads/${req.file.filename}`))
            
            conexion_db.query('INSERT INTO image set ?', [{typ_img, nam_img, dat_img}], (err, rows) =>{
                if(err) throw err
                
                res.send({ data: "Imagen cargada"})
            })
        })

    })
})
router.get('/getImage', (req, res) =>{

    req.getConnection((err, conexion_db) => {
        if(err) return res.status(500).send("Error DataBase")

        let sql = `SELECT * FROM image INNER JOIN product ON image.id_img = product.id_prd;`
        conexion_db.query(sql, (err, data) =>{
            if(err) throw err

            data.map(img => {
                fs.writeFileSync(path.join(__dirname, `../dbimages/${img.nam_img}`), img.dat_img)
            })
            delete data[0].dat_img
            delete data[0].id_prd
            res.json(data)
        })

    })
})


module.exports = router 