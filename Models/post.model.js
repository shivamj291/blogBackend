const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    blog: {
        type: String,
        required: true
    },
    
    
    author_id: {
        type: String,
        required: true
    }
})

const Post = mongoose.model('post', postSchema);

module.exports = Post;