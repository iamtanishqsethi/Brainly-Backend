import express from "express"
const router=express.Router()
import Tag from "../models/Tag"
import { userAuth } from "../middleware/auth"

router.get("/all",userAuth,async(req,res)=>{
    try{
        const userId=req.user._id
        const tags=await Tag.find({userId})
        res.status(200).send({
            message:"tags fetched successfully",
            data:tags
        })
    }
    catch(error:any){
        res.status(400).send(error.message)
    }
})
export default router