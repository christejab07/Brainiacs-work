const bodyParser = require('body-parser')
const express = require('express')
const path = require('path')
const mysqlConnection = require("./connect-login")
// const connect = require('./mysql-connect')
const router = express.Router();
const app = express();
app.use(bodyParser.urlencoded({extended: true}))

router.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, '/login.html'))
})

router.get('/', (req,res) => {

            mysqlConnection.connect(function(error, conne) {
                if(error){
                    res.send(404, error)
                }
                else{
                    res.send(200,'connected to the database')
                }
            
        
        conne.query(`SELECT * from info`, (err, rows, fields) => {
        if(!err){
            res.send(rows[fields])
        }
        else{
            res.send(err)
        }
     })
    })
    })

    // app.use('/mysl-connect', connect);

//})
module.exports = router;