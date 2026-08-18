import ProjectMember from "../../models/projectmember.js";

export default async function(req,res){
    const id=req.params.id;
    // console.log(req.body)
   const data= await ProjectMember.findByIdAndUpdate(id,{
        $set:req.body
    },{new : true}).populate("userId", "name email")
    res.status(200).json({
        data,
        message:"Role Updated Successfully"
    })
}