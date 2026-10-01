const express=require('express');
const post = require('./post');
const get = require('./get');
const patch = require('./patch');

const router=express.Router({mergeParams:true});
router.post('/',post)
router.get('/',get)
router.patch('/:memberId',patch)
module.exports=router;