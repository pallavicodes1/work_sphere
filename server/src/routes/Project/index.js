const express=require('express');
const post = require('./post');
const getProject  = require('./getProject');
const  get = require('./get');
const getOverview = require('./getOverview');
const  getTasks = require('./getTasks');
const deleteProject  = require('./deleteProject');
const activityRouter=require('./Activity/index');
const memberRouter=require('./Member/index');
const attachmentRouter=require('./Attachments/index')
const patch = require('./patch');
const router=express.Router();
router.post('/',post);
router.get('/',get);
router.get('/:id/overview',getOverview)
router.get('/:id',getProject);
router.get('/:id/tasks',getTasks);
router.delete('/:id',deleteProject);
router.patch('/:id',patch);
router.use('/:id/member',memberRouter)
router.use('/:id/activity',activityRouter);
router.use('/:id/attachments',attachmentRouter)
module.exports=router;