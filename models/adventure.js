const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adventureSchema = new Schema({
    refname: {
        type: Schema.Types.ObjectId,
        ref: "users"
    }, // user id referenced
    name: String,
    description: String,
    date: String,
    imgName: String,
    imgPath: String,
  }, {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" }
  });
    // location: ,   ????

let Adventure = mongoose.model('adventures', adventureSchema);

module.exports = Adventure;