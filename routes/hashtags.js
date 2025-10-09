var express = require('express');
var router = express.Router();

const Hashtag = require('../models/hashtags');

router.get("/all", async (req, res) => {
  
    try{
        const hashtags = await Hashtag.find({});
        res.json({hashtags : hashtags});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});

router.get("/:tag", async (req, res) => {

    const tag = req.params.tag;

    if(!tag){
        return res.json({result: false, message: "Missing param tag!"});
    }
  
    try{
        const hashtags = await Hashtag.find({tag: tag});
        res.json({hashtags : hashtags});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});

router.get("/number/:tag", async (req, res) => {

    const tag = req.params.tag;

    if(!tag){
        return res.json({result: false, message: "Missing param tag!"});
    }
  
    try{
        const hashtags = await Hashtag.find({tag: tag});
        res.json({result : true, number: hashtags.length});
    }catch(err){
        res.json({ result: false, message: err.message });
    }
});

module.exports = router;