const User=require('../../models/user');
const patch=async(req,res)=>{
 const existingUser = await User.findOne({
  _id: { $ne: req?.params?.id },
  $or: [
    { email: req?.body?.email },
    { contactNumber: req?.body?.contactNumber }
  ]
});

if (existingUser) {
  if (existingUser.email == req.body.email) {
    return res.status(400).json({
      message: "Email already exists"
    });
  }
  if (existingUser.contactNumber == req.body.contactNumber) {
    return res.status(400).json({
      message: "Contact number already exists"
    });
  }
}
  try{
  await User.findByIdAndUpdate(req?.params?.id,{
     $set:req?.body
  });
  const data=await User.findById(req?.params?.id);
   return res.status(200).json({
    message:"User Data Updated Succcessfully",
    data:data
   })
  }
    catch(err){
        return res.status(500).json({
          message:"Internal Server Error"
        })
    }

  }

module.exports=patch;