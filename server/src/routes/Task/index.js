const express=require('express');
const post = require('./post');
const get = require('./get');
const patch = require('./patch');
const deleteTask = require('./deleteTask');
const router=express.Router();
router.post('/',post)
router.get('/',get)
router.patch('/update/:id',patch)
router.delete('/:id',deleteTask)
module.exports=router;