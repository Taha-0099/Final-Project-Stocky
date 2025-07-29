// seedLanguages.js
const mongoose = require("mongoose");
const Language = require("./Models/LanguageModel");

const MONGO_URI = "mongodb://127.0.0.1:27017/Baroque"; // MUST match your Connection.js

const seedLanguages = [
  {
    name: "English",
    locale: "en",
    flag: "https://flagcdn.com/gb.svg",
    isActive: true,
    isDefault: true,
  },
  {
    name: "اردو",
    locale: "ur",
    flag: "https://flagcdn.com/pk.svg",
    isActive: true,
    isDefault: false,
  },
  {
    name: "Español",
    locale: "es",
    flag: "https://flagcdn.com/es.svg",
    isActive: true,
    isDefault: false,
  },
  {
    name: "العربية",
    locale: "ar",
    flag: "https://flagcdn.com/sa.svg",
    isActive: true,
    isDefault: false,
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);

    await Language.deleteMany({});
    await Language.insertMany(seedLanguages);
    console.log("Languages seeded!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
