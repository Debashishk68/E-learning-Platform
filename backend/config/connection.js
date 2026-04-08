const mongoose = require('mongoose');

async function connectMongoDb(url) {
    return mongoose.connect(`${url}/ETech`)
        .then(() => console.log("MongoDB connected"))
        .catch(err => console.log(err));
}

module.exports = { connectMongoDb };
