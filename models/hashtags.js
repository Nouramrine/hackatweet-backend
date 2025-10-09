const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    tag: String,
    tweets: [{type : mongoose.Schema.Types.ObjectId, ref: "tweets"}],

});

const Hashtag = mongoose.model('tweets', hashtagSchema);

module.exports = Hashtag;