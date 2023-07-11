import mongoose from "mongoose";
export const _dbConnect =()=>{
    mongoose.connect(process.env.MONGO_URI, {
        dbName: "Users"
    })
        .then(() => {
            console.log("Connected Successfully!")
        }
        )
        .catch((err) => {
            console.log("Failed to connect to Database" + err)
        })
}

