const express=require('express');
const router=express.Router();
// const post=require('./post');
const { default: deleteMember } = require('./deleteMember');
const { default: patch } = require('./patch');
// router.post('/',post);
router.patch('/:id',patch)
router.delete('/:id',deleteMember);
module.exports=router;