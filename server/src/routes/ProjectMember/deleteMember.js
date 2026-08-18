import ProjectMember from "../../models/projectmember.js"
import createActivity from "../RecentActivity/createActivity.js";

export default async function (req, res) {
    try {
        const id = req.params.id;
        const projectMember = await ProjectMember.findByIdAndDelete(id)
        .populate("userId","name");
        // console.log(projectMember);
        await createActivity({
            projectId: projectMember.projectId,
            userId: req?.user?._id,
            type: "MEMBER_REMOVED",
            message: `removed member "${projectMember.userId.name}"`,
        })
        return res.status(200).json({
            message: "Member Removed Successfully!"
        })
    } catch (error) {
        return res.status(500).json({
            error: `Server Error - ${error}`
        })
    }

}