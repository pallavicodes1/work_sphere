const ProjectMember = require("../../../models/projectmember");

const patch = async (req, res) => {
    const id = req.params.id;
    const memberId = req.params.memberId;

    const data= await ProjectMember.findByIdAndUpdate({
        _id:memberId,
        projectId:id
    },{
            $set:req.body
        },{new : true}).populate("userId", "name email")
        res.status(200).json({
            data,
            message:"Role Updated Successfully"
        })
  
}
module.exports = patch;