// utils/sendEmail.js

const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");
const sendEmail = async ({name, to, subject,email,html}) => {
  try {
    if(name){
             const html = await ejs.renderFile(path.join(__dirname, "../../views/welcome.ejs"), {
      name,
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "srpallavi2002@gmail.com",
        pass: "ucoqzsigoqmqdybw",
      },
    });

    const msg=await transporter.sendMail({
      from: "srpallavi2002@gmail.com",
      to,
      subject,
      html
    });
   
    }else{
       const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "srpallavi2002@gmail.com",
        pass: "ucoqzsigoqmqdybw",
      },
    });

    const msg=await transporter.sendMail({
      from: "srpallavi2002@gmail.com",
      to,
      subject,
      html
    });

    }
 
  } catch (err) {
    // console.log(err);
  }
};

module.exports = sendEmail;
