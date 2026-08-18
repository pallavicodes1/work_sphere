const mongoose = require('mongoose');
const projectMemberSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "projects"
  },
  joinedDate: {
    type: Date,
    default:Date.now()
  },
  role:{
    type:String
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false
  },
});

projectMemberSchema.index({userId:1});
projectMemberSchema.index({projectId:1});
projectMemberSchema.index({userId:1,projectId:1},{unique:true});
const ProjectMember = mongoose.model('projectMember', projectMemberSchema);
module.exports = ProjectMember;