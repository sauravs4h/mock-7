const express=require("express");
const order=express.Router();

const {Ordermodel}=require("../models/order.model");


// place order
order.post("/orders",async(req,res)=>{

    let payload=req.body;

    try {
        let norder=await Ordermodel(payload)
        await norder.save();
       // console.log(payload)
        res.send({msg:"order placed",status:"success"});
        
    } catch (error) {
        res.send({msg:"order not placed",status:"error"});
    }
})

//get order 

order.get("/orders/:id",async(req,res)=>{

    let orderid=req.params.id;
    //let payload=req.body;

    try {
        let norder=await Ordermodel.findOne({_id:orderid})
        
        res.send({order:norder,status:"success"});
        
    } catch (error) {
        res.send({msg:"error",status:"error"});
    }
})


// update status

//get order 

order.patch("/orders/:id",async(req,res)=>{

    let orderid=req.params.id;
    let payload=req.body;
    let status=payload.status;

    try {
        let norder=await Ordermodel.findByIdAndUpdate({_id:orderid},{status:status})
        
        res.send({msg:"update successfully",status:"success"});
        
    } catch (error) {
        res.send({msg:"error",status:"error"});
    }
})


module.exports={order}