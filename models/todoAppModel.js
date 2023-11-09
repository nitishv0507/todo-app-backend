import mongoose from "mongoose";

const todoDataSchema = mongoose.Schema({

    "task" : {
        "type": String,
        required:true
    },
    
    isCompleted: {
        type:"boolean",
        required:true
    }
}, {timestamps: true});

const todoData = mongoose.model("todoData", todoDataSchema);

export default todoData;

