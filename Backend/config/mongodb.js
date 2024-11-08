import mongoose from 'mongoose'

const connectDB = async () =>{
    mongoose.connection.on('connected', () => console.log("database connceted"))
await mongoose.connect(`${process.env.MONGO_URI}/doctors_points`)
}

export default connectDB