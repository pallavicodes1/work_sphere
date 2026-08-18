const express=require('express');
const User = require('../models/user');
const router=express.Router();
router.get('/',async(req,res)=>{
    const data=await User.find({_id:req?.user?._id});
    if(data){
        res.send(data[0]);
    }
})
module.exports=router;