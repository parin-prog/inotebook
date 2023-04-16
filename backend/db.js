const mongoose = require('mongoose')
const mongoURI = "mongodb://localhost:27017/inotebook";

async function connectToMongo() {
    await mongoose.connect(mongoURI,
        console.log('connected to mongodb successfully.....'))
}

module.exports = connectToMongo;