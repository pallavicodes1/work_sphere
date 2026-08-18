const Project = require("../../models/project");
const ProjectMember = require("../../models/projectmember");

 const post = async (req, res) => {
    try {
        const data = req?.body;
        const payload = { ...data, ownerId: req.user._id }
        const project = new Project(payload);
        const result = await project.save();
        const memberData={
            userId:req.user._id,
            projectId:project._id,
            role:"owner"
        }
        const projectmember=new ProjectMember(memberData);
        await projectmember.save();
        return res.status(201).json({
            success: true,
            message: "Project created successfully",
            result
        });
    } catch (error) {
        console.error("Create project error:", error);

        return res.status(500).json({
            success: false,
            message: "Failed to create project",
        });
    }
};
module.exports=post;