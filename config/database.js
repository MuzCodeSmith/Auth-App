const mongoose = require('mongoose');
require("dotenv").config();

exports.connectdb = () =>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>console.log("database connected"))
    .catch((err)=>
    {
        console.error(err);
        console.log("issue while db connection");
        process.exit(1);
    });
}