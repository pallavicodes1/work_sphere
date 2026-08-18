const mongoose = require('mongoose');

const activitySchema = new mongoose.Schema(
  {
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      enum: [
        "TASK_CREATED",
        "TASK_UPDATED",
        "TASK_COMPLETED",
        "TASK_DELETED",
        "MEMBER_ADDED",
        "MEMBER_REMOVED",
        "PROJECT_UPDATED",
      ],
      required: true,
    },
    message: String,
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "tasks",
      default: null
    },
  },
  { timestamps: true }
);

const Activity = mongoose.model('activity', activitySchema);
module.exports = Activity;