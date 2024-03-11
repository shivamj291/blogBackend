const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

const connectDB = ()=> {
    mongoose.connect(process.env.MONGO_URL);
}

module.exports = connectDB;