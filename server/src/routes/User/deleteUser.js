const User = require("../../models/user");
const deleteUser= async function (req, res){
     try {
        const id = req?.params?.id;
        // console.log(id);
        const result = await User.findByIdAndUpdate(id, {
            isDeleted: true
        })
      res.status(200).json({
        message:"Account Deleted Successfully"
      })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong, Try again after some time",
        });
    }
}
module.exports=deleteUser;