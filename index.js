const express = require('express');
const app = express();

require('dotenv').config();
const PORT = process.env.PORT || 3000;

app.use(express.json())

const user = require('./Routes/User');
app.use("/api/v1",user)

app.listen(PORT,()=>{
    console.log("server started successfully")
})

const {connectdb} = require('./config/database')
connectdb();