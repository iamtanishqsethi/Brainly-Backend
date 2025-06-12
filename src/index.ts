import exrpress from "express"
import jwt from "jsonwebtoken"
const app=exrpress()

app.use(exrpress.json())

app.post("/api/v1/signUp",async(req,res)=>{

})

app.post("/api/v1/signIn",async(req,res)=>{

})

app.get("/api/v1/content",async(req,res)=>{

})

app.delete("/api/v1/content",async(req,res)=>{

})

app.post("/api/v1/brain/share",async (req,res)=>{

})

app.get("/api/v1/brain/:sharelink",async(req,res)=>{
    
})