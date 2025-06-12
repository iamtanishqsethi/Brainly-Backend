import express from "express"
import connectDB from "./config/database"
import Auth from "./routes/Auth"
import Content from "./routes/Content"
const app=express()

app.use(express.json())
require('dotenv').config();

app.use("/api/auth/",Auth)
app.use("/api/content/",Content)


connectDB().then(()=>{
    console.log("connected to database")
    app.listen(8000,()=>{
        console.log("Server is successfully listening on port 8000..");  
    })
}).catch(()=>{
    console.error("Error connecting to database")
})
