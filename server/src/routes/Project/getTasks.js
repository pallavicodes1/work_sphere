
const mongoose = require("mongoose");
const ProjectMember = require("../../models/projectmember");
const Task = require("../../models/task");

const getTasks = async function (req, res) {
    try {
        const projectId = req.params.id;
        // Validate ObjectId
        if (!mongoose.Types.ObjectId.isValid(projectId)) {
            return res.status(400).json({
                message: 'Invalid project id'
            });
        }
        const projectObjectId = new mongoose.Types.ObjectId(projectId);
        const {
            page = 1,
            limit = 6,
            search = "",
        } = req.query;

        const pageNumber = Number(page);
        const limitNumber = Number(limit);
        const skip = (pageNumber - 1) * limitNumber;


        // Sorting

        const userRoleInProject = await ProjectMember.findOne({
            userId: req.user._id,
            projectId: projectObjectId,
            isDeleted: false
        })

        const tasks = await Task.find({
            project: projectObjectId, isDeleted: false,
            title: {
                $regex: search.trim(),
                $options: "i"
            }
        }).skip(skip)
            .limit(limitNumber)
            .lean();
        // Total matching documents
        const total = await Task.countDocuments({
            project: projectObjectId, isDeleted: false,
            title: {
                $regex: search.trim(),
                $options: "i"
            }
        });

        const totalPages = Math.ceil(total / limitNumber);

        return res.status(200).json({
            success: true,
            tasks,
            pagination: {
                page: pageNumber,
                limit: limitNumber,
                total,
                totalPages,
            },
        });
    } catch (error) {
        return res.status(500).json({
            message: `Server error - ${error}`
        })
    }

}
module.exports = getTasks;