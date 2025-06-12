import mongoose from "mongoose";
 const connectDB=async ()=>{
    await mongoose.connect("mongodb+srv://tanishqz:tanishq%40123z@cluster.9fvtqy6.mongodb.net/brainly")
}

export default connectDB
