
const mongoose =require("mongoose");
const Project = require("../../models/project");
const ProjectMember = require("../../models/projectmember");
const getProject = async function(req,res){
      try {
    const projectId = req.params.id;

    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: 'Invalid project id'
      });
    }

    const projectObjectId = new mongoose.Types.ObjectId(projectId);

     const project= await Project.find({_id:projectObjectId,
      isDeleted:false
     })
    .select('title startDate endDate priority description status ownerId')
    .populate("ownerId","name email");

    if(!project) {
      return res.status(404).json({
        message: 'Project not found'
      });
    }

    const currentUserInfo=await ProjectMember.findOne({
      projectId:projectObjectId,
      userId:req.user._id
    }).select("role");
   

    return res.status(200).json({
      project: project[0],
      userRole:currentUserInfo ? currentUserInfo?.role : null
    });

  } catch (error) {
    console.error('getProjectOverview error:', error);

    return res.status(500).json({
      message: 'Internal server error'
    });
  }
}
module.exports=getProject