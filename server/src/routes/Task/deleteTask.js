const Task = require('../../models/task');
const User = require('../../models/user');
const createActivity = require('../RecentActivity/createActivity');
const deleteTask = async (req, res) => {
    try {
        const id = req?.params?.id;
        // console.log(id);
        const result = await Task.findByIdAndUpdate(id, {
            isDeleted: true
        });
        const userName=await User.findOne({_id:req.user._id})
         if (result.project) {        
            await createActivity({
                projectId: result.project,
                userId: req?.user?._id,
                type: "TASK_DELETED",
                message: `updated task "${result.title}"`,
                taskId: result._id,
            })
        }
       return res.status(200).json({
            message:"Task Deleted Successfully"
        })
    } catch (error) {
       return res.status(500).json({
            success: false,
            message: "Something went wrong, Try again after some time",
        });
    }

}


module.exports = deleteTask;