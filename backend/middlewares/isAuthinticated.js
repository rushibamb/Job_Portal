import jwt from "jsonwebtoken";

const isAuthenticated= async(req,res,next)=>{
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({
                message:"user not authenticated",
                success: false
            })
        }
        const decode = await jwt.verify(token,process.env.JWT_SECRET);
        if(!decode ){
            return res.status(401).json({
                message : "Invalid Token",
                success : false
            })
        }
        req.id=decode.userId;
        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            message: "Authentication failed",
            success: false
        });
    }
}

export default isAuthenticated;
