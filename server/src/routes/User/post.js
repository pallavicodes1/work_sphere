const User = require("../../models/user");
const Task = require("../../models/task");
const sendEmail = require("../../utils/sendEmail");
const postUser = async (req, res) => {
  const data = req?.body;
  if (data) {
    const checkIfUserExist = await User.findOne({ email: data?.email });
    if (checkIfUserExist) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }
  }

  const user = new User(data);
  const result = await user.save();
  const token = await result.generateAuthToken();
  const taskData = await Task.find({ userId: result?._id, isDeleted: false });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  // to send email
  await sendEmail({
    name: req?.body?.name,
    to: req?.body?.email,
    subject: "Welcome Back!",
  });
  return res.status(201).json({
     message:"Account Created Successfully, You can login into your account"
  });
  // res.redirect('/private');
};
//   catch(err){
//     console.log('in catch block',err?.message)
//     res.status(500).json({error:err?.message})
//   }
//   }
// };
module.exports = postUser;
