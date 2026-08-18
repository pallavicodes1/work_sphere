const mongoose=require('mongoose');
async function connectDB(url){
    try{
       await mongoose.connect(url);
       console.log('database created');
    }
    catch(err){
        console.log('error occured',err);
    }
}
module.exports=connectDB;