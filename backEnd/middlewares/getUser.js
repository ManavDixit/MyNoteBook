const jwt=require('jsonwebtoken')
const getUser=(req,res,next)=>{
    //geting token from headers
    const token=req.header('auth-token');
    if(!token){
        return res.status(401).json({error:'please authenticate to get user data'})
    }
    try{
    //get userName of user using Json Web Token
    let data=jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user=data;
    //calling next() to run next function to run the next funtion after this middleware
    next();
    }
    catch(error){
        res.status(401).send('please authenticate to get user data');
        console.log(error.message);
    }
}
module.exports=getUser;