const bcrypt = require('bcrypt');
const User = require('../models/User')
const jwt = require('jsonwebtoken');
require('dotenv').config()

exports.signup = async (req,res) => {
    try {
        const {name, email, password, role} = req.body;
        // check user alredy exits
        existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(200).json({
                success:false,
                message:"User already exists!"
            })
        }

        // hashing password
        let hashedPassword;
        try {
            hashedPassword = await bcrypt.hash(password,10)

        } catch (error) {
            return res.status(500).json({
                success:false,
                message:error.message
            })
        }

        // creating record
        let user = await User.create({
            name,email,password:hashedPassword,role
        })

        res.status(200).json({
            success:true,
            message:"User created successfully!",
            data:user
        })

        
    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })  
    }
}

exports.login = async (req,res) =>{
    try {
        const {email,password} = req.body;
        if(!email,!password){
            return res.status(400).json({
                success:false,
                message:'Please fill all the details'
            })
        }
        let foundUser = await User.findOne({email});

        if(!foundUser){
            return res.status(400).json({
                message:'User not found',
                success:false
            })
        }

        let validPassword = await bcrypt.compare(password,foundUser.password);
        if(!validPassword){
            return res.status(400).json({
                message:'Invalid credentials',
                success:false
            })
        }
        let payload = {
            email:foundUser.email,
            id:foundUser._id,
            role:foundUser.role
        } 
        let token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h",
        })
        foundUser.token = token;
        foundUser.password = undefined;
        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly:true,
        };
        res.cookie("token",token,options).status(200).json({
            success:true,
            token,
            foundUser,
            message:"User Logged In Successfully"
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            error:error.message,
        })  
    }
}