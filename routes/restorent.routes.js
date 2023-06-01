const express=require("express");
const resr=express.Router();
const {Restomodel}=require("../models/resto.model")


//all restorents

resr.get("/restaurants",async(req,res)=>{

    try {

        let restro=await Restomodel.find();

        res.send({restaurants:restro,status:"success"})
        
    } catch (error) {
        res.send({msg:"error",status:"error"})
    }
    
})

// only one restorent 

resr.get("/restaurants/:id",async(req,res)=>{

    let userid=req.params.id;

    try {

        let restro=await Restomodel.findOne({_id:userid});

        res.send({restaurant:restro,status:"success"})
        
    } catch (error) {
        res.send({msg:"error",status:"error"})
    }
    
})

// only one restorent menu

resr.get("/restaurants/:id/menu",async(req,res)=>{

    let userid=req.params.id;

    try {

        let restro=await Restomodel.findOne({_id:userid});
        let menu=restro.menu;

        res.send({restaurant:menu,status:"success"})
        
    } catch (error) {
        res.send({msg:"error",status:"error"})
    }
    
})

// only one restorent menu post

resr.post("/restaurants/:id/menu",async(req,res)=>{

    let userid=req.params.id;
    let payload=req.body;

    try {

        let restro=await Restomodel.findOne({_id:userid});
        if(restro){

            await Restomodel.findByIdAndUpdate({_id:userid},{$push:{menu:payload}}); 
            res.send({msg:"menu added successfully",status:"success"})
        }else{
            res.send({msg:"restorent not found",status:"error"})
        }

      
        
    } catch (error) {
        res.send({msg:"error",status:"error"})
    }
    
})

// only one restorent menu delete

// resr.post("/restaurants/:id/menu/:menuid",async(req,res)=>{

//     let userid=req.params.id;
//     let menuid=req.params.menuid
//     //let payload=req.body;

//     try {

//         let restro=await Restomodel.findByIdAndDelete({_id:useri);

        
//         if(restro){

//             await Restomodel.findByIdAndUpdate({_id:userid},{$push:{menu:payload}}); 
//             res.send({msg:"menu added successfully",status:"success"})
//         }else{
//             res.send({msg:"restorent not found",status:"error"})
//         }

      
        
//     } catch (error) {
//         res.send({msg:"error",status:"error"})
//     }
    
// })



//addrestorents 
resr.post("/addrestro",async(req,res)=>{

    let payload=req.body;
    try {

        let nres= new Restomodel(payload);
        await nres.save();
        res.send({msg:"restorent added successfully",status:"success"});
        
    } catch (error) {
        res.send({msg:"restorent not added successfully",status:"error"});
    }
})

module.exports={resr};
