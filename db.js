const mongoose = require("mongoose");

const localMongo =
    "mongodb://0.0.0.0:27017/CDGC?readPreference=primary&directConnection=true&ssl=false";
const mongoURI = localMongo;

const connectToMongo = () => {
    mongoose.set("strictQuery", false);
    mongoose.connect(mongoURI);
    console.log("Mongo Connected");
};

module.exports = connectToMongo;