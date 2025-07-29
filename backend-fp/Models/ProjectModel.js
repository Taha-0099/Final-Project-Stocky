// backend-fp/Models/ProjectModel.js

const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title:      { type: String, required: true },
  customer:   { type: String, required: true },
  company:    { type: String, required: true },
  start:      { type: String, required: true },
  finish:     { type: String, required: true },
  status:     { type: String, required: true }, // Completed, Not Started, etc.
}, { timestamps: true });

module.exports = mongoose.model('Project', ProjectSchema);
