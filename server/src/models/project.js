const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String
  },
  startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  priority: {
    type: String
  },
  description: {
    type: String
  },
  isDeleted: {
    type: Boolean,
    required: false,
    default: false
  },
  progress: {
    type: Number,
    default: 0
  },
  status:{
    type:"string",
    default:"pending"
  }

});
projectSchema.index({ownerId:1});
const Project = mongoose.model('projects', projectSchema);
module.exports = Project;