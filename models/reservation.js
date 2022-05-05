
const mongoose = require('mongoose');

const reservation = new mongoose.Schema({
//   date: {
//     type: Date,
//     required: true,
//   },
  seats: {
    type: String,
    required: true,
  },
  ticketPrice: {
    type: Number,
    required: true,
  },
//   total: {
//     type: Number,
//     required: true,
//   },
  theater: {
    type: String,
    ref: 'Cinema',
    required: true,
  },
  movie: {
    type: String,
    ref: 'Movie',
    required: true,
  }
//   username: {
//     type: String,
//     required: true,
//   },
//   phone: {
//     type: String,
//     required: true,
//   },
//   checkin: {
//     type: Boolean,
//     default: false,
//   },
});

module.exports= mongoose.model('reservation', reservation);

