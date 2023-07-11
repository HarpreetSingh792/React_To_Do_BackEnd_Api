import jwt from 'jsonwebtoken'




const isAuthenticated =(req,res,next)=>{
    const {token} = req.cookies;
    if(!token)res.status(404).json({success: false,message: "Login First",});
    const hasToken = jwt.verify(token,process.env.JWT_SECRET);
    req.user = hasToken;
    next();
}


export default isAuthenticated;