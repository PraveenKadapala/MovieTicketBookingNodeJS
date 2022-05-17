const mongoose = require('mongoose');

const { Schema } = mongoose;
const locations = new Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  image:{
    type: String
  }
})

module.exports=mongoose.model("locations" , locations)