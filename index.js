const express = require('express')
const mysql = require('mysql2')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const people = require('./login-database')
const app = express()

app.set('view engine', 'ejs')

app.use(bodyParser.urlencoded({ extended: true}))

const conn = mysql.createPool({
    host : 'localhost',
    user: 'root',
    password: '',
    database: 'userinfo'
})
app.get('/login', (req, res) => {
    res.render('./login.ejs')
})

app.post('/login', (req, res) => {
app.use('/login-database', people)
})
app.get('/signup', (req, res) => {
    res.render('./signup.ejs')

})
app.post('/signup', (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password
    conn.getConnection((error, conn) => {
        if(!error){
            res.redirect(200, '/login');
        }
        else{
            res.redirect(404, 'Error found');
        }
        const query = `INSERT INTO info (name, email, password) values (?,?,?)`
        conn.query(query, [name, email, password], (err)=> {
            if(err){
                res.send("Data were not inserted successfully")
                 
            }
             else {
                res.send('data inserted successfully')
                 
            }
        })

    })
})
app.use('/login-database', people)
app.listen(3002)
    console.log('app running on port 3002...');
