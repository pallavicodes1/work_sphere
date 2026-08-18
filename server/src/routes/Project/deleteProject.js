const Project = require("../../models/project");


const deleteProject= async function (req, res) {
    try {
        const id = req.params.id;
        await Project.findByIdAndUpdate(id, {
            isDeleted: true
        })
        res.status(200).json({
            message: "Project Deleted Successfully!"
        })
    } catch (error) {
        res.status(500).json({
            message:`Error occured - ${error}` 
        })
    }

}
module.exports=deleteProject;