const express=require('express');
const app=express();
const cors=require('cors');
const path = require('path');
const cookieParser=require('cookie-parser');
const dotenv=require('dotenv');


dotenv.config();
const userRouter=require('./src/routes/User/index');
const taskRouter=require('./src/routes/Task/index');
const dashboardRouter=require('./src/routes/Dashboard/index')
const getUserRouter=require('./src/routes/userData');
const attachmentRouter=require('./src/routes/Attachments/index')
const authenticateToken = require('./src/middleware/auth');
const protectedRoute=require('./src/routes/protectedRoute')
const projectRouter=require('./src/routes/Project/index')
const memberRouter=require('./src/routes/ProjectMember/index')
// middlewares


console.log()





app.use(
  '/uploads',
  express.static(path.join(__dirname, 'uploads'), {
    setHeaders: (res, filePath) => {
      res.set('Cross-Origin-Resource-Policy', 'cross-origin');
    },
  })
);

app.use(cors({
  origin:[
   "http://localhost:5173",
   "http://localhost:4173"
  ]
   ,
  credentials: true
}));

// app.use((req,res,next)=>{
//   console.log(req.url);
//   next();
// })

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.set('view engine',"ejs");
app.set('views',path.resolve('./views'));



require("./cron/reminder");


app.use('/auth',authenticateToken,protectedRoute);
app.use('/user',userRouter);
app.use('/project',authenticateToken,projectRouter);
app.use('/dashboard',authenticateToken,dashboardRouter);
app.use('/member',authenticateToken,memberRouter)
app.post('/logout',async(req,res)=>{
     res.clearCookie("token");
     res.send(true);
})

app.use('/task',authenticateToken,taskRouter);
app.use('/getUserData',authenticateToken,getUserRouter);
app.use('/attachment',attachmentRouter)

module.exports=app;