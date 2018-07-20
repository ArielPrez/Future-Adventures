const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adventureSchema = new Schema({
  refname: String, // user name referenced
  name: String,
  description: String,
  date: Date,
  // location: ,  // ????
});

let Adventure = mongoose.model('User', adventureSchema);

module.exports = Adventure;