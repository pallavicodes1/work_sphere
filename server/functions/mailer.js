const nodemailer=require('nodemailer');
const transporter=nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'srpallavi2002@gmail.com',
        pass:'ucoq zsig oqmq dybw'
    }
})
const sendEmail=async({to,text,subject})=>{
    try{
        const info=await transporter.sendMail({
        from :'srpallavi2002@gmail.com',
        to,
        subject,
        text
    });
       
    }
    catch(err){
      
        throw err;
    }
 

}
module.exports=sendEmail;