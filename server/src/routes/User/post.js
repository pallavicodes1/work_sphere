const User = require("../../models/user");

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


  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  });

  // to send email
//   await sendEmail({
//   to: user.email,
//   purpose: "signUp",
//   data: { name: user.name },
// });

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
