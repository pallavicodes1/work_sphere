const mongoose=require('mongoose');
const connectDB=require('./src/config/connection');
const url='mongodb://localhost:27017/test_db';
const app=require('./app.js');

connectDB(url);
app.listen(8000,()=>{
    console.log('server started');
})

