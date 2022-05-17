const mongoose = require('mongoose');

const { Schema } = mongoose;
const showtime = new Schema({
  showtiming: {
    type: String,
    required: true,
    trim: true,
    lowercase:true
  },
  movie:{
    type: String,
    required: true,
    trim:true,
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
  },
  location: {
    type: String,
    required: true,
    lowercase:true
  },
  seats: {
    type: [Schema.Types.Mixed],
    required: true,
  },
  seatsavailable:{
    type:Number,
    required:true
  },
  ticketprice:{
      type:Number,
      required : true
  }
});
module.exports = mongoose.model('showtime' , showtime)
