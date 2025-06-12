import mongoose from "mongoose";


const contentTypes=["textBlock","images","YoutubeVideos","links","tweets","codeSnippets"]

const contentSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    contentType:{
        type:String,
        required:true,
        enum:contentTypes
    },
    tags:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Tag'
    }

})

export default mongoose.model("Content",contentSchema)