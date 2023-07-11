class ErrorHandler extends Error
{
    constructor(statusCode,message)
    {
        super(message);
        this.statusCode=statusCode;
        
    }
}

export const errorMiddleware = (err,req,res,next)=>{
    err.message = err.message||"Internal Server Error";
    err.statusCode = err.statusCode||500;
    res.status(err.statusCode).json({
        success:false,
        message:err.message
    })
};




export default ErrorHandler;