const express=require("express");
const {Usermodel}=require("../models/user.model")

const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

const userr=express.Router()

userr.post("/register",async(req,res)=>{
    //res.send("hello login")

    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const useravailable= await Usermodel.findOne({email:email});

    if(useravailable){
        res.send({msg:"user is already available",status:"error"});
    }else{

        bcrypt.hash(password, 5 , async function(err, hash) {
            if(err){
                res.send({msg:"something went wrong",status:"error"})
            }else{
                payload.password=hash;
                const user= new Usermodel(payload);
                await user.save();

                res.send({msg:"signup successfull",status:"success"});
            }
        });
        
    }

    //console.log(payload)
})


userr.post("/login",async(req,res)=>{
    //res.send("hello login")

    const payload=req.body;
    const email=payload.email;
    const password=payload.password;

    const useravailable= await Usermodel.findOne({email:email});
    const hashpassword=useravailable?.password;
    const user_id=useravailable?._id

    if(useravailable){

        bcrypt.compare(password, hashpassword, function(err, result) {
            if(result){
                var token = jwt.sign({ userid:  user_id }, 'hush');

                res.send({msg:"login successfull", token:token,status:"success"});
            }else{
                res.send({msg:"wrong craditionals",status:"error"})
            }
        });
        
    }else{        
        res.send({msg:"please register first",status:"error"});
    }

    //console.log(payload)
})


userr.patch("/user/:id/reset",async(req,res)=>{

    let userid=req.params.id;
    let payload=req.body;
    let password=payload.password;

    try {
        let user= await Usermodel.findOne({_id:userid});

        if(user){
            let result= await Usermodel.findByIdAndUpdate({_id:userid},{password})
            res.send({msg:"update successfully",status:"success"})
        }else{
            res.send({msg:"update Unsuccessfully",status:"success"})
        }
        
    } catch (error) {
        res.send({msg:"update Unsuccessfully",status:"success"})
        console.log(error)
    }
})


module.exports={userr}