import mongoose from "mongoose";

//this shit is just a type that the connection is number,it could be a string or other any datatype
type ConnectionObject = {
    isConnected?: number
}
//initialized connection variable
let connection: ConnectionObject = {}

export default async function dbConnect(): Promise<void> {
    if (connection.isConnected) {
        console.log("Already connected to database")
        return 
    }
    try {
        const dbData = await mongoose.connect(process.env.MONGO_URL || "")
        connection.isConnected = dbData.connections[0].readyState
        console.log("DB connect sucessfully")
    } catch (error) {
        console.log("DB FUCKED")
        process.exit(0)
    }
}