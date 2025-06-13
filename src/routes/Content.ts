import express from "express"
import { userAuth } from "../middleware/auth"
import Content from "../models/Content"
import Tag from "../models/Tag"
import { validateContentBody } from "../utils/validation"

const router=express.Router()

const contentTypes=["textBlock","images","YoutubeVideos","links","tweets","codeSnippets"]


router.get('/all',userAuth,async(req,res)=>{

    try{
        const user=req.user
        res.send(user)
        
        if(!user) {
            throw new Error("User not found")
        }
        const userId=req.user._id
        const allContent=await Content.find({userId}).populate('tag')
        
        res.status(200).json({
            message:"All content Fetched Successfully",
            data:allContent
        })
    }
    catch(error:any){
        res.status(400).send(error.message)
    }

})

router.post('/new',userAuth,async(req,res)=>{
    try{
        const userId=req.user._id
        const{title,description,contentType,tag}=req.body
        

        //verify content type
        if(!contentTypes.includes(contentType)){
            throw new Error("Invalid content type")
        }

        let tagId=null


        if(tag){
            let existingTag=await Tag.findOne({
            title:tag,
            userId:userId
            })
            if(!existingTag){
                const newTag=new Tag(
                    {
                        title:tag,
                        userId:userId
                    })
                existingTag=await newTag.save()
            }   
            tagId=existingTag._id
        }

        const content=new Content({
            title,description,userId,contentType,tag:tagId
        })
        await content.save()
        res.status(201).json({
            message: "Content added successfully",
            contentId: content._id 
        })
        
    }
    catch(error:any){
        res.status(400).send(error.message)
    }
    
})

router.patch('/edit/:contentId',userAuth,async(req,res)=>{
    try{
        const user=req.user
        if(!user) {
            throw new Error("User not found")
        }
        
        const userId=req.user._id
        const contentId=req.params.contentId

        if(!req.body || Object.keys(req.body).length===0){
            throw new Error ("Empty update body")
        }

        await validateContentBody(req)

        const content=await Content.findOne({_id:contentId,userId})
        if(!content){
            throw new Error("Content not found")
        }

        let tagId=content.tag
        if(req.body.tag!==undefined){
            if(req.body.tag===null||req.body.tag===""){
                tagId=null
            }
            else{
                let existingTag=await Tag.findOne({
                    title:req.body.tag,
                    userId:userId
                })
                if(!existingTag){
                    const newTag=new Tag({
                        title:req.body.tag,
                        userId:userId,
                    })
                    existingTag=await newTag.save()
                }
                tagId=existingTag._id
            }
        
        }
        const updateFields: Record<string, any> = {}
        if (req.body.title !== undefined) updateFields.title = req.body.title
        if (req.body.description !== undefined) updateFields.description = req.body.description
        if (req.body.contentType !== undefined) updateFields.contentType = req.body.contentType
        if (req.body.tag !== undefined) updateFields.tag = tagId


        const updatedContent=await Content.findByIdAndUpdate(contentId,
            { $set: updateFields },
            {new:true}
        ).populate('tag')

        res.status(200).json({
            message: "Content updated successfully",
            content: updatedContent
        })
        
    }
    catch(error:any){
        res.status(400).send(error.message)
    }

})

router.delete('/delete/:contentId',userAuth,async(req,res)=>{
    try{

        const user=req.user
        if(!user) {
            throw new Error("User not found")
        }

        const contentId=req.params.contentId
        const userId=req.user._id

        const content=await Content.findOneAndDelete({
            _id: contentId,
            userId: userId  
        })
        if(!content){
            throw new Error("Not a valid content")
        }
        res.status(200).json({
            message: "Content deleted successfully",
            content: content
        })
    }
   catch(error:any){
        res.status(400).send(error.message)
    }
})



export default router