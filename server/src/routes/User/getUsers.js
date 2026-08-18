const User=require('../../models/user')
const getUsers = async (req, res) => {
   
    const input=req.query.input
    // console.log(input)
    const data=await User.find({
        name:{
            $regex:input,$options:'i'
        }
    })
    .select("name email")
    .limit(2);
    // console.log(data)
    res.status(200).json({
        result:data
    })
};

module.exports = getUsers;