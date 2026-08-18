// cron/reminder.js

const cron = require("node-cron");
const Task = require("../src/models/task");
const sendEmail = require("../src/utils/sendEmail");
const User = require('../src/models/user')






cron.schedule("49 23 * * *", async () => {

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);

  const dayAfterTomorrow = new Date(tomorrow);
  dayAfterTomorrow.setDate(tomorrow.getDate() + 1);


  const tasks = await Task.find({
    date: {
      $gte: tomorrow,
      $lt: dayAfterTomorrow
    },
    isCompleted: false
  });
 

     const users = await User.find({});
    const userToSendEmail = users?.filter(a1 =>
  tasks.some(a2 => a2.userId.toString() === a1._id.toString())
);
  for (let user of userToSendEmail) {
    await sendEmail(
       user.email,
      "Reminder: Task Due Tomorrow",
      `Your task "${user.title}" is due tomorrow.`
    );
  }
});