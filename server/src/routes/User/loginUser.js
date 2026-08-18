const User = require("../../models/user");
const Task = require("../../models/task");
const bcrypt = require("bcrypt");
const Project = require("../../models/project");
const ProjectMember = require("../../models/projectmember");
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      { email,
        isDeleted:false
       }
    ).select("password");
    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      })
    }
    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }
    const token = await user.generateAuthToken();
    // const taskData = await Task.find({
    //   userId: user._id,
    //   isDeleted: false,
    //   project:null
    // });
    // const projectsAsOwnerData=await Project.find({
    //   ownerId:user._id,
    //   isDeleted:false
    // })
    // const memberprojects= await ProjectMember.find({
    //     userId:user._id,
    //     role:"member",
    //     isDeleted:false
    // }).populate("projectId")
    // const projectAsmembers=memberprojects.map((project)=>{
    //   return project.projectId
    // })
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });
    res.status(200).json({
      success: true
      // tasks: taskData,
      // projectsAsOwner:projectsAsOwnerData,   
      // projectAsMembers:projectAsmembers
    });

  } catch (err) {
    // console.log(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = loginUser;