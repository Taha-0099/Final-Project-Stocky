const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
  firstName:   { type: String, required: true },
  lastName:    { type: String, required: true },
  gender:      { type: String, required: true },
  birthDate:   { type: String },
  email:       { type: String },
  phone:       { type: String },
  country:     { type: String },
  joiningDate: { type: String },
  company:     { type: String, required: true },
  department:  { type: String, required: true },
  designation: { type: String, required: true },
  officeShift: { type: String, required: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
