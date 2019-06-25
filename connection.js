let mysql = require('mysql');

let connection = mysql.createConnection({
    host: '127.0.0.1',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'Employee'
});

connection.connect((err)=>{
    if(err)
        throw err;
    console.log('connected');
});

module.exports = connection;
