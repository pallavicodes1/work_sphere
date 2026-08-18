const createActivity=require('../RecentActivity/createActivity')

const Task = require('../../models/task');

const post = async (req, res) => {
  try {
    const task = new Task({ ...req?.body, userId: req?.user?._id })
    const result = await task.save();
    await result.populate("userId","name");
    await createActivity({
      projectId : task.project,
      userId:req?.user?._id,
      type : "TASK_CREATED",
      message: `created task "${task.title}"`,
      taskId: task._id,
    })
    return res.status(201).json({
      message: "Task Added Successfully",
      task: result
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Something went wrong, Try again after some time",
    });
  }
}
module.exports=post