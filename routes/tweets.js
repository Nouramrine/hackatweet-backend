var express = require('express');
var router = express.Router();

const Tweet = require('../models/tweets');
const User = require('../models/users');
const Hashtag = require('../models/hashtags');
const {checkBody} = require("../modules/checkBody");

router.get("/all", async (req, res) => {
  
    try{
        const tweets = await Tweet.find({}).populate('author');
        res.json({result: true, tweets : tweets});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});


router.post("/new", async (req, res) => {

    const {username, message} = req.body;

    if(!checkBody(req.body, ["username", "message"])){
        res.json({result: false, error: "Missing or empty fields"});
        return;
    }

    try{

        const author = await User.findOne({username : username});

        if(!author){
            res.json({result: false, error: "User not found"});
            return;
        }    

        const newTweet = new Tweet({
            author : author.id, 
            message : message,
            date: new Date(),
            likes: 0
        }
        );

        await newTweet.save();

        // Check for hashtages and add them in bdd
        //const pattern = /#(\w+)/g;
        const pattern = /#([\p{L}\p{N}_]+)/gu;
        const hashtags = message.match(pattern);

        if(hashtags){ // message contains hashtags
            for(let tag of hashtags){

                const lowerTag = tag.slice(1).toLowerCase();

                const hashtag = await Hashtag.findOne({ tag: lowerTag });

                // hashtag doesn't exist yet - create it
                if(!hashtag){
                    const newHashtag = new Hashtag({
                        tag: lowerTag,
                        tweets : [newTweet._id]
                    });

                    await newHashtag.save();
                }
                else{
                    await Hashtag.updateOne({tag: lowerTag}, { $addToSet: { tweets: newTweet._id } } );
                }
            }
        }


        res.json({result: true, message : "New tweet created"});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});

router.put("/like/:id", async (req, res) =>{

    const id = req.params.id;

    if(!id){
        return res.json({result: false, message: "Missing param id!"});
    }

    if(!checkBody(req.body, ["username"])){
        res.json({result: false, error: "Missing or empty fields"});
        return;
    }

    try{

        const tweet = await Tweet.findOne({_id: id});
        if (!tweet) return res.json({ result: false, error: "Tweet not found" });

        const user = await User.findOne({username: req.body.username})
        if (!user) return res.json({ result: false, error: "User not found" });

        if(tweet.likedBy.some(e => e._id = user._id)){ // user has already liked the tweet
            await Tweet.updateOne(
                {_id : id}, 
                { $pull: { likedBy: user._id } }
            );
            console.log("unliked");
        }else{  
            await Tweet.updateOne(
                {_id : id}, 
                { $addToSet: { likedBy: user._id } }
            );
            console.log("liked");
        }

        res.json({result: true});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});


router.delete("/:id", async (req, res) =>{

    const id = req.params.id;

    if(!id){
        return res.json({result: false, message: "Missing param id!"});
    }

    try{
        await Tweet.deleteOne({_id : id});

        res.json({result: true, message: "Tweet deleted"});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});


module.exports = router;