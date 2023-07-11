import mongoose, { Schema } from "mongoose"; 

const TaskSchema = new Schema({
    title: {
        type:String,
        require:true
    },
    description:{
        type:String,
        require:true
    },
    isFinished:{
        type:Boolean,
        default:false
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        require:true
    },
    createdAt:{
        type: Date,
        default:new Date(Date.now()),
        require:true
    }
})

export const TaskModel = mongoose.model('task', TaskSchema) 