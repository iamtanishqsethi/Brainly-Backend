import express from "express"
import cookieParser from 'cookie-parser';
import connectDB from "./config/database"
import Auth from "./routes/Auth"
import Content from "./routes/Content"
import Tags from "./routes/Tags"
const app=express()

app.use(express.json())
require('dotenv').config();
app.use(cookieParser())

app.use("/api/auth/",Auth)
app.use("/api/content/",Content)
app.use("/api/tags",Tags)


connectDB().then(()=>{
    console.log("connected to database")
    app.listen(8000,()=>{
        console.log("Server is successfully listening on port 8000..");  
    })
}).catch(()=>{
    console.error("Error connecting to database")
})
