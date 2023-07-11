import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: {
        type: "String",
        required: true,
    },
    email: {
        type: "String",
        unique: true,
        required: true
    },
    password: {
        type: "String",
        required: true,
        select:false
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
})
export const UserModel = mongoose.model("User", UserSchema);
