const express=require('express');
const postUser = require('./post');
const loginUser = require('./loginUser');
const updatePassword = require('./updatePassword');
const patch = require('./patch');
const resetPassword = require('./resetPassword');
const forgotPassword=require('./forgotPassword');
const deleteUser=require('./deleteUser')
const searchUsers=require('./searchUsers')
const getUsers=require('./getUsers')
const router=express.Router();
router.post('/signup',postUser);
router.post('/',loginUser)
router.post('/search',searchUsers)
router.patch('/password/:id',updatePassword);
router.patch('/:id',patch);
router.post('/forgot-password',forgotPassword)
router.post('/reset-password/:token',resetPassword)
router.delete('/:id',deleteUser)
router.get('/',getUsers)
module.exports=router;