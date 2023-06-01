const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
    name: String,
    email: String,
    password: String,
    address: {
        street: String,
        city: String,
        state: String,
        country: String,
        zip: String
    }
});

const Usermodel=mongoose.model("Users",userSchema);

module.exports={Usermodel}