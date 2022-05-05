const mongoose = require('mongoose');

const locations = mongoose.Schema({
  location: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  }
})

module.exports=mongoose.model("locations" , locations)