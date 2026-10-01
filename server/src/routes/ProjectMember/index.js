const express=require('express');
const router=express.Router();
// const post=require('./post');
const deleteMember  = require('./deleteMember');
const  patch = require('./patch');
// router.post('/',post);
router.patch('/:id',patch)
router.delete('/:id',deleteMember);
module.exports=router;