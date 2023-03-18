const mongoose = require("mongoose");
console.log(process.env.DB_NAME);
module.exports = {
  connect: () => {
    try {
      const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };
        const uri = `mongodb://localhost:27017/expressjs`
      mongoose.set("strictQuery", false);
      mongoose.connect(uri, options).catch((err) => {
        console.log("mongoose error", err);
      });
    } catch (error) {
      console.log("mongodb error", error);
    }
  },
};