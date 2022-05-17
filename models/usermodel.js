
const mongoose= require("mongoose")


const userdetails= mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    phoneno:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    role:{
        type: String,
        // default:"guest",
        // enum: ["guest","admin"]
    }
})

module.exports= mongoose.model("userdetails" , userdetails)