const express = require('express');
let app = express(); 
const connection=require('./connection');

app.use(express.json());

app.get('/employee',(req,res)=>{
    connection.query('select * from employee_details',(err,rows,coloumn)=>{
        if(!err) res.json(rows);

        else 
            res.status(400).json(err);

    });
});


app.get('/employee/:id',(req,res)=>{
    connection.query(
        "select * from employee_details where eid=?;",[req.params.id],
    (err,row,coloumn)=>{
        if(!err) res.json(row);
        else 
            res.status(400).json(err);
    });
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});