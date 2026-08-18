const express=require('express');
const app=express();
const cors=require('cors');
const cookieParser=require('cookie-parser');
const path=require('path');
const userRouter=require('./src/routes/User/index');
const taskRouter=require('./src/routes/Task/index');
const dashboardRouter=require('./src/routes/Dashboard/index')
const getUserRouter=require('./src/routes/userData');
const connectDB=require('./src/config/connection');
const dotenv=require('dotenv');
const authenticateToken = require('./src/middleware/auth');
const protectedRoute=require('./src/routes/protectedRoute')
const projectRouter=require('./src/routes/Project/index')

// middlewares
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

dotenv.config();

require("./cron/reminder");

app.use('/auth',authenticateToken,protectedRoute);
app.use('/user',userRouter);
app.use('/project',authenticateToken,projectRouter);

app.use('/dashboard',authenticateToken,dashboardRouter);

app.post('/logout',async(req,res)=>{
     res.clearCookie("token");
     res.send(true);
})

app.use('/task',authenticateToken,taskRouter);
app.use('/getUserData',authenticateToken,getUserRouter);


module.exports=app;