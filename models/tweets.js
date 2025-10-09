const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    author: {type : mongoose.Schema.Types.ObjectId, ref: "users"},
    message: String,
    date: Date,
    likes: Number
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;