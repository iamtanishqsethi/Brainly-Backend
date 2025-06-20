import validator from "validator"
import { Request } from "express"
import User from "../models/User"

export const validateSignUpData=(req:Request)=>{
    const {firstName,userName,password}=req.body

    if(!userName){
        throw new Error("Enter valid userId")
    }
    else if(userName.length<3 || userName.length>10){
        throw new Error("userId should be between 3 to 10 characters")
    }
    else if(!firstName){
        throw new Error("Enter valid Name")
    }
    else if(firstName.length<3 || firstName.length>50){
        throw new Error("Name should be in between 4 to 50 char")
    }
    else if(!validator.isStrongPassword(password,{
        minLength:6,
        minNumbers:1,
        minUppercase:1,
        minSymbols:1
    }))
    throw new Error("Enter strong password")
}

export const validateContentBody=async(req:Request)=>{
    
    const contentTypes=["textBlock","images","YoutubeVideos","links","tweets","codeSnippets"]
    
    if(req.body.title!==undefined && req.body.title.length===0){
        throw new Error("Title cannot be empty")
    }
    else if(req.body.description!==undefined && req.body.description.length===0){
        throw new Error("Description cannot be empty")
    }
    else if(req.body.contentType && !contentTypes.includes(req.body.contentType)){
        throw new Error ("Enter valid content type")
    }

}