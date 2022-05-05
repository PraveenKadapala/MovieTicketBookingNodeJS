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
  }
})

module.exports = mongoose.model('movies' , movies)
