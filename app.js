const express =require('express')
const mysql = require('mysql')
const app= express()
const port =  3000
app.use(express.urlencoded({ extended:false}));
app.use(express.json())

const pool = mysql.createPool({
    connectionLimit :10,
        host : 'localhost',
        user: 'root',
        password: '',
        database:'crud'
    })

  


//Get All User
app.get('',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from Users', (err, rows) =>{
            connection.release()
            if(!err){
                res.send(rows)

            }else{
                console.log(err)
            }
        })
    })
})

//get userby id
app.get('/:id',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('SELECT * from Users WHERE id=?',[req.params.id] ,(err, rows) =>{
            connection.release()
            if(!err){
                res.send({
                    status:200,
                    message:"Success",
                    data:rows})

            }else{
                console.log(err)
                res.send({
                    status:400,
                    message:"failed",
                    data:"id doesn't exit "
                })
            }
        })
    })
})

//delete the record
app.delete('/:id',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from Users WHERE id=?',[req.params.id] ,(err, rows) =>{
            connection.release()
            if(!err){
                res.send({
                    status:200,
                    message:"Success",
                    data:`${req.params.id}`})

            }else{
                console.log(err)
                res.send({
                    status:400,
                    message:"failed",
                    data:"id doesn't exit "
                })
            }
        })
    })
})





//Add new user 

app.post('',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params =req.body;
        connection.query('INSERT INTO Users SET ?',params,(err, rows) =>{
            connection.release()
            if(!err){
                res.send({
                    status:200,
                    message:"Success",
                    data:`${params.name}`})

            }else{
                console.log(err)
                res.send({
                    status:400,
                    message:"failed",
                    data:"id doesn't exit "
                })
            }
        })
    })
})


//Update a user detail
app.put('',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params =req.body;
        const {id, name, role, city} =req.body
        connection.query('UPDATE  Users SET name = ? WHERE id =?',[name,id],(err, rows) =>{
            connection.release()
            if(!err){
                res.send({
                    status:200,
                    message:"Success",
                    data:`${name}`})

            }else{
                console.log(err)
                res.send({
                    status:400,
                    message:"failed",
                    data:"id doesn't exit "
                })
            }
        })
    })
})








app.listen(port, () => console.log(`Listen on port ${port}`)) 

