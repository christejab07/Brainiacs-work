const mysql = require('mysql')
//creating connection to mysql database
var mysqlConnection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'',
    database: 'userinfo',
    multipleStatements: true
})
mysqlConnection.connect((err) =>{
    if(!err){
        console.log('connected successfully')
    }
    else{
        console.log('connection failed')
    }
});
 
module.exports = mysqlConnection;