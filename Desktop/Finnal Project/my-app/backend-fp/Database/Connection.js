// /Database/Connection.js
// (you can remove this if you’re on Mongoose 6+)
// process.env.MONGOOSE_DISABLE_STABILITY_WARNING = '1';
const mongoose = require('mongoose');

async function connectToDatabase() {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/Baroque');
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToDatabase();
