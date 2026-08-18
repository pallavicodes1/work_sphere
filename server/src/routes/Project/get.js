const Project = require("../../models/project");
const ProjectMember = require("../../models/projectmember");
const get= async function (req, res) {
    try {
        const userAsOwnerProjects=await Project.find({ownerId:req.user._id,isDeleted:false})
        .select("title startDate endDate priority description status ownerId")
        .populate("ownerId","name email");
        // console.log('userAsOwnerProjects', userAsOwnerProjects);
        const memberShip=await ProjectMember.find({
            userId:req.user._id,
            role:{$in:['member','viewer']},
            isDeleted:false
        })
        const projectIds=memberShip.map(m=>m.projectId);
        const userAsMemberProjects=await Project.find({_id:{$in:projectIds,
            },isDeleted:false})
        .select("title startDate endDate priority description status owner")
        .populate("ownerId","name email");
        res.status(200).json({
            userAsOwnerProjects,
            userAsMemberProjects
        })
    } catch (error) {
        res.status(500).json({
            message:`Server Error ${error}`
        })
    }

}
module.exports=get;