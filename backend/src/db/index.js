import mongoose from "mongoose";
const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/hackin`);
        console.log(`MongoDB connected : ${connectionInstance.connection.host}`);
    }
    catch (error) {
        console.error("mongoDB error found : ",error);
        process.exit(1);
    }
}
export default connectDB;