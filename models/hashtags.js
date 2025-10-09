const mongoose = require('mongoose');

const hashtagSchema = mongoose.Schema({
    tag: { type: String, required: true, unique: true },
    tweets: [{type : mongoose.Schema.Types.ObjectId, ref: "tweets"}],

});

const Hashtag = mongoose.model('hashtags', hashtagSchema);

module.exports = Hashtag;