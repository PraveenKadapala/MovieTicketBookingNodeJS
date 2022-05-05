const mongoose = require('mongoose');

const showtime = mongoose.Schema({
    movie:{
        type: String,
        required: true,
        trim:true,
        state: {
            type: String,
            uppercase: true
          }
    },
  showtiming: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
//   startDate: {
//     type: Date,
//     required: true,
//   },
//   endDate: {
//     type: Date,
//     required: true,
//   },
  theater: {
    type: String,
    required: true,
    lowercase:true

  }
});
module.exports = mongoose.model('showtime' , showtime)
