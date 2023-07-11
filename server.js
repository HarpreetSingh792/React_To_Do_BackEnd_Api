import mongoose from "mongoose";
export const _dbConnect =()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Users"
    })
        .then((c) => {
            console.log(`Database Connected with ${c.connection.host}`)
        }
        )
        .catch((err) => {
            console.log("Failed to connect to Database" + err)
        })
}

