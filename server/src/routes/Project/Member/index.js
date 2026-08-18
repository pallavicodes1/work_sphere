const express=require('express');
const post = require('./post');
const get = require('./get');

const router=express.Router({mergeParams:true});
router.post('/',post)
router.get('/',get)
module.exports=router;