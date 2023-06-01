const mongoose=require("mongoose");

const restoSchema=mongoose.Schema({
   
    name: String,
    address: {
      street: String,
      city: String,
      state: String,
      country: String,
      zip: String
    },
    menu: [{
      //_id: ObjectId,
      name: String,
      description: String,
      price: Number,
      image: String
    }]
});

const Restomodel=mongoose.model("Resto",restoSchema);

module.exports={Restomodel}