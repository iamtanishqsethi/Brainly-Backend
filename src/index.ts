import express from "express"
import connectDB from "./config/database"

const app=express()

app.use(express.json())
require('dotenv').config();

app.get("/",(req,res)=>{
    res.send("Hello from TypeScript Express!")
})

// app.post("/api/v1/signUp",async(req,res)=>{

// })

// app.post("/api/v1/signIn",async(req,res)=>{

// })

// app.get("/api/v1/content",async(req,res)=>{
//     res.send("Hello")
// })

// app.delete("/api/v1/content",async(req,res)=>{

// })

// app.post("/api/v1/brain/share",async (req,res)=>{

// })

// app.get("/api/v1/brain/:sharelink",async(req,res)=>{
    
// })

connectDB().then(()=>{
    console.log("connected to database")
    app.listen(8000,()=>{
        console.log("Server is successfully listening on port 8000..");  
    })
}).catch(()=>{
    console.error("Error connecting to database")
})
