const crypto = require('crypto')
const User = require("../../models/user.js");
const sendEmail = require("../../utils/sendEmail.js");
const forgotPassword = async function (req, res) {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(200).json({
        success: false,
        message: "User do not exist",
      });
    }
    const resetToken = crypto.randomBytes(32).toString("hex");

    // Hashed token stored in database
    const hashedToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    user.resetPasswordToken = hashedToken;
    user.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    // console.log(resetUrl)
    await sendEmail({
      to: 'lifeandknowledge2002@gmail.com',
      purpose: "forgotPassword",
      data: { name: user.name, resetLink },
    });
    return res.status(200).json({
      success: true,
      message: "Check your email address.",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}
module.exports = forgotPassword