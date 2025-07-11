// backend-fp/Models/UserModel.js
const mongoose = require('mongoose');
mongoose.pluralize(null);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

module.exports = mongoose.model('Users', UserSchema);
