const express=require('express');
const deleteAttachments = require('./deteleAttachment');
const download = require('./download');
const router=express.Router();
router.delete('/:attachment',deleteAttachments)
router.get('/:attachment/download',download)
module.exports=router;