const express = require('express');
const router = express.Router();

// controllers
const {signup,login} =  require('../controllers/Auth')

// middlewares
const {auth, isStudent, isAdmin} = require('../middlewares/auth')

router.get("/test",auth, (req,res)=>{
    res.json({
        message:"this is test route"
    })
} )

router.get("/student",auth, isStudent, (req,res)=>{
    res.json({
        message:"Welcome to Protected route for students"
    })
});

router.get("/admin",auth, isAdmin, (req,res)=>{
    res.json({
        message:"Welcome to Protected route for Admin"
    })
})


router.post('/login',login)
router.post('/signup',signup)

module.exports = router;