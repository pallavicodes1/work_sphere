const express=require('express');
const post = require('./post');
const get = require('./get');
const patch = require('./patch');
const deleteTask = require('./deleteTask');
const parse = require('./parse');
const router=express.Router();
router.post('/',post)
router.post('/parse',parse)
router.get('/',get)
router.patch('/:id',patch)
router.delete('/:id',deleteTask)
module.exports=router;