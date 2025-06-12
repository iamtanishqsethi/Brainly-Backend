import express from "express"
const router=express.Router()
import { validateSignUpData } from "../utils/validation"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import User from "../models/User"

router.post("/signUp",async(req,res)=>{
    try{
        validateSignUpData(req)

        const passwordHash=await bcrypt.hash(req.body.password,10)

        const user= new User({
            userName:req.body.userName,
            firstName:req.body.firstName,
            password:passwordHash
        })
        await user.save()

        const token= jwt.sign({_id:user._id},process.env.JWT_KEY!,{expiresIn:'1d'})
        res.cookie("token",token,{
            maxAge:3600000*24,
            httpOnly:true,
            secure:true,
            sameSite:"none",
            path:"/"
        })
        res.status(201).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post("/signIn",async(req,res)=>{
    try{
        const {userName,password}=req.body
        if(!userName || !password){
            throw new Error("UserName and password are required");
        }

        const user=await User.findOne({userName})
        if(!user){
            throw new Error("Invalid Credentials")
        }

        const isPasswordValid=await bcrypt.compare(password,user.password)
        if(!isPasswordValid){
            throw new Error("Invalid Credentials")
        }

        const token= jwt.sign({_id:user._id},process.env.JWT_KEY!,{expiresIn:"1d"})
        res.cookie("token",token,{
            maxAge:3600000*24,
            httpOnly:true,
            secure:true,
            sameSite:'none'

           
        })
         res.status(200).send(user)
    }
    catch(error){
        res.status(400).send(error)
    }
})

router.post("/logOut",async(req,res)=>{
    res.cookie("token",null,{
        expires:new Date(Date.now())
    })
    res.status(200).send("Logged out")
})


export default router