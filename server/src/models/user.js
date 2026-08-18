const mongoose=require('mongoose');
const encrypt = require('./pre/save/encrypt');
const jwt=require('jsonwebtoken');
const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String
    },
    lname:{
        type:String,
        default:null
    },
    contactNumber:{
        type:Number,
        default:null
    },
    lastLogin:{
        type:Date,
        default:new Date()
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordExpire:{
        type:Date,
        default:null
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user"
    }
},{timestamps:true})

//pre
userSchema.pre("save",encrypt)
userSchema.methods.generateAuthToken=async function(){
    try{
        const token=jwt.sign({_id:this._id.toString()},process.env.JWTSECRET);
        return token;
    }     
    catch(err){
        console.log('error is',err);    
    } 
}

const User=mongoose.model('users',userSchema);
module.exports=User;