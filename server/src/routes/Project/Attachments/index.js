const express = require('express');
const router=express.Router({mergeParams:true});
const upload=require('../../../config/multerconfig')
const post = require('./post');
const get = require('./get');


// Upload attachment

router.post('/', post);
router.get('/',get);

module.exports= router;