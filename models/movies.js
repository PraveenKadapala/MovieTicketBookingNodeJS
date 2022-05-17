const mongoose = require('mongoose');


const movies = mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    lowercase:true

  },
  location:{
    type: String,
    required: true,
    trim : true,
    lowercase:true
  },
  image:{
      type:String
  }
})

module.exports = mongoose.model('movies' , movies)
