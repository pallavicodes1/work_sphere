const Task = require('../../models/task');
const createActivity = require('../RecentActivity/createActivity');
const User=require('../../models/user');
const patch = async (req, res) => {
    try {
        const id = req?.params?.id;
         console.log(req.body);
        const data = await Task.findByIdAndUpdate(id, {
            $set: req?.body
        }, { new: true }).select("title description date priority status assignedTo project")
        .populate("assignedTo","name email");
       
        console.log(data)
        if (data.project) {    
             
            await createActivity({
                projectId: data.project,
                userId: req?.user?._id,
                type: "TASK_UPDATED",
                message: `updated task "${data.title}"`,
                taskId: data._id,
                
            })
        }

        return res.status(200).json({
            message: "Task Updated Successfully",
            updatedTask: data
        })
    } catch (error) {
        // console.log(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong, Try again after some time",
        });
    }

}
module.exports = patch;