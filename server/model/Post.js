const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({

    userId:
    {
        type:String,
        required:true
    },
    author:
    {
        type:String,
        required:true
    },
    email:
    {
        type:String,
        required:true
    },
    title:
    {
        type:String,
        required:true
    },
    subtitle:
    {
        type:String,
        required:true
    },
    content:
    {
        type:String,
        required:true
    },
    postType:
    {
        type:String,
        required:true
    },
    image:
    {
        type:String,
        required:true
    },
    date:
    {
        type:Date,
        required:true
    }
    


});

module.exports = mongoose.model("Post",postSchema);
