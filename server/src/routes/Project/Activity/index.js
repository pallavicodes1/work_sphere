const express=require('express');
const get = require('./get');
const router=express.Router({mergeParams:true});
router.get('/',get)
module.exports=router;