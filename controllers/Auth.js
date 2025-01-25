const bcrypt = require('bcrypt');
const User = require('../models/User')

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
            name,email,password:hashedPassword
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