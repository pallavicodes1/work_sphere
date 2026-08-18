const Task = require("../../models/task");
const User = require("../../models/user");

const get = async (req, res) => {
    try {
        const userInfo=await User.findOne({_id:req.user._id}).select("name email")
        const taskData = await Task.find({
            userId: req.user._id,
            isDeleted: false,
            project: null
        });
      return  res.status(200).json({
            userInfo,
            taskData
        })
    } catch (error) {
             return  res.status(500).json({
            message:error?.message
        })
    }
}
module.exports = get;