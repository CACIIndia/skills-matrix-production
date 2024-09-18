import mongoose from "mongoose";

const connectDB = async () => {
  if(mongoose.connections[0].readyState){
    return true;
  }

  try {
    const MONGO_URI = 'mongodb+srv://manimam6:SkillsMatrix%40001@cluster0.0s2bi.mongodb.net/skills?retryWrites=true&w=majority';
  

  await mongoose.connect(MONGO_URI);
    console.log('Mongodb connected')
    return true;
  } catch (error) {
    console.log(error)
  }
}

export default connectDB;