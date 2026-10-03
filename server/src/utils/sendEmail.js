const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// create the transporter once, not on every call
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 20000,
});

const templates = {
  signUp: { file: "welcome.ejs", subject: "Welcome to our app!" },
  forgotPassword: { file: "forgotPassword.ejs", subject: "Reset your password" },
  overdueTask: { file: "overdueTask.ejs", subject: "You have an overdue task" },
};

const sendEmail = async ({ to, subject, purpose, data = {} }) => {
 

console.log(to);
  try {
    const template = templates[purpose];
    if (!template) throw new Error(`Unknown email purpose: ${purpose}`);

    const html = await ejs.renderFile(
      path.join(__dirname, "../../views", template.file),
      data
    );




    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to,
      subject: subject || template.subject,
      html,
    });


    return true;
  } catch (err) {
    console.error("Email error:", err);
    return false;
  }
};

module.exports = sendEmail;