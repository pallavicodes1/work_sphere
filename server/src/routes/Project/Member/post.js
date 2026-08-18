const ProjectMember = require('../../../models/projectmember');
const createActivity = require('../../RecentActivity/createActivity');
const User = require('../../../models/user')
const post = async (req, res) => {
    try {
        const projectId = req.params.id;
        const checkIfUserExists = await ProjectMember.findOne({ userId: req.body?.userId,projectId:projectId });
        if (checkIfUserExists) {
            return res.status(400).json({
                message: "Member is already added"
            })
        }
        const data = await ProjectMember.create({...req.body,projectId});
        const populatedData = await data.populate("userId", "name email");
        const userName = await User.findOne({ _id: req.user._id })
        .select("name");
        await createActivity({
            projectId: populatedData.projectId,
            userId: req?.user?._id,
            type: "MEMBER_ADDED",
            message: `added member "${populatedData.userId.name}"`,
        })
        return res.status(200).json({
            message: "Member Added Successfully",
            data: populatedData
        })

    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            message: "Member not added! Try again after some time"
        })
    }

}
module.exports = post;