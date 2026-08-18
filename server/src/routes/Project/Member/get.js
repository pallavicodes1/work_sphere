const ProjectMember = require("../../../models/projectmember");
const mongoose=require('mongoose');
const get= async function(req,res){
    try {
          const projectId = req.params.id;
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
          return res.status(400).json({
            message: 'Invalid project id'
          });
        }
         const projectObjectId = new mongoose.Types.ObjectId(projectId);
         const members=await ProjectMember.find({projectId:projectObjectId})
         .populate("userId","name email");
        //  console.log(members)
         res.status(200).json({
            members
         })
    } catch (error) {
        res.status(500).json({
            message:`Server error - ${error}`
        })
    }
   
}
module.exports=get;