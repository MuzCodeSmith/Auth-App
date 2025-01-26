const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.auth = async (req, res, next) => {
    try {
        const authHeader = req.header("Authorization");

        console.log("cookie:",req.cookies.token)
        console.log("body:",req.body.token)
        console.log("header:",authHeader)


        const token = req.cookies.token || req.body.token || (authHeader && authHeader.replace("Bearer ", ""));

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Token not found!",
            });
        }

        // Verify the token
        const decode = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decode;

        next(); // Proceed to the next middleware
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token is invalid or expired",
            error: error.message, // Optional: Remove in production
        });
    }
};


exports.isStudent = async (req,res,next) =>{
    try {
        if(req.user.role !== 'Student'){
            return res.status(401).json({
                success:false,
                message:'this is protected route!'
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        }) 
    }
}

exports.isAdmin = async (req, res, next) => {
    try {
        if(req.user.role !== 'Admin'){
            return res.status(401).json({
                success:false,
                message:'this is protected route for Admin!'
            })
        }        
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        }) 
    }
}