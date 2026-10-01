const jwt=require('jsonwebtoken');
function authenticateToken(req,res,next){
    const token=req.cookies.token;
   if(!token){
    return res.status(401).json({msg:'Access Denied'});
   }
   jwt.verify(token,process.env.JWTSECRET,(err,user)=>{
    if(err){
        return res.status(403).json({msg:'Invalid Token'});
    }
    req.user=user;
    next();
   })
    
}
module.exports = authenticateToken;