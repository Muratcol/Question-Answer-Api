const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slugify = require('slugify');


const answerSchema = new Schema({
    content: {
        type:String,
        required:[true, "Please provide a content"],
        minlength: [20, "Please provide a answer with minimum 20 characters long "]
    },
    slug: String,
    createdAt: {
        type:Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: "User"
    },
    question: {
        type: mongoose.Schema.ObjectId,
        required:true,
        ref: "Question"
    },
    likes: [{
        type: mongoose.Schema.ObjectId,
        ref: "User"
        }],
    likesCounter: {
        type:Number
    }
});



module.exports = mongoose.model("Answer", answerSchema);