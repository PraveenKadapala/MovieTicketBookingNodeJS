
const mongoose = require('mongoose');

const reservation = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
  email:{
    type: String
  },
  name:{
    type: String
  },
  seats_booked: {
    type: Number,
    required: true,
  },
  seats:{
      type: String,
      required :true
  },
  showtiming:{
    type: String,
    required: true,
  },
  theater: {
    type: String,
    required: true,
  },
  movie: {
    type: String,
    required: true,
  } , 
  location: {
    type: String,
    required: true,
  } , 
  ticketprice: {
    type: Number,
    required: true,
  },
  totalamount: {
    type: Number,
    required: true,
  },
});

module.exports= mongoose.model('reservation', reservation);

