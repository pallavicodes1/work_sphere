const mongoose=require('mongoose');
const taskSchema=new mongoose.Schema({
    title:{
        type:String
    },
    date:{
        type:Date
    },
    priority:{
        type:String
    },
    description:{
        type:String
    },
    isDeleted:{
        type:Boolean,
        required:false,
        default:false
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users',
        default:null
    },
    status:{
        type:String,
        default:'pending'
    },
    isCompleted:{
        type:Boolean,
        default:false
    },
    project: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      default: null,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      default: null,
    },
});
taskSchema.index({date:1})
const Task=mongoose.model('tasks',taskSchema);
module.exports=Task;