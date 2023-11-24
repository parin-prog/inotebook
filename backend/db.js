const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://parinvaghani001:parin@cluster0.ypkezxu.mongodb.net/inotebook?retryWrites=true&w=majority';

 function connectToMongo() {
     mongoose.connect(mongoURI)
        .then(()=>console.log("Mongo connected..."))
        .catch((err)=>console.log(err))
}

module.exports = connectToMongo;