const jwt = require('jsonwebtoken');
require('dotenv').config();

exports.auth = async (req,res,next) =>{
    try {
        const {token} = req.body;
        if(!token){
            return res.status(401).json({
                success:false,
                message:'Token not found!'
            })
        }
        // verify the token
        let decode;
        try {
            decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("decode:",decode)

            req.user = decode
            
        } catch (error) {
            res.status(500).json({
                success:false,
                message:"token is invalid",
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