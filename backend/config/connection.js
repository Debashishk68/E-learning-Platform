const mongoose = require('mongoose');

async function connectMongoDb(url) {
    console.log("Mongo URL:", url);
    return mongoose.connect(`${url}/ETech`)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
}

module.exports = { connectMongoDb };
