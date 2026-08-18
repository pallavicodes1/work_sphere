const User = require("../models/user");
const Task = require("../models/task");
const bcrypt = require("bcrypt");
const createUser = async (req, res) => {
  const data = req?.body;
  if (data) {
    const checkIfUserExist = await User.findOne({ email: data?.email });
    if (checkIfUserExist) {
      return res.send(false);
    }
  }

  const user = new User(data);
  const result = await user.save();
   const token=await result.generateAuthToken();
  const taskData = await Task.find({ userId: result?._id, isDeleted: false });
     res.cookie('token', token, { httpOnly: true, secure: false,    // true in production (HTTPS)
    sameSite: "lax" });
  res.send({ token:token,data: result, task: taskData });

  // to send email
  //  await sendEmail({
  //   to:req?.body?.email,
  //   subject:'Welcome Back!',
  //   text:'You have successfully signed in'
  //  })
  //    const token=await result.generateAuthToken();
  //     return res.send({
  //       isCreated:true,
  //       data:result,
  //       token:token
  //     });
  // res.redirect('/private');
  // }
  // catch(err){
  //   console.log('in catch block',err?.message)
  //   res.status(500).json({error:err?.message})
  // }
  // }
};

const updateUser = async (req, res) => {
  const { password, newPassword } = req?.body;
  const user = await User.findOne({ _id: req?.params?.id });
  const result = await bcrypt.compare(password, user?.password);
  if (!result) {
    return res.send({
      isUpdate: false,
      msg: "Current Password is wrong !",
    });
  } else {
    const salt = await bcrypt.genSalt(10);
    const bcryptedPassword = await bcrypt.hash(newPassword, salt);
    await User.findByIdAndUpdate(req?.params?.id, {
      password: bcryptedPassword,
    });
    return res.send({
      isUpdated: true,
    });
  }
  res.send("hello from password change");
};

module.exports = { createUser, updateUser };
