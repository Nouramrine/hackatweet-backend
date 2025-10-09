const mongoose = require('mongoose');

const tweetSchema = mongoose.Schema({
    author: {type : mongoose.Schema.Types.ObjectId, ref: "users"},
    message: String,
    date: { type: Date, default: Date.now },
    likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
});

const Tweet = mongoose.model('tweets', tweetSchema);

module.exports = Tweet;