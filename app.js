 const express =require('express')
const mysql = require('mysql')
const {check, validationResult} =require('express-validator')
const app= express()
 const port =  4000
// const urlencoded = express.urlencoded({ extended:false});
 app.use(express.json())
// const query = require ("./database");
 const controllers = require("./controllers/index") 
const validators = require("./validators")




app.get("/", (req, res) => {
  res.json({ message: "Welcome to crud." });
});

// const pool = mysql.createPool({
//     connectionLimit :10,
//         host : 'localhost',
//         user: 'root',
//         password: '',
//         database:'crud'
//     })













  /*
   

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
        if(req) throw err
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


//delete the record
app.delete('',(req,res)=>{
    pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)

        connection.query('DELETE from Users',(err, rows) =>{
            connection.release()
            if(!err){
                res.send(rows)


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

app.post('/new',(req,res)=>{
   pool.getConnection((err,connection) => {
        if(err) throw err
        console.log(`connected as id ${connection.threadId}`)
        const params =req.body;
        if(params.name && params.role && params.city ){
            connection.query('INSERT INTO Users(name, role , city ) VALUES (?,?,?)  ',[params.name, params.role, params.city],(err, rows) =>{
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
                        data:"data cannot be null for name , role and city "
                    })
                }
            })
        }
        else{ 
            res.send({
            status:200,
            message:"failed",
            message:"required all fields"
        })}
        
    })
})
///stackover
/*
function update(id)
{
    return new Promise(function(resolve, reject) {
        // The Promise constructor should catch any errors thrown on
        // this tick. Alternately, try/catch and reject(err) on catch.
        const params =resolve.body;

        var query_str = `SELECT id from Users WHERE id=?`
        var id =params.id;


        connection.query(query_str,id, function (err, rows) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}

update('name_record').then(function(rows) {
    // now you have your rows, you can see if there are <20 of them
    console.log("179")
})




//Update a user detail
app.put('',(req,res)=>{
    pool.getConnection((err,connection) => {
   
        const params =req.body;
        const {id, name, role, city} =req.body
        console.log(params.id)
        const check  = connection.query('SELECT id from Users WHERE id=?', [params.id]);
        console.log(check.id)
        console.log("164")
        if(check == 0){
            console.log("165")
            return res.send({
                status:400,
                message:"failed",
                data:"id doesn't exit "
            })


        }
        else{
      console.log("176")
        connection.query('UPDATE  Users SET name = ? WHERE id =?',[name,id],(err, rows) =>{
            connection.release()
            if(!err){
                res.send({
                    status:200,
                    message:"Success-300",
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
        }

    })
})






/*
*/



//routes
app.post("/create",validators.validate("createUser") , controllers.create);
app.delete("/" ,controllers.delete);
app.put("/",validators.validate("updateUser") ,controllers.update);
app.get("/list", controllers.list);


app.listen(port, () => console.log(`Listen on port ${port}`)) 


module.exports = app;
