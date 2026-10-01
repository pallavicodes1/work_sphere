const ProjectMember = require("../../../models/projectmember");
const mongoose = require('mongoose');
const get = async function (req, res) {
    try {
        const projectId = req.params.id;
        const {
            input = ""
        } = req.query;
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: 'Invalid project id'
            });
        }
        const projectObjectId = new mongoose.Types.ObjectId(projectId);
        let members;
        if (input.trim()) {
            members = await ProjectMember.find({ projectId: projectObjectId })
                .populate({
                    path: "userId",
                    match: {
                        $or: [
                            { name: { $regex: input, $options: "i" } },
                            { email: { $regex: input, $options: "i" } }
                        ]
                    },
                    select: "name email"
                });
                let filteredMembers=members?.filter(member=>member.userId!==null)
                let actualMembers=filteredMembers?.map((user)=>({
                    name:user.userId.name,
                    email:user.userId.email,
                    _id:user.userId._id
                }));
            return res.status(200).json({
                members:actualMembers
            })
        }
        else {
            members = await ProjectMember.find({ projectId: projectObjectId })
                .populate("userId", "name email");
            return res.status(200).json({
            members
        })
        }

        //  console.log(members)
       
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: `Server error - ${error}`
        })
    }

}
module.exports = get;