import jwt from "jsonwebtoken";




export const jwtToken = (res,id,status,mssg)=>{
    let token = jwt.sign({id}, process.env.JWT_SECRET)
    res.cookie("token", token, { maxAge: (15 * 60 * 1000), httpOnly: true ,samesite:none,secure:true}).status(status).json({
        success: true,
        message:mssg
    });
}