const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema = new Schema({
    imageLink: { type: String, required: true },
    caption: { type: String, required: true },
},
  { timestamps: true }
);

const postModel = mongoose.model('Post', postSchema);

module.exports = postModel;