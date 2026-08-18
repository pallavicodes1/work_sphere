const User = require("../../models/user");
const bcrypt = require("bcrypt");
const updatePassword = async (req, res) => {
  try {
    const { password, newPassword } = req?.body;
    const user = await User.findOne({ _id: req?.params?.id });
    const result = await bcrypt.compare(password, user?.password);
    if (!result) {
      return res.status(401).json({
        message: "Invalid Password"
      })
    } else {
      const salt = await bcrypt.genSalt(10);
      const bcryptedPassword = await bcrypt.hash(newPassword, salt);
      await User.findByIdAndUpdate(req?.params?.id, {
        password: bcryptedPassword,
      });
      return res.status(200).json({
        message: "Password Updated Successfully"
      })
    }
  } catch (error) {
    // console.log(error)
       res.status(500).json({
        message:"Something went wrong, Try again after some time"
       })
  }


};
module.exports = updatePassword;
