import mongoose from "mongoose";

const tagsSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    }
})

export default mongoose.model("Tag",tagsSchema)