const Activity=require('../../models/activity')
const createActivity = async ({
  projectId,
  userId,
  type,
  message,
  taskId,
}) => {
  await Activity.create({
    projectId,
    userId,
    type,
    message,
    taskId,
  });
};
module.exports= createActivity;