
const User = require('../../models/user')
const crypto=require('crypto')
const resetPassword = async function(req,res){
    try {
    const { token } = req.params;
    const { password } = req.body;

    const hashedToken = crypto
      .createHash("sha256")
      .update(token)
      .digest("hex");

    
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpire: { $gt: Date.now() }
    });

   
    if (!user) {
      return res.status(400).json({
        message: "Reset link is invalid or has expired"
      });
    }
    user.password=password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    return res.status(200).json({
      message: "Password reset successfully"
    });

  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong, Try again after some time"
    });
  }
}
module.exports=resetPassword