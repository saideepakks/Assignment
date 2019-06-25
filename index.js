
const express = require('express');
const lodash = require('lodash');


let app = express(); 
const connection=require('./connection');

app.use(express.json());

let get=app.get('/employee',(req,res)=>{
    connection.query('select * from employee_details',(err,rows,coloumn)=>{
        if(!err)
        {
            

             function orgFlow(rows){
                var nodes = {};    
                return rows.filter(obj=>{
                    let eid = obj["eid"],
                    assign = obj["assign"];
            
                    nodes[eid] = lodash.defaults(obj, nodes[eid], { children: [] });
                    assign && (nodes[assign] = (nodes[assign] || { children: [] }))["children"].push(obj);
            
                    return !assign;
                });    
            }

            let result = orgFlow(rows);
         
            res.json(result)       




            
        }
        else
            res.status(400).json(err);

    });
});

//  app.get('/employee/:id',(req,res)=>{
//     connection.query(
//         "select * from employee_details where assign=?;",[req.params.id],
//     (err,row,coloumn)=>{
//         if(!err)
         
//             res.json(row);
//         else 
//             res.status(400).json(err);
//     });
// });


// app.get('/manager',(req,res)=>{
//     connection.query("select (m.assign) as assign,(e.ename) as manager_name,(m.eid) as assignee_id,(m.ename) as assigneeName from employee_details e inner join employee_details m on m.assign=e.eid order by assign",
//     (err,rows,columns)=>{
//         if(!err)
//             res.json(rows);
//         else throw err;
//     });
 
// });



app.listen(3000, () => {
    console.log("Server listening on port 3000");
});


