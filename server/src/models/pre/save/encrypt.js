const bcrypt=require('bcrypt');
module.exports = async function(next){
     try{
          const salt=await bcrypt.genSalt(10);
          this.password=await bcrypt.hash(this.password,salt);
          next();
     }
     catch(err){
          console.log('error is',err);
     }
} 