
const Project = require('../../models/project');
const createActivity = require('../RecentActivity/createActivity');
const patch = async (req, res) => {
    try {
        const id = req?.params?.id;
        const data = await Project.findByIdAndUpdate(id, {
            $set: req?.body
        }, { new: true }).populate("ownerId", "name email");
        // console.log(data);
        res.status(200).json({
            message: "Project Updated Successfully",
            updatedProject: data
        })
        await createActivity({
            projectId: data._id,
            userId: req?.user?._id,
            type: "PROJECT_UPDATED",
            message: `updated project "${data.title}"`,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, Try again after some time",
        });
    }

}
module.exports = patch;