var express = require('express');
var router = express.Router();

const Tweet = require('../models/tweets');
const User = require('../models/User');
const {checkBody} = require("../modules/checkBody");

Tweet.find({}).then(data => console.log(data));

router.get("/all", async (req, res) => {
  
    try{
        const tweets = await Tweet.find({});
        res.json({tweets : tweets});
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

        const author = await User.Find({username : username});

        if(!author){
            res.json({result: false, error: "User not found"});
            return;
        }

        // TODO : traiter les hashtag avec une regex et les enregistrer en BDD

        const newTweet = new Tweet({
            author : author.id, 
            message : message,
            date: new Date(),
            likes: 0
        }
        );

        await newTweet.save();

        const tweets = Tweet.Find();

        res.json({result: true, tweets: tweets});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});


/*router.post("/confirmCart", async (req, res) => {

    try{
        await Booking.updateMany({paid: false},{paid: true});

        res.json({result: true, message: "Order confirmed"});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});

router.delete("/removeFromCart/:tripId", async (req, res) =>{

    const id = req.params.tripId;

    if(!id){
        return res.json({result: false, message: "Missing param id!"});
    }

    try{
        await Booking.deleteOne({trip : id});

        res.json({result: true, message: "Trip deleted from cart"});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});*/


module.exports = router;