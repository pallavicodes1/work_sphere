const mongoose = require("mongoose");
const Task = require("../../models/task");
const ProjectMember = require("../../models/projectmember");
const Activity = require("../../models/activity");
const getOverview= async function(req, res) {
  try {
    const projectId = req.params.id;
    // Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return res.status(400).json({
        message: 'Invalid project id'
      });
    }
    const projectObjectId = new mongoose.Types.ObjectId(projectId);
    const now = new Date();
    const startOfTodayIST = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      0, 0, 0, 0
    )

    // const startOfTodayUTC = new Date(startOfTodayIST.getTime() - (5.5 * 60 * 60 * 1000));


    // console.log(startOfTodayIST);
    //     console.log(startOfTodayUTC);
    const todayStr = new Date().toISOString().split('T')[0];

    // Run independent queries in parallel
   const [taskAgg, members, activities] = await Promise.all([
  Task.aggregate([
    {
      $match: {
        project: projectObjectId,
        isDeleted: false
      }
    },
    {
      $group: {
        _id: null,

        total: { $sum: 1 },

        pending: {
          $sum: {
            $cond: [{ $eq: ['$status', 'pending'] }, 1, 0]
          }
        },

        inProgress: {
          $sum: {
            $cond: [{ $eq: ['$status', 'in-progress'] }, 1, 0]
          }
        },

        completed: {
          $sum: {
            $cond: [{ $eq: ['$status', 'completed'] }, 1, 0]
          }
        },

        overdue: {
          $sum: {
            $cond: [
              {
                $and: [
                  { $lt: ['$date', startOfTodayIST] },
                  { $ne: ['$status', 'completed'] }
                ]
              },
              1,
              0
            ]
          }
        }
      }
    },
    {
      $project: { _id: 0 }
    }
  ]),

  // Only first 4 members for overview
  ProjectMember.find({ projectId: projectObjectId })
    .limit(4)
    .populate('userId', 'name email'),

  Activity.find({ projectId: projectObjectId })
    .select('type message userId createdAt')
    .populate('userId', 'name')
    .limit(4)
    .sort({ createdAt: -1 })
]);
    const taskSummary = taskAgg[0] || {
      total: 0,
      pending: 0,
      inProgress: 0,
      completed: 0,
      overdue: 0
    };

    // console.log(taskAgg);
    return res.status(200).json({
      taskSummary,
      members,
      activities
    });

  } catch (error) {
    console.error('getProjectOverview error:', error);
    return res.status(500).json({
      message: `Internal server error - ${error}`
    });
  }
}
module.exports=getOverview;