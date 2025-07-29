const mongoose = require('mongoose');
mongoose.pluralize(null);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name:     { type: String, required: true, unique: true },  // CHANGED
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:     { type: String, enum: ['Admin', 'User'], default: 'User' }
});

module.exports = mongoose.model('Users', UserSchema);
