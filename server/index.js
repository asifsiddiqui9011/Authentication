const express = require("express");
const mysql =require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

const app = express();
app.use(cors());

app.use(express.json());
// Create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'authentication',
    password:'Snow1402@$'
  });


  //registration api end point
  app.post('/register',(req,res)=>{
    const {username,email,password } = req.body;
    const query = 'SELECT * FROM Users WHERE email = ?';
    connection.query(query, [email], (error, results) => {
        if (error) {
        return res.status(500).json({ success: false, errors: 'Database query failed' });
        }

    if (results.length > 0) {
      return res.status(400).json({ success: false, errors: 'Existing user found with same email address' });
    }
    else{
        const saltRounds = 10;
        bcrypt.hash(password, saltRounds, (err, hash) => {
            if (err) {
              return res.status(500).json({ message: 'Error hashing password' });
            }
            const sql = "INSERT INTO users (username,email,password) VALUES(?,?,?)";
            connection.query(sql,[username,email,hash], (err,data) =>{
                if(err){
                    return res.json("Error");
                }  
                const Data = {
                    user:{id:data.insertId}
                };
                console.log(Data,"id",data)
                const token = jwt.sign(Data,'secret_Oauth');
                res.status(200).json({success:true,token})
            })
        
                
            
         })
    }
})
    
        
   })
    
 
//Login api end point
app.post('/login',(req,res)=>{

    const {email,password} = req.body
    const sql = 'SELECT * FROM users WHERE email = ?';
    connection.query(sql,[email], (err,data) =>{
        if(err){
            return res.json("Error");
        }
        if (data.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials' });
          }
        else{
            bcrypt.compare(password,data[0].password, (err, isMatch) => 
                {
                if (err) {
                  return res.status(500).json({ message: 'Error comparing passwords' });
                }
          
                if (!isMatch) {
                  return res.status(401).json({ message: 'Password incorrect' });
                }

                const Data = {
                    user:{id:data[0].id}
                }
                const token = jwt.sign(Data,'secret_Oauth');
                res.status(200).json({success:true,token}) 
              })
        }
    })
})
 
//fetch user middleware 
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors:"Please authentication using valid email id and password"})
    }
    else {
        try {
            const data = jwt.verify(token,'secret_Oauth');
            req.user = data.user;
            next();
        } catch (error) {
            res.status(401).send({errors:"Please Authenticate Using Valid Token"})
        }
    }
}

//endpoint to getuser details
app.get('/getuser/',fetchUser,(req,res)=>{
    const Id = req.user.id;
    const sql = "SELECT * FROM users WHERE id = ?"; 
    connection.query(sql, [Id], (err, data) => {
        if (err) {
          console.error(err);
          return res.status(500).json({ success: false, message: 'Error fetching user details' });
        }
    
        if (data.length === 0) {
          return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, data: data[0] });
      });
})

 app.listen(8080,()=>{
    console.log("listening")
 })