class ErrorHandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode=statusCode;
    }
}

export const errorMiddleware=(err,req,res,next)=>{
    err.message=err.message || "Internal Server Error";
    err.statusCode=err.statusCode || 500;

    if(err.code===11000){
        const msg=`Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(msg,400);
    }
    if(err.name==="JsonWebTokenError"){
        const msg="Json Web Token is Invalid,Please try Again";
        err = new ErrorHandler(msg,400);
    }
    if(err.name==="TokenExpiredError"){
        const msg="Json Web Token is Expired,Please try Again";
        err = new ErrorHandler(msg,400);
    }
    if(err.name==="CastError"){
        const msg=`Invalid ${err.path}`;
        err = new ErrorHandler(msg,400);
    }

    const errorMsg=err.errors ? Object.values(err.errors).map((err)=>err.message).join(" & ") : err.message;

    return res.status(err.statusCode).json({
        sucess:false,
        message:errorMsg,
    });

};

export default ErrorHandler;