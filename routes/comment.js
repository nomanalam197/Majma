const mongoose = require('mongoose');

var commentSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post"
    },
    data: String
});

module.exports = mongoose.model('Comment', commentSchema);