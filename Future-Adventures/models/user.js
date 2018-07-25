const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
      name: String,
      lastname: String,
      username: {type: String, require: true},
      password: {type: String, require: true}
},{
      timestamps: {
            createdAt: "created_at",
            updatedAt: "updated_at",
      }
});

const User = mongoose.model('user', userSchema);

module.exports = User;