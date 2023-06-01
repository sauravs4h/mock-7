const express=require("express");
var cors = require('cors')
const app=express();



const {connection}=require("./config/db");
const {Usermodel}=require("./models/user.model");
const {userr}=require("./routes/user.routes");
const {resr}=require("./routes/restorent.routes")
const {order}=require("./routes/order.routes")

app.use(express.json())
app.use(cors())
app.use("/",userr);
app.use("/",resr);
app.use("/",order);

app.get("/",(req,res)=>{
    res.send("base api")
})

app.listen(8080,async()=>{
    try {
        await connection;
        console.log("connect to db");
        console.log("Running on 8080")
    } catch (error) {
        console.log("something error while running");
        console.log(error);
    }   
})