const mongoose = require("mongoose");
const Subcategory = require("./models/Subcategory");

async function run() {
  await mongoose.connect("mongodb://localhost:27017/iranian-directory", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const subs = await Subcategory.find().lean();
  console.log("📂 Subcategories:", subs);

  mongoose.disconnect();
}

run();
