const express = require('express');
const app = express();
const cookieParser = require('cookie-parser') 


require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json())
app.use(cookieParser())

const user = require('./routes/User');
app.use("/api/v1",user)

app.listen(PORT,()=>{
    console.log("server started successfully")
})

const {connectdb} = require('./config/database')
connectdb();