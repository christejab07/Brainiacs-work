const express = require('express')
const mysql = require('mysql2')

const bodyParser = require('body-parser')
const app = express()
const people = require('./people')
const path = require('path')
const logSign = require('./index')
app.use(bodyParser.urlencoded({ extended: true}))

const conn = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo'
})
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/signup.html'))

})
app.post('/signup', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    conn.getConnection((error, conn) => {
        if(error){
            res.send("Error connecting to the database")
        }
        else{
            res.send('Account created successfully.');
        }
        const query = `INSERT INTO info (name, email, password) values (?,?,?)`
        conn.query(query, [name, email, password], (err)=> {
            if(err){
                res.redirect('/login')
            }
             else {
                res.redirect('/signup')
            }
        })

    })
})

app.use('/people', people)
app.listen(3001)
    console.log('app running on port 3001...');
